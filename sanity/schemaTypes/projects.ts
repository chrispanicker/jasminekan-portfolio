import {orderRankField} from '@sanity/orderable-document-list'
import { validation } from 'sanity'
import { PreviewInput } from '../components/preview-input'

export const projects = {
  name: 'projects',
  title:'Projects',
  type: 'document',
  fields: [
    orderRankField({ type: 'projects' }),
    {
      name: 'title',
      description: 'The title of the project.',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required().error('A title is required for each project.')
    },
    {
      name: 'slug',
      description: 'The slug for the project, used in URLs.',
      title: 'Slug',  
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required().error('A slug is required for each project.')
    },
    {
      name: 'description',
      description: 'A detailed description of the project.',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule: any) => Rule.required().error('A description is required for each project.')
    }, 
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      validation: (Rule: any) => Rule.required().error('A type is required for each project.')
    },
    {
      name: 'year',
      title: 'Year',
      type: 'string',
      validation: (Rule: any) => Rule.required().error('A year is required for each project.')
    },
    {
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
      //need a validation rule because this is a manditory landing page preview
      validation: (Rule: any) => Rule.required().error('A preview image is required for each project.')
    },
    {
      name: 'media',
      title: 'Media',
      type: 'array',
      of: [{
        name: 'image',
        title: 'Image',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'file',
        title: 'File',
        type: 'file',
      }],
        validation: (Rule: any) => Rule.required().error('At least one media item is required for each project.')
    },
  ],
}