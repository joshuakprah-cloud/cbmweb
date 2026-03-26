export { client } from '../sanity/lib/client'
export * from '../sanity/lib/client'

// Sermons queries
export const sermonsQuery = `*[_type == "sermon"] | order(date desc) {
  _id,
  title,
  slug,
  speaker,
  date,
  videoUrl,
  audioUrl,
  series,
  scripture
}`

// Events queries
export const featuredEventQuery = `*[_type == "event" && isFeatured == true && isActive == true && date > now()] | order(date asc) [0] {
  _id,
  title,
  slug,
  date,
  endDate,
  location,
  address,
  excerpt,
  category,
  isFree,
  ticketPrice,
  ticketLink,
  registrationRequired,
  capacity,
  registeredCount,
  organizer,
  contactEmail,
  contactPhone,
  coverImage {
    asset-> {
      _id,
      url,
      altText
    }
  },
  isFeatured,
  isActive
}`

export const upcomingEventsQuery = `*[_type == "event" && isActive == true && date > now()] | order(date asc) [0...12] {
  _id,
  title,
  slug,
  date,
  endDate,
  location,
  excerpt,
  category,
  isFree,
  ticketPrice,
  registrationRequired,
  coverImage {
    asset-> {
      _id,
      url,
      altText
    }
  },
  isActive
}`

export const pastEventsQuery = `*[_type == "event" && isActive == true && date < now()] | order(date desc) [0...6] {
  _id,
  title,
  slug,
  date,
  location,
  excerpt,
  category,
  coverImage {
    asset-> {
      _id,
      url,
      altText
    }
  },
  isActive
}`

export const eventsByCategoryQuery = `*[_type == "event" && isActive == true && category == $category && date > now()] | order(date asc) {
  _id,
  title,
  slug,
  date,
  endDate,
  location,
  excerpt,
  category,
  isFree,
  ticketPrice,
  registrationRequired,
  coverImage {
    asset-> {
      _id,
      url,
      altText
    }
  },
  isActive
}`

export const singleEventQuery = `*[_type == "event" && slug.current == $slug && isActive == true][0] {
  _id,
  title,
  slug,
  date,
  endDate,
  location,
  address,
  excerpt,
  body,
  category,
  isFree,
  ticketPrice,
  ticketLink,
  registrationRequired,
  capacity,
  registeredCount,
  organizer,
  contactEmail,
  contactPhone,
  coverImage {
    asset-> {
      _id,
      url,
      altText
    }
  },
  gallery {
    asset-> {
      _id,
      url,
      altText
    }
  },
  speakers,
  schedule,
  isFeatured,
  isActive
}`

export const relatedEventsQuery = `*[_type == "event" && category == $category && slug.current != $currentSlug && date > now()] | order(date asc)[0...3]{
  title,
  slug,
  date,
  location,
  category,
  coverImage,
  excerpt
}`;

export const adjacentEventsQuery = `
  *[_type == "event" && date > now()] | order(date asc) {
    title,
    slug,
    date,
    category
  }
`;

export const allEventsQuery = `*[_type == "event" && isActive == true] | order(date asc) {
  _id,
  title,
  slug,
  date,
  endDate,
  location,
  excerpt,
  category,
  isFree,
  ticketPrice,
  registrationRequired,
  coverImage {
    asset-> {
      _id,
      url,
      altText
    }
  },
  isActive
}`
