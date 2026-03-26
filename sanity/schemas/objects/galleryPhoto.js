export default {
  name: "galleryPhoto",
  title: "Gallery Photo",
  type: "object",
  fields: [
    {
      name: "image",
      title: "Photo",
      type: "image",
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    },
    {
      name: "alt",
      title: "Alt Text",
      type: "string",
      description: "Describe the photo for accessibility and SEO. e.g. Church members worshipping during Sunday service."
    },
    {
      name: "caption",
      title: "Caption (optional)",
      type: "string"
    },
    {
      name: "credit",
      title: "Photo Credit (optional)",
      type: "string"
    }
  ]
}
