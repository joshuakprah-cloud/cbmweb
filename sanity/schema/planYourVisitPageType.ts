import { defineField, defineType } from 'sanity'

export const planYourVisitPageType = defineType({
  name: 'planYourVisitPage',
  title: 'Plan Your Visit Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Plan Your Visit',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Hero Title',
          type: 'string',
          initialValue: 'Plan Your Visit'
        }),
        defineField({
          name: 'subtitle',
          title: 'Hero Subtitle',
          type: 'text',
          initialValue: "Your First Sunday Starts Here. We know walking into a new church can feel like a big step."
        }),
        defineField({
          name: 'backgroundImage',
          title: 'Hero Background Image',
          type: 'image',
          options: { hotspot: true }
        })
      ]
    }),
    defineField({
      name: 'quickInfo',
      title: 'Quick Info Band',
      type: 'object',
      fields: [
        defineField({
          name: 'location',
          title: 'Location',
          type: 'string',
          initialValue: 'Taifa Burkina, Accra'
        }),
        defineField({
          name: 'mainServiceTime',
          title: 'Main Service Time',
          type: 'string',
          initialValue: 'Sundays at 9:00 AM'
        }),
        defineField({
          name: 'serviceDuration',
          title: 'Service Duration',
          type: 'string',
          initialValue: 'About 2–3 Hours'
        }),
        defineField({
          name: 'dressCode',
          title: 'Dress Code Label',
          type: 'string',
          initialValue: 'Come As You Are'
        })
      ]
    }),
    defineField({
      name: 'whatToExpect',
      title: 'What to Expect Section',
      type: 'object',
      fields: [
        defineField({
          name: 'sectionLabel',
          title: 'Section Label',
          type: 'string',
          initialValue: 'No Surprises'
        }),
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'What to Expect'
        }),
        defineField({
          name: 'description',
          title: 'Section Description',
          type: 'text',
          initialValue: 'We want your first visit to feel comfortable, not confusing. Here is what happens when you walk through our doors.'
        }),
        defineField({
          name: 'steps',
          title: 'Experience Steps',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              defineField({ name: 'number', title: 'Step Number', type: 'string' }),
              defineField({ name: 'icon', title: 'Icon Name', type: 'string', description: 'Lucide icon name (e.g., MapPin, Sparkles, BookOpen, Heart, Users)' }),
              defineField({ name: 'title', title: 'Step Title', type: 'string' }),
              defineField({ name: 'description', title: 'Step Description', type: 'text' })
            ]
          }]
        })
      ]
    }),
    defineField({
      name: 'whenYouArrive',
      title: 'When You Arrive Section',
      type: 'object',
      fields: [
        defineField({
          name: 'sectionLabel',
          title: 'Section Label',
          type: 'string',
          initialValue: 'Step by Step'
        }),
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'When You Arrive'
        }),
        defineField({
          name: 'description',
          title: 'Section Description',
          type: 'text',
          initialValue: "We've made it simple. Here's exactly what to do when you get here."
        }),
        defineField({
          name: 'steps',
          title: 'Arrival Steps',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              defineField({ name: 'icon', title: 'Icon Name', type: 'string' }),
              defineField({ name: 'title', title: 'Step Title', type: 'string' }),
              defineField({ name: 'description', title: 'Step Description', type: 'text' })
            ]
          }]
        })
      ]
    }),
    defineField({
      name: 'testimonial',
      title: 'Visitor Testimonial',
      type: 'object',
      fields: [
        defineField({ name: 'quote', title: 'Quote', type: 'text' }),
        defineField({ name: 'author', title: 'Author Name', type: 'string' }),
        defineField({ name: 'detail', title: 'Author Detail', type: 'string', description: 'e.g., First-time visitor, now a regular' })
      ]
    }),
    defineField({
      name: 'services',
      title: 'Services Section',
      type: 'object',
      fields: [
        defineField({
          name: 'sectionLabel',
          title: 'Section Label',
          type: 'string',
          initialValue: 'When to Come'
        }),
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Our Services'
        }),
        defineField({
          name: 'description',
          title: 'Section Description',
          type: 'text',
          initialValue: 'Every service is a fresh encounter with God. Here\'s when we gather.'
        }),
        defineField({
          name: 'durationNote',
          title: 'Duration Note',
          type: 'string',
          initialValue: 'Service lasts about 2–3 hours'
        }),
        defineField({
          name: 'serviceList',
          title: 'Services',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              defineField({ name: 'id', title: 'Service ID', type: 'string' }),
              defineField({ name: 'name', title: 'Service Name', type: 'string' }),
              defineField({ name: 'day', title: 'Day', type: 'string' }),
              defineField({ name: 'time', title: 'Time', type: 'string' }),
              defineField({ name: 'description', title: 'Description', type: 'text' }),
              defineField({ name: 'isMain', title: 'Is Main Service', type: 'boolean', initialValue: false })
            ]
          }]
        })
      ]
    }),
    defineField({
      name: 'dressCode',
      title: 'Dress Code Section',
      type: 'object',
      fields: [
        defineField({
          name: 'sectionLabel',
          title: 'Section Label',
          type: 'string',
          initialValue: 'Come As You Are'
        }),
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'What to Wear'
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          initialValue: 'There is no dress code at ThaGospel Church. We believe God looks at the heart, not at the outfit.'
        }),
        defineField({
          name: 'secondaryDescription',
          title: 'Secondary Description',
          type: 'text',
          initialValue: 'Most of our congregation comes in smart casual — jeans, a nice top, or traditional Ghanaian wear. Some dress more formally. Both are completely fine.'
        }),
        defineField({
          name: 'image',
          title: 'Dress Code Image',
          type: 'image',
          options: { hotspot: true }
        }),
        defineField({
          name: 'tags',
          title: 'Dress Code Tags',
          type: 'array',
          of: [{ type: 'string' }],
          initialValue: ['Smart Casual', 'Traditional Wear', 'Formal']
        })
      ]
    }),
    defineField({
      name: 'kidsMinistry',
      title: 'Kids Ministry Section',
      type: 'object',
      fields: [
        defineField({
          name: 'sectionLabel',
          title: 'Section Label',
          type: 'string',
          initialValue: 'For Your Family'
        }),
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Your Kids Are in Good Hands.'
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text'
        }),
        defineField({
          name: 'secondaryDescription',
          title: 'Secondary Description',
          type: 'text'
        }),
        defineField({
          name: 'features',
          title: 'Kids Features',
          type: 'array',
          of: [{ type: 'string' }]
        }),
        defineField({
          name: 'ctaText',
          title: 'CTA Button Text',
          type: 'string',
          initialValue: 'Learn More About Kids Ministry'
        }),
        defineField({
          name: 'ctaLink',
          title: 'CTA Link',
          type: 'string',
          initialValue: '/kids-ministry'
        }),
        defineField({
          name: 'image',
          title: 'Kids Ministry Image',
          type: 'image',
          options: { hotspot: true }
        })
      ]
    }),
    defineField({
      name: 'location',
      title: 'Location Section',
      type: 'object',
      fields: [
        defineField({
          name: 'sectionLabel',
          title: 'Section Label',
          type: 'string',
          initialValue: 'Find Us'
        }),
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Getting Here'
        }),
        defineField({
          name: 'description',
          title: 'Section Description',
          type: 'text',
          initialValue: "We're located in Taifa Burkina, Accra. Here's how to find us."
        }),
        defineField({
          name: 'churchName',
          title: 'Church Name',
          type: 'string',
          initialValue: 'ThaGospel Church'
        }),
        defineField({
          name: 'address',
          title: 'Address',
          type: 'text',
          initialValue: 'Taifa Burkina, Accra, Ghana'
        }),
        defineField({
          name: 'addressLine2',
          title: 'Address Line 2',
          type: 'string',
          initialValue: '6262 Accra North'
        }),
        defineField({
          name: 'directions',
          title: 'Directions Options',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              defineField({ name: 'icon', title: 'Icon Name', type: 'string' }),
              defineField({ name: 'title', title: 'Title', type: 'string' }),
              defineField({ name: 'description', title: 'Description', type: 'text' })
            ]
          }]
        }),
        defineField({
          name: 'mapEmbedUrl',
          title: 'Google Maps Embed URL',
          type: 'url',
          initialValue: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15881.015259873973!2d-0.2740101898063303!3d5.676401860513975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9f4df7adcb59%3A0xb277288105e12c4b!2sTHAGOSPEL%20CHURCH!5e0!3m2!1sen!2sus!4v1774712828320!5m2!1sen!2sus'
        })
      ]
    }),
    defineField({
      name: 'faq',
      title: 'FAQ Section',
      type: 'object',
      fields: [
        defineField({
          name: 'sectionLabel',
          title: 'Section Label',
          type: 'string',
          initialValue: 'Common Questions'
        }),
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'FAQ for First Timers'
        }),
        defineField({
          name: 'description',
          title: 'Section Description',
          type: 'text',
          initialValue: 'Still have questions? Here are the ones we hear most.'
        })
      ]
    }),
    defineField({
      name: 'visitorForm',
      title: 'Visitor Form Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Form Title',
          type: 'string',
          initialValue: "Let us know you're coming"
        }),
        defineField({
          name: 'description',
          title: 'Form Description',
          type: 'text',
          initialValue: 'Save your spot and our welcome team will be expecting you. No pressure — walk-ins are always welcome!'
        }),
        defineField({
          name: 'submitButtonText',
          title: 'Submit Button Text',
          type: 'string',
          initialValue: 'Save My Spot'
        }),
        defineField({
          name: 'successMessage',
          title: 'Success Message',
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', initialValue: "You're all set!" }),
            defineField({ name: 'message', title: 'Message', type: 'text', initialValue: "We can't wait to meet you this Sunday." })
          ]
        })
      ]
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo'
    })
  ],
  preview: {
    select: {
      title: 'title'
    }
  }
})
