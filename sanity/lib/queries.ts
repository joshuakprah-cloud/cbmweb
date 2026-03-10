import { groq } from 'next-sanity'

export const homepageQuery = groq`
  *[_type == "homepage"][0] {
    // Hero Gallery Section
    heroSlides[]{
      title,
      subtitle,
      cta,
      image,
      order
    },
    
    // Welcome Section
    welcomeTitle,
    welcomeMessage,
    malePastorName,
    ladyPastorName,
    pastorImage1,
    pastorImage2,
    facebookUrl,
    twitterUrl,
    instagramUrl,
    
    // Spiritual Leaders
    prophetName,
    prophetTitle,
    prophetImage,
    firstLadyName,
    firstLadyTitle,
    firstLadyImage,
    
    // Quick Access Ministry Links
    ministryLinks[]{
      title,
      href,
      icon,
      image,
      order
    },
    
    // Latest Sermon
    latestSermon{
      title,
      speaker,
      date,
      duration,
      audioUrl,
      coverImage
    },
    
    // Upcoming Events
    upcomingEvents[]{
      title,
      date,
      time,
      venue,
      flyerImage,
      description
    },
    
    // Prayer Section
    prayerSection{
      backgroundImage,
      title,
      submitButtonText
    },
    
    // Footer Information
    footerColumns[]{
      title,
      links
    },
    footerContact{
      phone,
      email,
      address
    },
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

export const newHereQuery = groq`
  *[_type == "newHere"][0] {
    heroTitle,
    heroSubtitle,
    heroBackgroundImage,
    whatToExpectTitle,
    whatToExpect[] {
      title,
      description,
      icon
    },
    sundayExperienceTitle,
    sundayExperience[] {
      title,
      description
    },
    photoGalleryTitle,
    photoGallery[] {
      image,
      alt,
      caption
    },
    connectTitle,
    visitInfo,
    connectItems,
    leadersTitle,
    prophet,
    firstLady,
    leadersMessage,
    faqTitle,
    faq[] {
      question,
      answer
    },
    ctaTitle,
    ctaSubtitle,
    ctaButtons[] {
      text,
      url,
      color
    }
  }
`
