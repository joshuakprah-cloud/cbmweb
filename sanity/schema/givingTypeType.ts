import { defineType, defineField } from 'sanity'

export const givingTypeType = defineType({
  name: 'givingType',
  title: 'Giving Type',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Giving Type Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'suggestedAmounts',
      title: 'Suggested Amounts',
      type: 'array',
      of: [{ type: 'number' }],
      description: 'Pre-defined donation amounts for quick selection'
    }),
    defineField({
      name: 'defaultAmount',
      title: 'Default Amount',
      type: 'number',
      description: 'Default amount when this giving type is selected'
    }),
    defineField({
      name: 'minimumAmount',
      title: 'Minimum Amount',
      type: 'number',
      description: 'Minimum donation amount for this type'
    }),
    defineField({
      name: 'icon',
      title: 'Icon (Emoji)',
      type: 'string',
      description: 'Emoji or icon to represent this giving type'
    }),
    defineField({
      name: 'image',
      title: 'Giving Type Image',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'color',
      title: 'Theme Color',
      type: 'string',
      description: 'Hex color code for theming'
    }),
    defineField({
      name: 'paymentMethods',
      title: 'Accepted Payment Methods',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'paymentMethod',
          title: 'Payment Method',
          fields: [
            defineField({ 
              name: 'provider', 
              title: 'Provider', 
              type: 'string',
              options: {
                list: [
                  { title: 'Paystack', value: 'paystack' },
                  { title: 'Stripe', value: 'stripe' },
                  { title: 'Bank Transfer', value: 'bank' },
                  { title: 'Mobile Money', value: 'mobile' }
                ]
              }
            }),
            defineField({ name: 'isEnabled', title: 'Enabled', type: 'boolean', initialValue: true }),
            defineField({ name: 'config', title: 'Configuration', type: 'text' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'recurringOptions',
      title: 'Recurring Giving Options',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'recurringOption',
          title: 'Recurring Option',
          fields: [
            defineField({ 
              name: 'frequency', 
              title: 'Frequency', 
              type: 'string',
              options: {
                list: [
                  { title: 'Weekly', value: 'weekly' },
                  { title: 'Monthly', value: 'monthly' },
                  { title: 'Quarterly', value: 'quarterly' },
                  { title: 'Yearly', value: 'yearly' }
                ]
              }
            }),
            defineField({ name: 'isEnabled', title: 'Enabled', type: 'boolean', initialValue: true }),
            defineField({ name: 'description', title: 'Description', type: 'text' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'taxDeductible',
      title: 'Tax Deductible',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'receiptTemplate',
      title: 'Receipt Template',
      type: 'text',
      description: 'Template for donation receipt emails'
    }),
    defineField({
      name: 'goal',
      title: 'Giving Goal (Optional)',
      type: 'object',
      fields: [
        defineField({ name: 'targetAmount', title: 'Target Amount', type: 'number' }),
        defineField({ name: 'currentAmount', title: 'Current Amount', type: 'number', initialValue: 0 }),
        defineField({ name: 'deadline', title: 'Goal Deadline', type: 'date' }),
        defineField({ name: 'showProgress', title: 'Show Progress Bar', type: 'boolean', initialValue: false }),
      ],
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number'
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'image'
    }
  }
})
