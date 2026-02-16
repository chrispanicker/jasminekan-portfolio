import type {StructureResolver} from 'sanity/structure'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Content')
    .items([
      orderableDocumentListDeskItem({
        type: 'projects',
        S,
        context,
        title: 'Projects',
      }),
      ...S.documentTypeListItems().filter((item) => item.getId() !== 'projects'),
    ])
