import type { StructureResolver } from 'sanity/structure'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

// Optionally, import icons from react-icons if you want to use them
// import { MdInfo } from 'react-icons/md'

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Content')
    .items([
      // Projects: orderable, addable list
      orderableDocumentListDeskItem({
        type: 'projects',
        S,
        context,
        title: 'Projects',
      }),
      // Info: singleton
      S.listItem()
        .title('Site Info')
        // .icon(MdInfo) // Uncomment and import an icon if desired
        .child(
          S.document()
            .schemaType('info')
            .documentId('infoSingleton')
        ),
      // Add other document types except 'projects' and 'info'
      ...S.documentTypeListItems().filter(
        (item) => !['projects', 'info'].includes(item.getId())
      ),
    ])
