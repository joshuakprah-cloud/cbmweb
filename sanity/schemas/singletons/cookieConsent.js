export default {
  name: "cookieConsent",
  title: "Cookie Consent",
  type: "document",
  __experimental_actions: ["update", "publish"],
  fields: [
    {
      name: "isActive",
      title: "Show Cookie Banner",
      type: "boolean",
      defaultValue: false
    },
    {
      name: "bannerText",
      title: "Cookie Banner Message",
      type: "text"
    },
    {
      name: "acceptLabel",
      title: "Accept Button",
      type: "string",
      defaultValue: "Accept"
    },
    {
      name: "declineLabel",
      title: "Decline Button",
      type: "string",
      defaultValue: "Decline"
    },
    {
      name: "privacyPolicyUrl",
      title: "Privacy Policy URL",
      type: "string"
    }
  ]
}
