export const info = {
  name: 'info',
  title: "Info",
  type: 'document',
    __experimental_actions: ['create', 'update', 'publish'],
  fields: [
    {
      name: 'title',
      title: "Site Title",
      type: 'string',
      description: 'Title of your site, appears on search engines and browser tabs.'
    },
    {
        name: 'shareimage',
        description: "This appears when you share the site link! 1200x360 & <1MB",
        title: "Share Image",
        type: 'image'
    },
    {
      name: 'contactEmail',
      title: 'Contact email',
      type: 'string',
      description: 'Enter your contact email address.',
      validation: (Rule: any) => Rule.regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { name: 'email', invert: false })
    },
    {
        name: 'bio',
        title: "Bio",
        description: 'A short bio about yourself to appear in the header. Automatically ends in "Contact her via..."',
        type: 'array',
        of: [{ type: 'block'}]
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Info'
      }
    }
  }
}

export default info;