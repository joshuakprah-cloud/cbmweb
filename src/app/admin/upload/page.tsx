'use client'

import { useState, useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'

interface Preacher {
  _id: string
  name: string
}

interface Series {
  _id: string
  title: string
}

export default function SermonUploadPage() {
  const [preachers, setPreachers] = useState<Preacher[]>([])
  const [series, setSeries] = useState<Series[]>([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [result, setResult] = useState<{ success?: boolean; message?: string; sermon?: any } | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Form state
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [scriptureReference, setScriptureReference] = useState('')
  const [preacherId, setPreacherId] = useState('')
  const [seriesId, setSeriesId] = useState('')
  const [duration, setDuration] = useState('')
  const [publishedAt, setPublishedAt] = useState(new Date().toISOString().slice(0, 16))

  // File state
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [audioFile, setAudioFile] = useState<File | null>(null)

  // Fetch preachers and series on mount
  useEffect(() => {
    fetchPreachersAndSeries()
  }, [])

  const fetchPreachersAndSeries = async () => {
    try {
      // Fetch from Sanity via API
      const response = await fetch('/api/sermons/upload/options')
      if (response.ok) {
        const data = await response.json()
        setPreachers(data.preachers || [])
        setSeries(data.series || [])
      }
    } catch (err) {
      console.error('Failed to fetch options:', err)
      // Set some defaults if API doesn't exist
      setPreachers([])
      setSeries([])
    }
  }

  // Video dropzone
  const onVideoDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0]
      // Check file size (500MB limit)
      if (file.size > 500 * 1024 * 1024) {
        setError('Video file is too large. Maximum size is 500MB.')
        return
      }
      setVideoFile(file)
      setError(null)
    }
  }, [])

  const videoDropzone = useDropzone({
    onDrop: onVideoDrop,
    accept: {
      'video/*': ['.mp4', '.mov', '.webm', '.mkv', '.avi', '.m4v']
    },
    maxFiles: 1,
    multiple: false,
  })

  // Thumbnail dropzone
  const onThumbnailDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setThumbnailFile(acceptedFiles[0])
    }
  }, [])

  const thumbnailDropzone = useDropzone({
    onDrop: onThumbnailDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.webp']
    },
    maxFiles: 1,
    multiple: false,
  })

  // Audio dropzone
  const onAudioDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setAudioFile(acceptedFiles[0])
    }
  }, [])

  const audioDropzone = useDropzone({
    onDrop: onAudioDrop,
    accept: {
      'audio/*': ['.mp3', '.wav', '.m4a', '.aac', '.ogg']
    },
    maxFiles: 1,
    multiple: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!videoFile) {
      setError('Please select a video file')
      return
    }
    
    if (!title || !preacherId) {
      setError('Title and preacher are required')
      return
    }

    setUploading(true)
    setUploadProgress(0)
    setError(null)
    setResult(null)

    try {
      const formData = new FormData()
      formData.append('video', videoFile)
      formData.append('title', title)
      formData.append('description', description)
      formData.append('scriptureReference', scriptureReference)
      formData.append('preacherId', preacherId)
      formData.append('duration', duration)
      formData.append('publishedAt', publishedAt)
      
      if (seriesId) formData.append('seriesId', seriesId)
      if (thumbnailFile) formData.append('thumbnail', thumbnailFile)
      if (audioFile) formData.append('audio', audioFile)

      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) return prev
          return prev + Math.random() * 10
        })
      }, 1000)

      const response = await fetch('/api/sermons/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.UPLOAD_API_KEY || 'dev-key'}`
        },
        body: formData,
      })

      clearInterval(progressInterval)
      setUploadProgress(100)

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed')
      }

      setResult({
        success: true,
        message: 'Sermon uploaded successfully!',
        sermon: data.sermon
      })

      // Reset form
      setTitle('')
      setDescription('')
      setScriptureReference('')
      setDuration('')
      setVideoFile(null)
      setThumbnailFile(null)
      setAudioFile(null)

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Upload Sermon Video</h1>
            <p className="text-gray-600 mt-1">Upload a local video file directly to your website</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Video Upload Zone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video File <span className="text-red-500">*</span>
              </label>
              <div
                {...videoDropzone.getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  videoDropzone.isDragActive
                    ? 'border-teal-500 bg-teal-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <input {...videoDropzone.getInputProps()} />
                {videoFile ? (
                  <div className="text-left">
                    <p className="font-medium text-gray-900">{videoFile.name}</p>
                    <p className="text-sm text-gray-500">{formatFileSize(videoFile.size)}</p>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        setVideoFile(null)
                      }}
                      className="text-red-500 text-sm mt-2 hover:text-red-600"
                    >
                      Remove file
                    </button>
                  </div>
                ) : (
                  <div>
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="mt-2 text-sm text-gray-600">
                      {videoDropzone.isDragActive
                        ? 'Drop the video here...'
                        : 'Drag and drop a video file, or click to select'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      MP4, MOV, WebM, MKV, AVI up to 500MB
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sermon Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="e.g., The Power of Faith"
              />
            </div>

            {/* Speaker & Series Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Speaker <span className="text-red-500">*</span>
                </label>
                <select
                  value={preacherId}
                  onChange={(e) => setPreacherId(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">Select a speaker...</option>
                  {preachers.map((preacher) => (
                    <option key={preacher._id} value={preacher._id}>
                      {preacher.name}
                    </option>
                  ))}
                </select>
                {preachers.length === 0 && (
                  <input
                    type="text"
                    placeholder="Enter preacher document ID"
                    value={preacherId}
                    onChange={(e) => setPreacherId(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 mt-2"
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Series (Optional)
                </label>
                <select
                  value={seriesId}
                  onChange={(e) => setSeriesId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">No series</option>
                  {series.map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Scripture & Duration Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Scripture Reference
                </label>
                <input
                  type="text"
                  value={scriptureReference}
                  onChange={(e) => setScriptureReference(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="e.g., Hebrews 11:1-6"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration
                </label>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="e.g., 45:30"
                />
              </div>
            </div>

            {/* Publish Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Publish Date
              </label>
              <input
                type="datetime-local"
                value={publishedAt}
                onChange={(e) => setPublishedAt(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter sermon description..."
              />
            </div>

            {/* Optional Files */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Thumbnail */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Thumbnail Image (Optional)
                </label>
                <div
                  {...thumbnailDropzone.getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
                    thumbnailDropzone.isDragActive
                      ? 'border-teal-500 bg-teal-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <input {...thumbnailDropzone.getInputProps()} />
                  {thumbnailFile ? (
                    <div className="text-left">
                      <p className="font-medium text-gray-900 text-sm">{thumbnailFile.name}</p>
                      <p className="text-xs text-gray-500">{formatFileSize(thumbnailFile.size)}</p>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600">Drop image or click to select</p>
                  )}
                </div>
              </div>

              {/* Audio */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Audio File (Optional)
                </label>
                <div
                  {...audioDropzone.getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
                    audioDropzone.isDragActive
                      ? 'border-teal-500 bg-teal-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <input {...audioDropzone.getInputProps()} />
                  {audioFile ? (
                    <div className="text-left">
                      <p className="font-medium text-gray-900 text-sm">{audioFile.name}</p>
                      <p className="text-xs text-gray-500">{formatFileSize(audioFile.size)}</p>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600">Drop audio or click to select</p>
                  )}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            {uploading && (
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Uploading...</span>
                  <span>{Math.round(uploadProgress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-teal-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            {/* Success */}
            {result?.success && (
              <div className="bg-green-50 border border-green-200 rounded-md p-4">
                <p className="text-green-700 font-medium">{result.message}</p>
                {result.sermon && (
                  <p className="text-green-600 text-sm mt-1">
                    Sermon created: {result.sermon.title}
                  </p>
                )}
              </div>
            )}

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={uploading || !videoFile || !title || !preacherId}
                className={`flex-1 py-3 px-4 rounded-md font-medium text-white transition-colors ${
                  uploading || !videoFile || !title || !preacherId
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-teal-600 hover:bg-teal-700'
                }`}
              >
                {uploading ? 'Uploading...' : 'Upload Sermon'}
              </button>

              <a
                href="/admin/youtube-sync"
                className="px-4 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                YouTube Sync →
              </a>
            </div>
          </form>
        </div>

        {/* Tips */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-medium text-blue-900 mb-2">Tips for best results</h3>
          <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
            <li>Use MP4 format for best compatibility</li>
            <li>Compress videos before uploading (handbrake.fr)</li>
            <li>Upload thumbnails in 16:9 ratio (1920x1080 recommended)</li>
            <li>For files larger than 500MB, use YouTube sync instead</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
