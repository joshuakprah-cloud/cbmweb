export default {
  name: "serviceTimes",
  title: "Service Times",
  type: "document",
  __experimental_actions: ["update", "publish"],
  fields: [
    {
      name: "services",
      title: "Service Schedule",
      type: "array",
      of: [
        {
          type: "serviceTimeEntry"
        }
      ],
      description: "This schedule is used on the homepage, navbar, and connect page. Update here to sync all locations at once."
    }
  ]
}
