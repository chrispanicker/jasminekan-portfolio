import {orderRankField} from '@sanity/orderable-document-list'

export const projects = {
  name: 'projects',
  title:'Projects',
  type: 'document',
  fields: [
    orderRankField({ type: 'projects' }),
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',  
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
    }, 
    {
      name: 'type',
      title: 'Type',
      type: 'string',
    },
    {
      name: 'year',
      title: 'Year',
      type: 'string',
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
    },
  ],
}