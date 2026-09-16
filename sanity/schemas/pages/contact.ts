import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'contact',
  title: 'Contact',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Contact Page Title',
      type: 'string',
      validation: (Rule) => [Rule.required()],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'bgImage',
      title: 'Background Image',
      type: 'image',
    }),

    defineField({
      name: 'email',
      title: 'Email',
      type: 'email',
      validation: (Rule) => [Rule.required()],
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      validation: (Rule) => [Rule.required()],
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string',
      validation: (Rule) => [Rule.required()],
    }),
    defineField({
      name: 'mapUrl',
      title: 'Embbed Map Url',
      type: 'string',
    }),
  ],
})
