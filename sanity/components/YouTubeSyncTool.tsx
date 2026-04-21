import React, { useState, useCallback, useEffect } from 'react'
import { useClient } from 'sanity'
import { Card, Stack, Text, Button, TextInput, Select, Flex, Box, Spinner, Checkbox, Grid, Dialog } from '@sanity/ui'
import { SyncIcon, PlayIcon, WarningOutlineIcon, CheckmarkIcon } from '@sanity/icons'

interface YouTubeSettings {
  _id: string
  playlistId: string
  syncEnabled: boolean
  autoPublish: boolean
  defaultPreacher?: { _id: string; name: string }
}

interface Preacher {
  _id: string
  name: string
}

interface SyncResult {
  success: boolean
  message: string
  imported?: number
  errors?: string[]
}

export function YouTubeSyncTool() {
  const client = useClient({ apiVersion: '2023-01-01' })
  
  const [loading, setLoading] = useState(false)
  const [syncing, setSyncing] = useState(false)
  const [settings, setSettings] = useState<YouTubeSettings | null>(null)
  const [preachers, setPreachers] = useState<Preacher[]>([])
  const [playlistId, setPlaylistId] = useState('')
  const [syncEnabled, setSyncEnabled] = useState(true)
  const [autoPublish, setAutoPublish] = useState(true)
  const [defaultPreacher, setDefaultPreacher] = useState('')
  const [syncResult, setSyncResult] = useState<SyncResult | null>(null)
  const [showResultDialog, setShowResultDialog] = useState(false)

  // Fetch settings and preachers
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const [settingsData, preachersData] = await Promise.all([
          client.fetch(`*[_type == "youtubeSettings"][0]`),
          client.fetch(`*[_type == "preacher"] | order(name asc) { _id, name }`)
        ])
        
        if (settingsData) {
          setSettings(settingsData)
          setPlaylistId(settingsData.playlistId || '')
          setSyncEnabled(settingsData.syncEnabled ?? true)
          setAutoPublish(settingsData.autoPublish ?? true)
          setDefaultPreacher(settingsData.defaultPreacher?._ref || '')
        }
        
        setPreachers(preachersData)
      } catch (error) {
        console.error('Failed to fetch data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [client])

  const saveSettings = useCallback(async () => {
    try {
      const doc = {
        _type: 'youtubeSettings',
        playlistId,
        syncEnabled,
        autoPublish,
        defaultPreacher: defaultPreacher ? { _type: 'reference', _ref: defaultPreacher } : undefined
      }

      if (settings?._id) {
        await client.patch(settings._id).set(doc).commit()
      } else {
        await client.create({ ...doc, _id: 'youtubeSettings' })
      }

      return true
    } catch (error) {
      console.error('Failed to save settings:', error)
      return false
    }
  }, [client, playlistId, syncEnabled, autoPublish, defaultPreacher, settings])

  const handleSync = useCallback(async () => {
    if (!playlistId) {
      setSyncResult({
        success: false,
        message: 'Please enter a YouTube playlist ID first'
      })
      setShowResultDialog(true)
      return
    }

    setSyncing(true)
    
    // Save settings first
    await saveSettings()

    try {
      const response = await fetch('/api/sermons/sync/youtube', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playlistId,
          autoPublish,
          defaultPreacherId: defaultPreacher || undefined
        })
      })

      const result = await response.json()
      
      setSyncResult({
        success: response.ok,
        message: result.message || (response.ok ? 'Sync completed successfully' : 'Sync failed'),
        imported: result.imported,
        errors: result.errors
      })
      
      setShowResultDialog(true)
    } catch (error) {
      setSyncResult({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to sync with YouTube'
      })
      setShowResultDialog(true)
    } finally {
      setSyncing(false)
    }
  }, [playlistId, autoPublish, defaultPreacher, saveSettings])

  if (loading) {
    return (
      <Card padding={4}>
        <Flex justify="center" align="center" padding={4}>
          <Spinner />
          <Text style={{ marginLeft: '1rem' }}>Loading settings...</Text>
        </Flex>
      </Card>
    )
  }

  return (
    <>
      <Card padding={4}>
        <Stack space={4}>
          <Text size={2} weight="semibold">
            YouTube Playlist Sync
          </Text>
          
          <Text size={1} muted>
            Automatically import sermons from a YouTube playlist. Configure your settings below, then click Sync to import videos.
          </Text>

          <Grid columns={[1, 1, 2]} gap={4}>
            <Stack space={3}>
              <TextInput
                label="YouTube Playlist ID *"
                placeholder="e.g., PLxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                value={playlistId}
                onChange={(e) => setPlaylistId(e.currentTarget.value)}
              />
              <Text size={1} muted style={{ marginTop: '0.25rem' }}>
                The ID from your YouTube playlist URL
              </Text>
              
              <Select
                label="Default Preacher"
                value={defaultPreacher}
                onChange={(e) => setDefaultPreacher(e.currentTarget.value)}
              >
                <option value="">Select default preacher</option>
                {preachers.map((p) => (
                  <option key={p._id} value={p._id}>{p.name}</option>
                ))}
              </Select>
            </Stack>

            <Stack space={3}>
              <Box>
                <Checkbox
                  label="Enable automatic sync"
                  checked={syncEnabled}
                  onChange={(e) => setSyncEnabled(e.target.checked)}
                />
                <Text size={1} muted style={{ marginLeft: '1.5rem', marginTop: '0.25rem' }}>
                  Automatically sync new videos from playlist
                </Text>
              </Box>
              
              <Box>
                <Checkbox
                  label="Auto-publish sermons"
                  checked={autoPublish}
                  onChange={(e) => setAutoPublish(e.target.checked)}
                />
                <Text size={1} muted style={{ marginLeft: '1.5rem', marginTop: '0.25rem' }}>
                  Publish sermons immediately after import
                </Text>
              </Box>
            </Stack>
          </Grid>

          <Flex justify="flex-end" gap={3} paddingTop={4}>
            <Button
              mode="ghost"
              onClick={saveSettings}
              text="Save Settings"
            />
            <Button
              mode="default"
              tone="positive"
              onClick={handleSync}
              disabled={syncing || !playlistId}
              icon={syncing ? Spinner : SyncIcon}
              text={syncing ? 'Syncing...' : 'Sync Now'}
            />
          </Flex>

          {syncResult && !showResultDialog && (
            <Card 
              tone={syncResult.success ? 'positive' : 'critical'} 
              padding={3}
              radius={2}
            >
              <Flex align="center" gap={2}>
                {syncResult.success ? <CheckmarkIcon /> : <WarningOutlineIcon />}
                <Text size={2}>{syncResult.message}</Text>
              </Flex>
              {syncResult.imported !== undefined && (
                <Text size={1} muted style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
                  Imported: {syncResult.imported} sermon(s)
                </Text>
              )}
            </Card>
          )}
        </Stack>
      </Card>

      {showResultDialog && (
        <Dialog
          header={syncResult?.success ? 'Sync Successful' : 'Sync Failed'}
          id="sync-result-dialog"
          onClose={() => setShowResultDialog(false)}
          zOffset={1000}
        >
          <Box padding={4}>
            <Stack space={3}>
              <Flex align="center" gap={2}>
                {syncResult?.success ? (
                  <><CheckmarkIcon color="green" /> <Text size={2} weight="semibold">Success!</Text></>
                ) : (
                  <><WarningOutlineIcon color="red" /> <Text size={2} weight="semibold">Error</Text></>
                )}
              </Flex>
              
              <Text>{syncResult?.message}</Text>
              
              {syncResult?.imported !== undefined && syncResult.imported > 0 && (
                <Text size={2} weight="medium" style={{ color: 'green' }}>
                  Imported {syncResult.imported} new sermon(s)
                </Text>
              )}
              
              {syncResult?.errors && syncResult.errors.length > 0 && (
                <Box>
                  <Text size={1} weight="medium" style={{ color: 'red' }}>Errors:</Text>
                  <Stack space={1} paddingTop={2}>
                    {syncResult.errors.map((error, i) => (
                      <Text key={i} size={1} muted>{error}</Text>
                    ))}
                  </Stack>
                </Box>
              )}

              <Flex justify="flex-end" paddingTop={4}>
                <Button
                  onClick={() => setShowResultDialog(false)}
                  text="Close"
                  mode="default"
                />
              </Flex>
            </Stack>
          </Box>
        </Dialog>
      )}
    </>
  )
}
