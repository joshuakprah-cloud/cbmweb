import { groq } from 'next-sanity'

export const homepageQuery = groq`
  *[_type == "homepage"][0] {
    heroSlides[] {
      title,
      subtitle,
      cta,
      ctaLink,
      image,
      order
    },
    whatToExpectSection {
      title,
      headline,
      description,
      expectations[] {
        title,
        description,
        icon,
        number,
        image,
        order
      }
    },
    welcomeSection {
      sectionLabel,
      title,
      message,
      image,
      ctaText,
      ctaLink,
      prophetImage,
      firstLadyImage,
      prophetName,
      prophetTitle,
      firstLadyName,
      firstLadyTitle,
      introText,
      prophetBio,
      firstLadyBio
    },
    serviceTimesOverride {
      enabled,
      title,
      message
    },
    ministriesSection {
      sectionLabel,
      title,
      description,
      featuredMinistries[]-> {
        name,
        slug,
        heroImage,
        tagline
      },
      ctaText,
      ctaLink
    },
    pastorSection {
      sectionLabel,
      pastorName,
      pastorBio,
      pastorImage,
      primaryCtaText,
      primaryCtaLink,
      secondaryCtaText,
      secondaryCtaLink
    },
    latestSermonSection {
      enabled,
      title,
      description,
      featuredSermon-> {
        title,
        speaker,
        coverImage,
        publishedAt
      },
      ctaText,
      ctaLink
    },
    upcomingEventsSection {
      enabled,
      title,
      description,
      featuredEvents[]-> {
        title,
        date,
        location,
        coverImage
      },
      ctaText,
      ctaLink
    },
    testimonySection {
      enabled,
      title,
      description,
      featuredTestimonies[]-> {
        memberName,
        role,
        quote,
        photo
      },
      ctaText,
      ctaLink
    },
    closingCTASection {
      title,
      description,
      primaryCtaText,
      primaryCtaLink,
      secondaryCtaText,
      secondaryCtaLink,
      backgroundImage
    },
    seo {
      metaTitle,
      metaDescription,
      ogImage,
      noIndex
    }
  }
`;

export const connectPageQuery = groq`
  *[_type == "connectPage"][0] {
    heroTitle,
    heroSubtitle,
    heroImage,
    seo {
      metaTitle,
      metaDescription,
      ogImage
    }
  }
`;

export const smallGroupsQuery = groq`
  *[_type == "smallGroup"] | order(order asc) {
    name,
    day,
    time,
    location,
    demographic,
    leader,
    description
  }
`;

export const nextStepsQuery = groq`
  *[_type == "nextStep"] | order(order asc) {
    number,
    title,
    description,
    ctaText,
    ctaLink
  }
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    logo { asset->{ url } },
    serviceTimes[] {
      name,
      day,
      time,
      timeRange,
      serviceType,
      showOnHomepage,
      location
    },
    address {
      street,
      city,
      state,
      zipCode,
      country
    },
    location,
    contactInfo {
      phone,
      email,
      address
    },
    socialMedia {
      facebook,
      twitter,
      instagram,
      youtube
    }
  }
`;

// Additional queries needed by existing code
export const homepageUpcomingEventsQuery = groq`
  *[_type == "event" && endDate > now()] | order(startDate asc) [0...3] {
    title,
    slug,
    startDate,
    endDate,
    location,
    image,
    registrationRequired,
    maxAttendees,
    currentAttendees
  }
`;

export const recentSermonsQuery = groq`
  *[_type == "sermon" && isPublished == true] | order(publishedAt desc) [0...3] {
    title,
    slug,
    publishedAt,
    seriesTitle,
    thumbnail,
    videoSource,
    youtubeUrl,
    externalVideoUrl,
    videoFile {
      asset-> {
        url,
        _id
      }
    },
    "speaker": preacher->{
      name,
      photo
    }
  }
`;

export const activeTestimoniesQuery = groq`
  *[_type == "testimony" && isActive == true] | order(order asc) {
    memberName,
    role,
    quote,
    photo
  }
`;

export const testimoniesQuery = groq`
  *[_type == "testimony" && isActive == true] | order(order asc) {
    _id,
    name,
    memberName,
    role,
    quote,
    content,
    location,
    image,
    photo
  }
`;

// About page queries
export const aboutPageQuery = groq`
  *[_type == "aboutPage"][0] {
    heroTitle,
    heroSubtitle,
    heroBackgroundImage,
    aboutContent,
    aboutImage,
    historyTitle,
    historyBody,
    missionStatement,
    visionStatement,
    founderImage,
    coFounderImage,
    founderName,
    coFounderName,
    missionVisionSection {
      eyebrow,
      headline,
      beliefsCard {
        title,
        description,
        ctaText,
        ctaLink
      },
      valuesCard {
        title,
        description,
        ctaText,
        ctaLink
      }
    },
    whatToExpectSection {
      eyebrow,
      headline,
      description,
      sermonImage,
      latestSermonImage,
      worshipImage,
      communityImage,
      sermonTitle,
      sermonLeftText,
      sermonRightText,
      worshipTitle,
      worshipLeftText,
      worshipRightText,
      communityTitle,
      communityLeftText,
      communityRightText
    },
    founderSection {
      eyebrow,
      bioParagraph1,
      bioParagraph2,
      bioParagraph3,
      ctaPrimaryText,
      ctaSecondaryText
    },
    ctaSection {
      headline,
      subtext,
      primaryText,
      primaryLink
    },
    seo {
      metaTitle,
      metaDescription,
      ogImage
    }
  }
`;

export const storyPageQuery = groq`
  *[_type == "aboutPage"][0] {
    heroTitle,
    heroSubtitle,
    heroBackgroundImage,
    aboutContent,
    aboutImage,
    storyContent,
    foundingYear,
    founderName,
    missionStatement,
    visionStatement,
    historyMilestones[] {
      year,
      title,
      description
    },
    seo {
      metaTitle,
      metaDescription,
      ogImage
    }
  }
`;

export const themePageQuery = groq`
  *[_type == "themePage"][0] {
    heroTitle,
    heroSubtitle,
    heroBackgroundImage,
    themeData {
      year,
      themeTitle,
      themeSubtitle,
      scripture,
      pillars
    },
    seo {
      metaTitle,
      metaDescription,
      ogImage
    }
  }
`;

export const leadershipPageQuery = groq`
  *[_type == "leadershipPage"][0] {
    heroTitle,
    heroSubtitle,
    heroBackgroundImage,
    seo {
      metaTitle,
      metaDescription,
      ogImage
    }
  }
`;

export const staffMembersQuery = groq`
  *[_type == "staffMember" && isActive == true] | order(order asc) {
    _id,
    name,
    role,
    bio,
    photo,
    email,
    phone,
    order,
    leadershipCategory,
    twitter,
    instagram,
    isFeaturedPastor
  }
`;

export const beliefsPageQuery = groq`
  *[_type == "beliefsPage"][0] {
    heroTitle,
    heroSubtitle,
    heroBackgroundImage,
    introText,
    content,
    beliefs[] {
      title,
      scriptureReference,
      description
    },
    beliefsPdf {
      asset->{ url }
    },
    seo {
      metaTitle,
      metaDescription,
      ogImage
    }
  }
`;

export const connectedPageQuery = groq`
  *[_type == "connectedPage"][0] {
    heroTitle,
    heroSubtitle,
    heroBackgroundImage,
    pathways,
    seo {
      metaTitle,
      metaDescription,
      ogImage
    }
  }
`;

// Sermons queries
export const sermonsPageQuery = groq`
  *[_type == "sermonsPage"][0] {
    heroTitle,
    heroSubtitle,
    heroBackgroundImage,
    seo {
      metaTitle,
      metaDescription,
      ogImage
    }
  }
`;

export const featuredSermonQuery = groq`
  *[_type == "sermon" && isFeatured == true && isPublished == true] | order(publishedAt desc) [0] {
    title,
    slug,
    description,
    scriptureReference,
    duration,
    publishedAt,
    videoSource,
    videoUrl,
    videoFile,
    externalVideoUrl,
    audioUrl,
    thumbnail {
      asset-> {
        url,
        _id
      }
    },
    seriesTitle,
    seriesSlug,
    seriesCoverImage,
    relatedScriptures,
    "speaker": preacher->{
      _id,
      name,
      photo,
      bio,
      slug
    audioUrl,
    thumbnail {
      asset-> {
        url,
        _id
      }
    },
    seriesTitle,
    seriesSlug,
    seriesCoverImage,
    "speaker": preacher->{
      name,
      photo,
      bio,
      slug
    }
  }
`;

export const latestSermonQuery = groq`
  *[_type == "sermon" && isPublished == true] | order(publishedAt desc) [0] {
    title,
    "slug": slug.current
  }
`;

export const allSermonsQuery = groq`
  *[_type == "sermon" && isPublished == true] | order(publishedAt desc) {
    title,
    slug,
    description,
    scriptureReference,
    duration,
    publishedAt,
    videoSource,
    videoUrl,
    videoFile,
    externalVideoUrl,
    audioUrl,
    thumbnail {
      asset-> {
        url,
        _id
      }
    },
    seriesTitle,
    seriesSlug,
    seriesCoverImage,
    "speaker": preacher->{
      name,
      photo,
      bio,
      slug
    }
  }
`;

export const sermonsByPreacherQuery = groq`
  *[_type == "sermon" && isPublished == true && preacher._ref == $preacherId] | order(publishedAt desc) {
    title,
    slug,
    description,
    scriptureReference,
    duration,
    publishedAt,
    videoSource,
    videoUrl,
    videoFile,
    externalVideoUrl,
    audioUrl,
    thumbnail {
      asset-> {
        url,
        _id
      }
    },
    seriesTitle,
    seriesSlug,
    seriesCoverImage,
    "speaker": preacher->{
      name,
      photo,
      bio,
      slug
    }
  }
`;

export const preacherBySlugQuery = groq`
  *[_type == "preacher" && slug.current == $slug && isActive == true][0] {
    name,
    slug,
    role,
    bio,
    photo,
    isActive
  }
`;

export const allPreachersQuery = groq`
  *[_type == "preacher" && isActive == true] | order(name asc) {
    name,
    slug,
    role,
    photo,
    bio,
    isActive,
    "sermonCount": count(*[_type == "sermon" && preacher._ref == ^._id && isPublished == true])
  }
`;

export const sermonsBySeriesQuery = groq`
  *[_type == "sermon" && isPublished == true && seriesSlug == $seriesSlug] | order(publishedAt desc) {
    title,
    slug,
    description,
    scriptureReference,
    duration,
    publishedAt,
    videoUrl,
    audioUrl,
    thumbnail {
      asset-> {
        url,
        _id
      }
    },
    seriesTitle,
    seriesSlug,
    seriesCoverImage,
    "speaker": preacher->{
      name,
      photo,
      bio,
      slug
    }
  }
`;

export const allSeriesQuery = groq`
  *[_type == "sermon" && isPublished == true] | order(seriesTitle asc) {
    seriesTitle,
    seriesSlug,
    seriesCoverImage,
    "sermonCount": count(*[_type == "sermon" && seriesSlug == ^.seriesSlug && isPublished == true])
  }
`;

export const seriesListQuery = groq`
  *[_type == "sermon" && isPublished == true] | order(seriesTitle asc) {
    seriesTitle,
    seriesSlug,
    seriesCoverImage,
    publishedAt
  }
`;

export const uniqueSeriesQuery = groq`
  *[_type == "sermon" && isPublished == true] {
    seriesTitle,
    seriesSlug,
    seriesCoverImage,
    publishedAt
  } | order(seriesTitle asc)
`;

// Media Page Queries
export const mediaPageQuery = groq`
  *[_type == "mediaPage"][0] {
    heroTitle,
    heroSubtitle,
    seo {
      metaTitle,
      metaDescription,
      ogImage
    }
  }
`;

export const archivePageQuery = groq`
  *[_type == "sermon" && isPublished == true] | order(publishedAt desc) {
    title,
    slug,
    excerpt,
    "speaker": preacher->{ name, photo, slug },
    seriesTitle,
    seriesSlug,
    publishedAt,
    audioUrl,
    videoUrl,
    videoSource,
    youtubeUrl,
    externalVideoUrl,
    videoFile {
      asset-> {
        url,
        _id
      }
    },
    thumbnail {
      asset-> {
        url,
        _id
      }
    },
    duration
  }
`;

export const featuredPostQuery = groq`
  *[_type == "post" && isFeatured == true && isPublished == true] | order(publishedAt desc) [0] {
    title,
    slug,
    excerpt,
    coverImage { asset->{ url, metadata { dimensions } } },
    publishedAt,
    readTime,
    tags,
    "authorName": author->name,
    "authorPhoto": author->photo,
    "authorRole": author->role,
    "categoryTitles": categories[]->title
  }
`;

export const allPostsQuery = groq`
  *[_type == "post" && isPublished == true] | order(publishedAt desc) {
    title,
    slug,
    excerpt,
    coverImage { asset->{ url, metadata { dimensions } } },
    publishedAt,
    readTime,
    tags,
    "authorName": author->name,
    "authorPhoto": author->photo,
    "authorRole": author->role,
    "categoryTitles": categories[]->title
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug && isPublished == true][0] {
    title,
    slug,
    excerpt,
    coverImage { asset->{ url, metadata { dimensions } } },
    publishedAt,
    readTime,
    tags,
    body,
    "author": author->{
      name,
      photo,
      role,
      bio
    },
    "categories": categories[]->{
      title
    }
  }
`;

// Gallery Page Queries
export const galleryPageQuery = groq`
  *[_type == "galleryPage"][0] {
    heroTitle,
    heroSubtitle,
    heroImage,
    seo {
      metaTitle,
      metaDescription,
      ogImage
    }
  }
`;

export const albumBySlugQuery = groq`
  *[_type == "album" && slug.current == $slug][0] {
    title,
    slug,
    description,
    coverImage { asset->{ url, metadata { dimensions } } },
    eventDate,
    photos[] {
      _id,
      title,
      image { asset->{ url, metadata { dimensions } } },
      caption
    }
  }
`;

export const relatedPostsQuery = groq`
  *[_type == "post" && isPublished == true && _id != $currentPostId] | order(publishedAt desc) [0...3] {
    title,
    slug,
    excerpt,
    coverImage { asset->{ url, metadata { dimensions } } },
    publishedAt,
    "authorName": author->name,
    "authorRole": author->role,
    "categoryTitles": categories[]->title
  }
`;

// Gallery Queries
export const allAlbumsQuery = groq`
  *[_type == "album" && isPublished == true] | order(eventDate desc) {
    title,
    slug,
    description,
    coverImage { asset->{ url, metadata { dimensions } } },
    eventDate,
    "photoCount": count(*[_type == "photo" && references(^._id)])
  }
`;

export const photosByAlbumQuery = groq`
  *[_type == "photo" && album._ref == $albumId && isPublished == true] | order(dateTaken asc) {
    title,
    image { asset->{ url, metadata { dimensions } } },
    caption,
    event,
    dateTaken,
    "albumTitle": album->title,
    "albumSlug": album->slug
  }
`;

export const allPhotosQuery = groq`
  *[_type == "photo" && isPublished == true] | order(dateTaken desc) {
    title,
    image { asset->{ url, metadata { dimensions } } },
    caption,
    event,
    dateTaken,
    "albumTitle": album->title,
    "albumSlug": album->slug
  }
`;

// Ministries Queries
export const ministriesPageQuery = groq`
  *[_type == "ministriesPage"][0] {
    heroTitle,
    heroTagline,
    heroImage { asset->{ url } },
    stats,
    closingCtaTitle,
    closingCtaSubtitle,
    seo {
      metaTitle,
      metaDescription,
      ogImage { asset->{ url } }
    }
  }
`;

export const allMinistriesQuery = groq`
  *[_type == "ministry" && isPublished == true] | order(order asc) {
    name,
    slug,
    label,
    tagline,
    heroImage { asset->{ url } },
    color,
    meetingDay,
    meetingTime,
    ageRange,
    stats
  }
`;

export const ministryBySlugQuery = groq`
  *[_type == "ministry" && slug.current == $slug && isPublished == true][0] {
    name,
    slug,
    label,
    tagline,
    description,
    body,
    heroImage { asset->{ url } },
    color,
    meetingDay,
    meetingTime,
    ageRange,
    stats,
    expectations,
    "leaders": leaders[]->{
      name,
      role,
      photo { asset->{ url } },
      bio
    },
    "gallery": gallery[].{
      "image": image.asset->{ url },
      caption
    },
    "events": events[]->{
      title,
      slug,
      date,
      time,
      location,
      image { asset->{ url } }
    },
    "relatedMinistries": relatedMinistries[]->{
      name,
      slug,
      tagline,
      heroImage { asset->{ url } }
    }
  }
`;

// Events Queries
export const eventsQuery = groq`
  *[_type == "event" && isPublished == true] | order(date asc) {
    title,
    slug,
    date,
    endDate,
    location,
    excerpt,
    coverImage { asset->{ url } },
    category,
    isFree,
    ticketPrice,
    requiresRegistration,
    registrationStatus,
    tags
  }
`;

export const eventsPageQuery = groq`
  *[_type == "eventsPage"][0] {
    heroTitle,
    heroTagline,
    heroImage { asset->{ url } },
    seo {
      metaTitle,
      metaDescription,
      ogImage { asset->{ url } }
    }
  }
`;

export const featuredEventQuery = groq`
  *[_type == "event" && isFeatured == true && isPublished == true && isPast == false] | order(date asc) [0] {
    title,
    slug,
    date,
    endDate,
    location,
    excerpt,
    coverImage { asset->{ url } },
    category,
    isFree,
    ticketPrice,
    requiresRegistration,
    tags
  }
`;

export const upcomingEventsQuery = groq`
  *[_type == "event" && isPublished == true && isPast == false] | order(date asc) {
    title,
    slug,
    date,
    endDate,
    location,
    excerpt,
    coverImage { asset->{ url } },
    category,
    isFree,
    ticketPrice,
    requiresRegistration,
    tags
  }
`;

export const pastEventsQuery = groq`
  *[_type == "event" && isPublished == true && isPast == true] | order(date desc) [0...6] {
    title,
    slug,
    date,
    location,
    excerpt,
    coverImage { asset->{ url } },
    category,
    recapUrl
  }
`;

export const eventBySlugQuery = groq`
  *[_type == "event" && slug.current == $slug && isPublished == true][0] {
    title,
    slug,
    date,
    endDate,
    location,
    excerpt,
    body,
    coverImage { asset->{ url } },
    category,
    isFeatured,
    isFree,
    ticketPrice,
    ticketLink,
    requiresRegistration,
    capacity,
    registrationDeadline,
    speakers,
    schedule,
    "gallery": gallery[].{
      "image": image.asset->{ url },
      caption
    },
    "relatedEvents": relatedEvents[]->{
      title,
      slug,
      date,
      location,
      coverImage { asset->{ url } },
      category
    },
    recapUrl,
    tags,
    seo {
      metaTitle,
      metaDescription,
      ogImage { asset->{ url } }
    }
  }
`;

export const adjacentEventsQuery = groq`
  {
    "previous": *[_type == "event" && isPublished == true && date < $currentDate && isPast == false] | order(date desc) [0] {
      title,
      slug
    },
    "next": *[_type == "event" && isPublished == true && date > $currentDate && isPast == false] | order(date asc) [0] {
      title,
      slug
    }
  }
`;

// Contact Queries
export const contactPageQuery = groq`
  *[_type == "contactPage"][0] {
    heroTitle,
    heroTagline,
    heroImage { asset->{ url } },
    address,
    phone,
    email,
    officeHours,
    socialLinks,
    scriptureReference,
    scriptureText,
    closingCtaTitle,
    closingCtaSubtitle,
    seo {
      metaTitle,
      metaDescription,
      ogImage { asset->{ url } }
    }
  }
`;

export const serviceTimesQuery = groq`
  *[_type == "siteSettings"][0] {
    serviceTimes[] {
      name,
      day,
      time,
      timeRange,
      serviceType,
      showOnHomepage,
      location
    }
  }
`;

// Livestream Query
export const livestreamQuery = groq`
  {
    "livestreamSettings": *[_type == "siteSettings"][0] {
      livestream {
        pageTitle,
        pageDescription,
        liveVideoId,
        isLive,
        nextServiceTime,
        serviceDays,
        youtubeChannelId
      }
    },
    "recentSermons": *[_type == "sermon" && isPublished == true] | order(publishedAt desc) [0..5] {
      title,
      slug,
      publishedAt,
      thumbnail {
        asset-> {
          url,
          _id
        }
      },
      duration,
      "speaker": preacher->{ name, photo }
    }
  }
`;

// Navbar Query
export const navbarQuery = groq`
  *[_type == "siteSettings"][0] {
    navbar {
      watchLiveUrl,
      watchLiveLabel,
      giveUrl,
      giveLabel,
      planYourVisitLabel,
      announcementBar {
        isActive,
        message,
        linkLabel,
        linkUrl
      }
    }
  }
`;

// Locations Query
export const locationsQuery = groq`
  *[_type == "location"] | order(name asc) {
    _id,
    name,
    address,
    city,
    state,
    zipCode,
    phone,
    email,
    serviceTimes,
    photo { asset->{ url } },
    mapUrl,
    mapEmbedUrl,
    description,
    isMainCampus
  }
`;

// Overview Page Query
export const overviewPageQuery = groq`
  *[_type == "overviewPage"][0] {
    title,
    subtitle,
    featuredImage,
    missionStatement,
    visionStatement,
    coreValues[] {
      label,
      icon,
      description
    },
    storyContent,
    seo {
      metaTitle,
      metaDescription,
      ogImage
    }
  }
`;

// Departments Page Query
export const departmentsPageQuery = groq`
  *[_type == "departmentsPage"][0] {
    heroTitle,
    heroSubtitle,
    heroImage { asset->{ url } },
    introText,
    departments[] {
      name,
      description,
      icon,
      leader-> {
        name,
        role,
        photo { asset->{ url } }
      },
      meetingTime,
      meetingDay,
      isActive
    },
    ctaText,
    ctaLink,
    seo {
      metaTitle,
      metaDescription,
      ogImage { asset->{ url } }
    }
  }
`;
