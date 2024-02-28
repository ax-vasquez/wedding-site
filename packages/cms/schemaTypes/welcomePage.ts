import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'welcomePage',
  title: 'Welcome Page',
  type: 'document',
  fields: [
    defineField({
      name: 'welcomeMessage',
      title: 'Welcome Message',
      type: 'blockContent',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
