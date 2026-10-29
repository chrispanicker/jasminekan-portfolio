import { orderRankField } from '@sanity/orderable-document-list'
import { defineArrayMember, defineField, defineType } from 'sanity'
import { MediaArrayInput } from '../components/media-array-input'
import { PreviewInput } from '../components/preview-input'

export const projects = defineType({
  name: 'projects',
  title: 'Projects',
  type: 'document',
  fields: [
    orderRankField({ type: 'projects' }),
    defineField({
      name: 'title',
      description: 'The title of the project.',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().error('A title is required for each project.'),
    }),
    defineField({
      name: 'slug',
      description: 'The slug for the project, used in URLs.',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('A slug is required for each project.'),
    }),
    defineField({
      name: 'description',
      description: 'A detailed description of the project.',
      title: 'Description',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
      validation: (Rule) => Rule.required().error('A description is required for each project.'),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      validation: (Rule) => Rule.required().error('A type is required for each project.'),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      validation: (Rule) => Rule.required().error('A year is required for each project.'),
    }),
    defineField({
      name: 'preview',
      title: 'Preview',
      description: 'A preview image for the project, on the landing page.',
      type: 'image',
      options: {
        hotspot: true,
      },
      components: {
        input: PreviewInput,
      },
      validation: (Rule) => Rule.required().error('A preview image is required for each project.'),
    }),
    defineField({
      name: 'media',
      title: 'Media',
      components: {
        input: MediaArrayInput,
      },
      description:
        'Add images or Mux videos, then drag items to set their display order. Use the legacy Sanity video type only for existing videos being migrated to Mux.',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
        defineArrayMember({
          name: 'muxVideo',
          title: 'Mux video',
          type: 'mux.video',
        }),
        defineArrayMember({
          name: 'legacyFile',
          title: 'Legacy Sanity video (existing only)',
          description: 'For existing Sanity videos only. Upload new videos as Mux videos.',
          type: 'file',
          deprecated: {
            reason: 'Upload new videos to Mux to avoid storing and streaming them from Sanity.',
          },
        }),
      ],
      validation: (Rule) =>
        Rule.required().min(1).error('At least one media item is required for each project.'),
    }),
  ],
})