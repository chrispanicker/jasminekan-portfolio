import { type SchemaTypeDefinition } from '@sanity/types'
import { projects } from './projects'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [projects],
}
