import { defineField, defineType } from 'sanity'

export const youtubeSettingsType = defineType({
  name: 'youtubeSettings',
  title: 'YouTube Sync Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'playlistId',
      title: 'YouTube Playlist ID',
      type: 'string',
      description: 'The ID of the YouTube playlist to sync sermons from (e.g., PLxxxxxxxxxxxxxxxxxxxxxxxx)',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'channelId',
      title: 'YouTube Channel ID',
      type: 'string',
      description: 'Optional: Your YouTube channel ID for additional filtering'
    }),
    defineField({
      name: 'defaultPreacher',
      title: 'Default Preacher',
      type: 'reference',
      to: [{ type: 'preacher' }],
      description: 'Default preacher to assign to auto-synced sermons'
    }),
    defineField({
      name: 'autoPublish',
      title: 'Auto-Publish Sermons',
      type: 'boolean',
      initialValue: false,
      description: 'Automatically publish sermons when synced (vs saving as drafts)'
    }),
    defineField({
      name: 'lastSyncAt',
      title: 'Last Sync',
      type: 'datetime',
      readOnly: true,
      description: 'When the last sync occurred'
    }),
    defineField({
      name: 'syncEnabled',
      title: 'Enable Auto-Sync',
      type: 'boolean',
      initialValue: true,
      description: 'Enable automatic syncing from YouTube'
    }),
    defineField({
      name: 'syncFrequency',
      title: 'Sync Frequency',
      type: 'string',
      options: {
        list: [
          { title: 'Every hour', value: 'hourly' },
          { title: 'Every 6 hours', value: '6hours' },
          { title: 'Daily', value: 'daily' },
          { title: 'Manual only', value: 'manual' }
        ]
      },
      initialValue: 'daily'
    })
  ],
  preview: {
    select: {
      playlistId: 'playlistId',
      lastSyncAt: 'lastSyncAt',
      syncEnabled: 'syncEnabled'
    },
    prepare({ playlistId, lastSyncAt, syncEnabled }) {
      return {
        title: 'YouTube Sync Settings',
        subtitle: `${syncEnabled ? '✅ Enabled' : '❌ Disabled'} | ${lastSyncAt ? `Last sync: ${new Date(lastSyncAt).toLocaleDateString()}` : 'Never synced'} | Playlist: ${playlistId?.slice(0, 20)}...`
      }
    }
  }
})
