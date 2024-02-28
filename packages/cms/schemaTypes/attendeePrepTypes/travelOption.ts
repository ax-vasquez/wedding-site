import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'travelOption',
  title: 'Travel Option',
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
        name: `estMinCost`,
        title: `Estimated Minimum Cost`,
        type: `number`,
        validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: `estMaxCost`,
        title: `Estimated Max Cost`,
        type: `number`,
        validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: `airportPickupAvailable`,
        title: `Airport Pickup Available?`,
        type: `boolean`,
        validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: 'risks',
        title: 'Risks',
        validation: (Rule) => Rule.required(),
        type: 'array',
        of: [
            { type: 'string' }
        ]
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
