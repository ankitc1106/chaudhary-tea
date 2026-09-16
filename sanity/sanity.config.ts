import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {IconManager} from 'sanity-plugin-icon-manager'
import {myStructure} from './schemas/myStructure'
import {media} from 'sanity-plugin-media'
export default defineConfig({
  name: 'default',
  title: 'chaudhary-tea',

  projectId: 'wyastv6s',
  dataset: 'production',

  plugins: [structureTool({structure: myStructure}), visionTool(), IconManager(), media()],

  document: {
    actions: (prev) =>
      prev.map((originalAction) =>
        originalAction.action === 'delete' ? HelloWorldAction : originalAction,
      ),
  },

  schema: {
    types: schemaTypes,
  },
})

export function HelloWorldAction() {
  return {
    label: 'Support',
    onHandle: () => {
      window.alert('👋 Hello, Message us on whatsapp of support')
    },
  }
}
