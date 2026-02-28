import { type SchemaTypeDefinition } from '@sanity/types'
import { projects } from './projects'
import { info } from './info'
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [projects, info],
}
