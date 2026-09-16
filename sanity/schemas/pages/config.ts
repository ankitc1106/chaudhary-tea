import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'config',
  title: 'Config',
  type: 'document',
  fields: [
    defineField({
      name: 'topBar',
      title: 'Top Bar Title',
      type: 'string',
    }),

    defineField({
      name: 'favicon',
      title: 'favicon',
      type: 'image',
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'Whatsapp Number',
      type: 'string',
    }),

    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'string',
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'icon.manager',
            }),
          ],
        },
      ],
    }),

    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'object',
      fields: [
        defineField({
          name: 'logo',
          title: 'Logo',
          type: 'image',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
        }),
        defineField({
          name: 'copyrigth',
          title: 'Copyrigth',
          type: 'string',
        }),
      ],
    }),
  ],
})
