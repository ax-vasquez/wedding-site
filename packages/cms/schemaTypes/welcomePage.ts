import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'welcomePage',
  title: 'Welcome Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'welcomeMessage',
      title: 'Welcome Message',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
