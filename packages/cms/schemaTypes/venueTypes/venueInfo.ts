import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'venueInfo',
  title: 'Venue Information Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'venueOverview',
      title: 'Venue Overview',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: 'venueContact',
        title: 'Venue Contact Info',
        validation: (Rule) => Rule.required(),
        type: 'array',
          of: [
              { type: 'string' }
          ],
    }),
    defineField({
        name: 'venueAddress',
        title: 'Venue Address',
        type: 'blockContent',
        validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: 'venueHours',
        title: 'Venue Hours',
        validation: (Rule) => Rule.required(),
        type: 'array',
          of: [
              { type: 'string' }
          ],
    }),
    defineField({
        name: 'venueAmenities',
        title: 'Venue Amenities',
        validation: (Rule) => Rule.required(),
        type: 'array',
          of: [
              { type: 'string' }
          ],
    }),
    defineField({
        name: 'roomAmenities',
        title: 'Room Amenities',
        validation: (Rule) => Rule.required(),
        type: 'array',
          of: [
              { type: 'string' }
          ],
    }),
    defineField({
        name: 'dogAmenities',
        title: 'Dog Amenities',
        validation: (Rule) => Rule.required(),
        type: 'array',
          of: [
              { type: 'string' }
          ],
    }),
],
})
