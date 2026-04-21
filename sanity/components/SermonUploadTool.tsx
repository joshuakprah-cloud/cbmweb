import React, { useState, useCallback } from 'react'
import { useClient } from 'sanity'
import { Card, Stack, Text, Button, TextInput, Select, Grid, Flex, Box, Spinner, ToastProvider, useToast } from '@sanity/ui'
import { UploadIcon, PlayIcon, ImageIcon, DocumentIcon } from '@sanity/icons'

interface Preacher {
  _id: string
  name: string
}

interface Series {
  _id: string
  title: string
}

export function SermonUploadTool() {
  const client = useClient({ apiVersion: '2023-01-01' })
  const toast = useToast()
  
  const [uploading, setUploading] = useState(false)
  const [title, setTitle] = useState('')
  const [scripture, setScripture] = useState('')
  const [preacher, setPreacher] = useState('')
  const [series, setSeries] = useState('')
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [preachers, setPreachers] = useState<Preacher[]>([])
  const [seriesList, setSeriesList] = useState<Series[]>([])

  // Fetch preachers and series on mount
  React.useEffect(() => {
    const fetchOptions = async () => {
      const [preachersData, seriesData] = await Promise.all([
        client.fetch(`*[_type == "preacher"] | order(name asc) { _id, name }`),
        client.fetch(`*[_type == "sermonSeries"] | order(title asc) { _id, title }`)
      ])
      setPreachers(preachersData)
      setSeriesList(seriesData)
    }
    fetchOptions()
  }, [client])

  const handleUpload = useCallback(async () => {
    if (!title || !videoFile) {
      toast.push({
        status: 'error',
        title: 'Missing required fields',
        description: 'Please provide a title and video file'
      })
      return
    }

    setUploading(true)

    try {
      // Upload video file
      const videoAsset = await client.assets.upload('file', videoFile, {
        filename: videoFile.name,
        contentType: videoFile.type
      })

      // Upload thumbnail if provided
      let thumbnailAsset = null
      if (thumbnailFile) {
        thumbnailAsset = await client.assets.upload('image', thumbnailFile, {
          filename: thumbnailFile.name
        })
      }

      // Upload audio if provided
      let audioAsset = null
      if (audioFile) {
        audioAsset = await client.assets.upload('file', audioFile, {
          filename: audioFile.name,
          contentType: audioFile.type
        })
      }

      // Create sermon document
      const sermonDoc = {
        _type: 'sermon',
        title,
        scripture: scripture || undefined,
        preacher: preacher ? { _type: 'reference', _ref: preacher } : undefined,
        series: series ? { _type: 'reference', _ref: series } : undefined,
        videoSource: 'upload',
        videoFile: {
          _type: 'file',
          asset: { _type: 'reference', _ref: videoAsset._id }
        },
        thumbnail: thumbnailAsset ? {
          _type: 'image',
          asset: { _type: 'reference', _ref: thumbnailAsset._id }
        } : undefined,
        audioFile: audioAsset ? {
          _type: 'file',
          asset: { _type: 'reference', _ref: audioAsset._id }
        } : undefined,
        isPublished: true,
        publishedAt: new Date().toISOString()
      }

      const created = await client.create(sermonDoc)

      toast.push({
        status: 'success',
        title: 'Sermon uploaded successfully',
        description: `Created sermon: ${title}`
      })

      // Reset form
      setTitle('')
      setScripture('')
      setPreacher('')
      setSeries('')
      setVideoFile(null)
      setThumbnailFile(null)
      setAudioFile(null)

    } catch (error) {
      toast.push({
        status: 'error',
        title: 'Upload failed',
        description: error instanceof Error ? error.message : 'Unknown error'
      })
    } finally {
      setUploading(false)
    }
  }, [client, title, scripture, preacher, series, videoFile, thumbnailFile, audioFile, toast])

  return (
    <ToastProvider>
      <Card padding={4}>
        <Stack space={4}>
          <Text size={2} weight="semibold">
            Upload New Sermon
          </Text>
          
          <Grid columns={[1, 1, 2]} gap={4}>
            <Stack space={3}>
              <TextInput
                label="Sermon Title *"
                placeholder="Enter sermon title"
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
              />
              
              <TextInput
                label="Scripture Reference"
                placeholder="e.g., John 3:16-17"
                value={scripture}
                onChange={(e) => setScripture(e.currentTarget.value)}
              />
              
              <Select
                label="Preacher"
                value={preacher}
                onChange={(e) => setPreacher(e.currentTarget.value)}
              >
                <option value="">Select a preacher</option>
                {preachers.map((p) => (
                  <option key={p._id} value={p._id}>{p.name}</option>
                ))}
              </Select>
              
              <Select
                label="Series"
                value={series}
                onChange={(e) => setSeries(e.currentTarget.value)}
              >
                <option value="">Select a series (optional)</option>
                {seriesList.map((s) => (
                  <option key={s._id} value={s._id}>{s.title}</option>
                ))}
              </Select>
            </Stack>

            <Stack space={3}>
              <Box>
                <Text size={1} weight="medium" style={{ marginBottom: '0.5rem' }}>
                  Video File *
                </Text>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                  style={{ display: 'block', marginTop: '0.5rem' }}
                />
                {videoFile && (
                  <Text size={1} muted style={{ marginTop: '0.5rem' }}>
                    Selected: {videoFile.name} ({(videoFile.size / 1024 / 1024).toFixed(2)} MB)
                  </Text>
                )}
              </Box>

              <Box>
                <Text size={1} weight="medium" style={{ marginBottom: '0.5rem' }}>
                  <ImageIcon style={{ marginRight: '0.25rem' }} /> Thumbnail Image
                </Text>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
                  style={{ display: 'block', marginTop: '0.5rem' }}
                />
                {thumbnailFile && (
                  <Text size={1} muted style={{ marginTop: '0.5rem' }}>
                    Selected: {thumbnailFile.name}
                  </Text>
                )}
              </Box>

              <Box>
                <Text size={1} weight="medium" style={{ marginBottom: '0.5rem' }}>
                  <DocumentIcon style={{ marginRight: '0.25rem' }} /> Audio File (Optional)
                </Text>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
                  style={{ display: 'block', marginTop: '0.5rem' }}
                />
                {audioFile && (
                  <Text size={1} muted style={{ marginTop: '0.5rem' }}>
                    Selected: {audioFile.name}
                  </Text>
                )}
              </Box>
            </Stack>
          </Grid>

          <Flex justify="flex-end" paddingTop={4}>
            <Button
              mode="default"
              tone="positive"
              onClick={handleUpload}
              disabled={uploading || !title || !videoFile}
              icon={uploading ? Spinner : UploadIcon}
              text={uploading ? 'Uploading...' : 'Upload Sermon'}
            />
          </Flex>
        </Stack>
      </Card>
    </ToastProvider>
  )
}
