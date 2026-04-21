'use client'

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schema'
import { SermonUploadTool } from './sanity/components/SermonUploadTool'
import { YouTubeSyncTool } from './sanity/components/YouTubeSyncTool'

// Custom structure with sermon tools
const customStructure = (S: any) =>
  S.list()
    .title('Content')
    .items([
      // Sermon Management Group
      S.listItem()
        .title('Sermon Management')
        .child(
          S.list()
            .title('Sermon Tools')
            .items([
              S.listItem()
                .title('Upload Sermon')
                .child(
                  S.component()
                    .title('Upload New Sermon')
                    .component(SermonUploadTool)
                ),
              S.listItem()
                .title('YouTube Sync')
                .child(
                  S.component()
                    .title('Sync from YouTube')
                    .component(YouTubeSyncTool)
                ),
              S.divider(),
              S.documentTypeListItem('sermon').title('All Sermons'),
              S.documentTypeListItem('sermonSeries').title('Sermon Series'),
              S.documentTypeListItem('preacher').title('Preachers'),
              S.documentTypeListItem('youtubeSettings').title('YouTube Settings'),
            ])
        ),
      
      S.divider(),
      
      // Regular document types
      ...S.documentTypeListItems().filter(
        (item: any) => !['sermon', 'sermonSeries', 'preacher', 'youtubeSettings'].includes(item.getId())
      ),
    ])

export default defineConfig({
  projectId: '98sik2dm',
  dataset: 'cbmweb',
  basePath: '/studio',
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool({ structure: customStructure }),
    visionTool({ defaultApiVersion: '2024-01-01' }),
  ],
})
