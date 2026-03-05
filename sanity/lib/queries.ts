export const heroQuery = groq`
  *[_type == "hero"][0]
`
  *[_type == "homepage"][0] {
    heroHeadline,
    heroSubtext,
    backgroundImage,
    heroPrimaryButton,
    heroSecondaryButton,
    heroSmallLine,
    heroBackgroundImage,
    heroBackgroundImageAlt,
    quickActions,
    aboutHeadline,
    aboutContent,
    pastorMessage,
    aboutButton,
    servicesHeadline,
    location,
    locationLat,
    locationLng,
    serviceTimes,
    midweekService,
    servicesButton,
    servicesSmallLine,
    sermonHeadline,
    sermonIntro,
    sermonButton,
    sermonSecondaryButton,
    ministriesHeadline,
    ministriesIntro,
    ministries,
    ministriesButton,
    testimonialsHeadline,
    testimonials,
    testimonialsButton,
    globalHeadline,
    globalContent,
    globalButton,
    socialMedia,
    ctaHeadline,
    ctaText,
    ctaPrimaryButton,
    ctaSecondaryButton,
    footerColumns,
    footerContact,
    footerBottomText
  }
`

export const pastorQuery = groq`
  *[_type == "pastor"][0] {
    name,
    bio,
    photo,
    branch
  }
`

export const preacherQuery = groq`
  *[_type == "pastor" && slug.current == $slug][0] {
    _id,
    name,
    bio,
    photo,
    slug,
    branch
  }
`

export const servicesQuery = groq`
  *[_type == "service" && branch == "ghana"] {
    title,
    description,
    day,
    time,
    image,
    branch
  }
`

export const eventsQuery = groq`
  *[_type == "event" && branch == "ghana"] | order(date desc) {
    title,
    date,
    description,
    image,
    branch
  }
`

export const testimoniesQuery = groq`
  *[_type == "testimony" && branch == "ghana"] {
    name,
    message,
    branch
  }
`

export const postsQuery = groq`
  *[_type == "post" && branch == "ghana"] | order(publishedAt desc) {
    title,
    slug,
    content,
    publishedAt,
    image,
    branch
  }
`

export const sermonsQuery = groq`
  *[_type == "sermon" && branch == "ghana"] | order(date desc) {
    title,
    slug,
    preacher->{
      name
    },
    date,
    videoUrl,
    audioUrl,
    series,
    scriptureReferences,
    keyPoints,
    notesUrl,
    branch
  }
`
