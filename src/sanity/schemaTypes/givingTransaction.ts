import { defineType, defineField } from 'sanity'

export const givingTransaction = defineType({
  name: 'givingTransaction',
  title: 'Giving Transaction',
  type: 'document',
  fields: [
    defineField({
      name: 'donorName',
      title: 'Donor Name',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'amount',
      title: 'Amount',
      type: 'number',
    }),
    defineField({
      name: 'givingType',
      title: 'Giving Type',
      type: 'reference',
      to: [{ type: 'givingType' }],
    }),
    defineField({
      name: 'paymentGateway',
      title: 'Payment Gateway',
      type: 'string',
      options: {
        list: ['Paystack', 'Stripe'],
      },
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: ['Pending', 'Successful', 'Failed'],
      },
      initialValue: 'Pending',
    }),
    defineField({
      name: 'transactionRef',
      title: 'Transaction Reference',
      type: 'string',
    }),
    defineField({
      name: 'branch',
      title: 'Branch',
      type: 'string',
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: new Date().toISOString(),
    }),
  ],
})
