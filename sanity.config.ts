'use client'

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schema'

export default defineConfig({
  projectId: '98sik2dm',
  dataset: 'cbmweb',
  basePath: '/studio',
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool(),
    visionTool({ defaultApiVersion: '2024-01-01' }),
  ],
  studio: {
    components: {
      logo: {
        src: '/logo.png',
        style: {
          backgroundColor: '#000000',
        }
      }
    },
    theme: {
      __dark__: {
        '--card-bg-color': '#1a1a1a',
        '--card-fg-color': '#ffffff',
        '--input-bg-color': '#2a2a2a',
        '--input-fg-color': '#ffffff',
        '--bg-color': '#000000',
        '--fg-color': '#ffffff',
        '--border-color': '#333333',
        '--accent-color': '#10b981',
        '--focus-ring-color': '#10b981',
      },
    },
    customCss: '/studio.css',
  },
})
