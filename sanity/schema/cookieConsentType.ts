import { defineType, defineField } from 'sanity'

export const cookieConsentType = defineType({
  name: 'cookieConsent',
  title: 'Cookie Consent',
  type: 'document',
  fields: [
    defineField({
      name: 'enabled',
      title: 'Enable Cookie Consent',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'title',
      title: 'Consent Title',
      type: 'string',
      initialValue: 'Cookie Consent'
    }),
    defineField({
      name: 'message',
      title: 'Consent Message',
      type: 'text',
      initialValue: 'We use cookies to enhance your experience on our website. By continuing to browse, you agree to our use of cookies.'
    }),
    defineField({
      name: 'acceptButtonText',
      title: 'Accept Button Text',
      type: 'string',
      initialValue: 'Accept All'
    }),
    defineField({
      name: 'rejectButtonText',
      title: 'Reject Button Text',
      type: 'string',
      initialValue: 'Reject All'
    }),
    defineField({
      name: 'customizeButtonText',
      title: 'Customize Button Text',
      type: 'string',
      initialValue: 'Customize'
    }),
    defineField({
      name: 'privacyPolicyLink',
      title: 'Privacy Policy Link',
      type: 'object',
      fields: [
        defineField({ name: 'text', title: 'Link Text', type: 'string', initialValue: 'Privacy Policy' }),
        defineField({ name: 'url', title: 'Link URL', type: 'string' }),
      ],
    }),
    defineField({
      name: 'cookieCategories',
      title: 'Cookie Categories',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'category',
          title: 'Category',
          fields: [
            defineField({ name: 'name', title: 'Category Name', type: 'string' }),
            defineField({ name: 'description', title: 'Category Description', type: 'text' }),
            defineField({ name: 'isRequired', title: 'Required', type: 'boolean', initialValue: false }),
            defineField({ name: 'isEnabled', title: 'Enabled by Default', type: 'boolean', initialValue: true }),
          ],
        },
      ],
    }),
    defineField({
      name: 'expirationDays',
      title: 'Consent Expiration (Days)',
      type: 'number',
      initialValue: 365
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Cookie Consent',
      }
    }
  }
})
