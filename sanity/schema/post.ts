import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: Rule => Rule.required().min(3).max(120),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'author',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      type: 'text',
      validation: Rule => Rule.required().max(200),
    }),
    defineField({
      name: 'body',
      type: 'portableText',
    }),
    defineField({
      name: 'coverImage',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
    }),
    defineField({
      name: 'tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'readTime',
      type: 'string',
    }),
    defineField({
      name: 'isFeatured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isPublished',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      publishedAt: 'publishedAt',
      media: 'coverImage',
    },
  },
});
