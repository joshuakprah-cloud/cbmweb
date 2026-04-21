'use client'

import { useState, useEffect } from 'react'

interface SyncStatus {
  configured: boolean
  settings?: {
    playlistId: string
    syncEnabled: boolean
    lastSyncAt: string
    autoPublish: boolean
    defaultPreacher: string
  }
  message?: string
}

interface SyncResult {
  message: string
  synced: number
  totalInPlaylist: number
  sermons?: Array<{ id: string; title: string; slug: string }>
  error?: string
}

export default function YouTubeSyncPage() {
  const [status, setStatus] = useState<SyncStatus | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<SyncResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    checkStatus()
  }, [])

  const checkStatus = async () => {
    try {
      const response = await fetch('/api/sermons/sync/youtube')
      const data = await response.json()
      setStatus(data)
    } catch (err) {
      setError('Failed to check sync status')
    }
  }

  const handleSync = async () => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('/api/sermons/sync/youtube', {
        method: 'POST',
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Sync failed')
      }

      setResult(data)
      // Refresh status after sync
      checkStatus()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sync failed')
    } finally {
      setLoading(false)
    }
  }

  if (!status) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            YouTube Sermon Sync
          </h1>

          {!status.configured ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <h3 className="text-yellow-800 font-medium">Not Configured</h3>
              <p className="text-yellow-700 mt-2">
                {status.message || 'YouTube sync settings not found in Sanity.'}
              </p>
              <div className="mt-4 text-sm text-yellow-600">
                <p className="font-medium">To set up:</p>
                <ol className="list-decimal list-inside mt-2 space-y-1">
                  <li>Open Sanity Studio</li>
                  <li>Create a &quot;YouTube Sync Settings&quot; document</li>
                  <li>Add your YouTube Playlist ID</li>
                  <li>Set your default preacher</li>
                  <li>Enable auto-sync or manual sync</li>
                </ol>
              </div>
            </div>
          ) : (
            <>
              <div className="bg-gray-50 rounded-md p-4 mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Current Settings</h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Status:</dt>
                    <dd className={status.settings?.syncEnabled ? 'text-green-600 font-medium' : 'text-red-600'}>
                      {status.settings?.syncEnabled ? '✅ Enabled' : '❌ Disabled'}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Playlist ID:</dt>
                    <dd className="font-mono text-gray-700">{status.settings?.playlistId?.slice(0, 20)}...</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Auto-Publish:</dt>
                    <dd className={status.settings?.autoPublish ? 'text-green-600' : 'text-gray-600'}>
                      {status.settings?.autoPublish ? 'Yes' : 'No (drafts)'}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Default Preacher:</dt>
                    <dd className="text-gray-700">{status.settings?.defaultPreacher || 'None set'}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Last Sync:</dt>
                    <dd className="text-gray-700">
                      {status.settings?.lastSyncAt 
                        ? new Date(status.settings.lastSyncAt).toLocaleString()
                        : 'Never'}
                    </dd>
                  </div>
                </dl>
              </div>

              <button
                onClick={handleSync}
                disabled={loading || !status.settings?.syncEnabled}
                className={`w-full py-3 px-4 rounded-md font-medium text-white transition-colors
                  ${loading || !status.settings?.syncEnabled
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-teal-600 hover:bg-teal-700'}
                `}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Syncing...
                  </span>
                ) : (
                  'Sync Now'
                )}
              </button>

              {error && (
                <div className="mt-4 bg-red-50 border border-red-200 rounded-md p-4">
                  <p className="text-red-700">{error}</p>
                </div>
              )}

              {result && (
                <div className={`mt-4 rounded-md p-4 ${result.error ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
                  <h4 className={result.error ? 'text-red-800 font-medium' : 'text-green-800 font-medium'}>
                    {result.error ? 'Error' : 'Success'}
                  </h4>
                  <p className={result.error ? 'text-red-700' : 'text-green-700'}>
                    {result.message}
                  </p>
                  {result.synced > 0 && (
                    <p className="text-green-600 text-sm mt-1">
                      Synced {result.synced} new sermon(s) from {result.totalInPlaylist} total in playlist
                    </p>
                  )}
                  {result.sermons && result.sermons.length > 0 && (
                    <div className="mt-3">
                      <p className="text-green-700 text-sm font-medium">New sermons:</p>
                      <ul className="mt-1 space-y-1">
                        {result.sermons.map((sermon) => (
                          <li key={sermon.id} className="text-green-600 text-sm">
                            • {sermon.title}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="font-medium text-gray-900 mb-2">How it works</h3>
            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
              <li>Fetches videos from your YouTube playlist</li>
              <li>Creates sermon documents in Sanity</li>
              <li>Extracts title, description, duration, and thumbnail</li>
              <li>Skips videos already synced (no duplicates)</li>
              <li>Auto-detects scripture references in titles</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
