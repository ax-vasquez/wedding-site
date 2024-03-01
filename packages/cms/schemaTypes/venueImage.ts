import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'venueImage',
  title: 'Venue Image',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: `key`,
        title: `Key`,
        type: `slug`,
        options: {
            source: `title`,
            slugify: (input: string) => input
            .toLowerCase()
            .replace(/\s+/g, `-`)
            .slice(0, 200),
        },
    }),
    defineField({
        name: 'image',
        type: 'image',
        validation: (Rule) => Rule.required(),
    })
  ],
})
