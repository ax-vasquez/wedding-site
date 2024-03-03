import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'weatherConcern',
  title: 'Weather Concern',
  type: 'document',
  fields: [
    defineField({
        name: `title`,
        title: `Title`,
        type: `string`,
        validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: 'mitigations',
        title: 'Mitigations',
        validation: (Rule) => Rule.required(),
        type: 'array',
        of: [
            { type: 'string' }
        ],
    }),
  ],
})
