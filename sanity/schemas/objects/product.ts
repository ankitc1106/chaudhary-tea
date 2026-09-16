import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'productItem',
  title: 'Product Item',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),

    defineField({
      name: 'buyLink',
      title: 'Buy Link',
      type: 'url',
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),

    defineField({
      name: 'sideImage',
      title: 'Side Image',
      type: 'image',
    }),

    defineField({
      name: 'variants',
      title: 'Variants',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: 'price',
              title: 'Price',
              type: 'number',
            }),
            defineField({
              name: 'gram',
              title: 'Gram',
              type: 'string',
            }),
          ],
        },
      ],
    }),
  ],
})
