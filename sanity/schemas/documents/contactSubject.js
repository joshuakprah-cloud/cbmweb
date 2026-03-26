export default {
  name: "contactSubject",
  title: "Contact Subject",
  type: "document",
  fields: [
    {
      name: "label",
      title: "Subject Label",
      type: "string",
      validation: Rule => Rule.required(),
      description: "e.g. General Inquiry, Prayer Request, Volunteering"
    },
    {
      name: "value",
      title: "Subject Value",
      type: "string",
      validation: Rule => Rule.required(),
      description: "Lowercase slug version e.g. general-inquiry. Used internally."
    }
  ]
}
