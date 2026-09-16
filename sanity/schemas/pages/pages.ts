import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'page',
  title: 'page',
  type: 'document',
  fields: [
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'brandName',
      title: 'Brand Name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'brandName',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
    }),
    defineField({
      name: 'pattern',
      title: 'Pattern',
      type: 'image',
    }),

    defineField({
      name: 'heroSection',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({
          name: 'heroImage',
          title: 'Hero Image',
          type: 'image',
        }),
        defineField({
          name: 'heroTitle',
          title: 'Hero Title',
          type: 'string',
        }),
        defineField({
          name: 'heroText',
          title: 'Hero Text',
          type: 'text',
        }),
      ],
    }),

    defineField({
      name: 'productSection',
      title: 'Product Section',
      type: 'array',
      of: [{type: 'productItem'}],
    }),

    defineField({
      name: 'infoSection',
      title: 'Info Section',
      type: 'object',
      fields: [
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
        }),
        defineField({
          name: 'title',
          title: ' Title',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
        }),
      ],
    }),
    defineField({
      name: 'featureSection',
      title: 'Feature Section',
      type: 'object',
      fields: [
        defineField({
          name: 'prodImage',
          title: 'Product Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
        defineField({
          name: 'feature',
          title: 'Features',
          type: 'array',

          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Feature Title',
                  type: 'string',
                }),
                defineField({
                  name: 'icon',
                  title: 'Feature Icon',
                  type: 'icon.manager',
                }),
              ],
            },
          ],
        }),
      ],
    }),

    defineField({
      name: 'navOrder',
      title: 'Nav Order',
      type: 'number',
    }),
  ],
})
