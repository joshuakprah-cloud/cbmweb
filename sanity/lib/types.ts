export interface Hero {
  _type: 'hero'
  heading: string
  subheading: string
  backgroundImage: any
}

export interface Pastor {
  _type: 'pastor'
  name: string
  bio: string
  photo: any
}

export interface Service {
  _type: 'service'
  title: string
  description: string
  day: string
  time: string
  image: any
}

export interface Event {
  _type: 'event'
  title: string
  date: string
  description: string
  image: any
}

export interface Post {
  _type: 'post'
  title: string
  slug: { current: string }
  content: any
  publishedAt: string
  image: any
}
