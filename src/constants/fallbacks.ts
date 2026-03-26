// Church information constants
export const CHURCH_NAME = 'ThaGospel Church';
export const DEFAULT_PASTOR_NAME = 'Prophet Powerman Bekoe';
export const DEFAULT_FIRST_LADY_NAME = 'First Lady';

// Hero section defaults
export const HERO_FALLBACKS = {
  title: 'WELCOME',
  subtitle: 'Raising Believers. Impacting Nations.',
  cta: 'PLAN YOUR VISIT',
};

// Welcome section defaults
export const WELCOME_FALLBACKS = {
  title: 'WELCOME TO THAGOSPEL CHURCH',
  message: 'We are delighted to welcome you to ThaGospel Church, where faith comes alive and lives are transformed through the power of God\'s word. Our church is a vibrant community of believers committed to spreading the gospel, nurturing spiritual growth, and making a positive impact in our community and beyond.',
};

// Service times defaults
export const SERVICE_TIMES_FALLBACK = [
  { label: 'FEAST OF MANNA', day: 'Sunday', timeRange: '9:00 AM - 12:00 PM', location: 'Main Campus' },
  { label: 'THE YOUTH CHURCH', day: 'Friday', timeRange: '6:00 PM - 8:00 PM', location: 'Main Campus' },
  { label: 'PROPHETIC ENCOUNTER SERVICE', day: 'Wednesday', timeRange: '6:00 PM - 8:30 PM', location: 'Main Campus' },
  { label: 'ALLNIGHT SERVICE', day: 'First Friday of the Month', timeRange: '10:00 PM - 4:00 AM', location: 'Main Campus' },
  { label: 'COUNSELING', day: 'Any Day', timeRange: 'After Every Service', location: 'Main Campus' }
];

// Testimonies defaults
export const TESTIMONIES_FALLBACK = [
  {
    memberName: "Sarah Johnson",
    role: "Main Campus",
    quote: "This church has been a life-changing experience for me and my family. The community is so welcoming, and the teaching has helped me grow in my faith like never before.",
  },
  {
    memberName: "Michael Chen",
    role: "Member since 2020",
    quote: "I came here broken and lost, but found hope and purpose. The love and support I received from this church family helped me rebuild my life and restore my relationship with God.",
  },
  {
    memberName: "Maria Rodriguez",
    role: "North Campus",
    quote: "The youth ministry here is incredible! My teenagers have found their identity in Christ and made lifelong friends. I'm so grateful for a place that invests in the next generation.",
  }
];

// Pastor bio defaults
export const PASTOR_BIO_FALLBACK = 'The church is not a building, it\'s the people. We\'re called to be a beacon of hope, love, and transformation in our community and beyond. Join us in this incredible journey of faith.';

// SEO defaults
export const SEO_FALLBACKS = {
  metaTitle: 'ThaGospel Church - Raising Believers, Impacting Nations',
  metaDescription: 'Welcome to ThaGospel Church, where faith comes alive and lives are transformed. Join us for powerful worship, biblical teaching, and a welcoming community.',
  ogImage: null,
  noIndex: false,
};

// Image alt text defaults
export const IMAGE_ALT_FALLBACKS = {
  hero: 'ThaGospel Church worship service',
  pastor: 'Pastor Powerman Bekoe',
  welcome: 'ThaGospel Church community and congregation',
  ministry: 'Ministry activities and programs',
  event: 'Church event and activities',
  testimony: 'Church member sharing their testimony',
};

// About section fallbacks
export const ABOUT_FALLBACKS = {
  heroTitle: 'About ThaGospel Church',
  heroSubtitle: 'Learn more about our mission, vision, and community',
  historyTitle: 'Our History',
  historyBody: 'We are a vibrant community of believers committed to spreading the gospel and serving our community.',
  missionStatement: 'To raise believers and impact nations through the power of the gospel.',
  visionStatement: 'To be a beacon of hope and transformation in our community and beyond.',
};

export const BELIEFS_FALLBACKS = {
  introText: 'We believe in the fundamental truths of Christianity as revealed in Scripture.',
  beliefs: [
    {
      title: 'The Bible',
      body: 'We believe the Bible is the inspired Word of God, authoritative and without error.'
    },
    {
      title: 'God',
      body: 'We believe in one God, eternally existing in three persons: Father, Son, and Holy Spirit.'
    },
    {
      title: 'Salvation',
      body: 'We believe salvation is by grace through faith in Jesus Christ alone.'
    }
  ]
};

export const CORE_VALUES_FALLBACKS = [
  {
    label: 'Scripture',
    description: 'We are grounded in the Word of God and committed to biblical teaching.',
    icon: '📖'
  },
  {
    label: 'Prayer',
    description: 'We believe in the power of prayer and seek God\'s guidance in all we do.',
    icon: '🙏'
  },
  {
    label: 'Community',
    description: 'We are a family that supports and cares for one another in love.',
    icon: '👥'
  }
];

export const THEME_FALLBACKS = {
  year: '2025',
  themeTitle: 'Year of Transformation',
  themeSubtitle: 'Growing deeper in faith and purpose',
  scriptureReference: 'Romans 12:2',
  scriptureText: 'Do not conform to the pattern of this world, but be transformed by the renewing of your mind.',
  pillars: [
    {
      number: '01',
      title: 'Spiritual Growth',
      description: 'Deepening our relationship with God through prayer and study'
    },
    {
      number: '02', 
      title: 'Community Impact',
      description: 'Serving our community with love and compassion'
    },
    {
      number: '03',
      title: 'Personal Transformation',
      description: 'Allowing God to transform us from the inside out'
    }
  ]
};

export const STORY_FALLBACKS = {
  title: 'Our Story',
  body: 'From humble beginnings to a thriving community of faith...',
  foundingYear: '2010',
  founderName: 'Prophet Powerman Bekoe',
};

export const CONNECTED_FALLBACKS = {
  heroTitle: 'Get Connected',
  heroSubtitle: 'Find your place in our community and grow in your faith journey',
  pathways: [
    {
      title: 'Small Groups',
      description: 'Join a small group to build meaningful relationships and grow together.',
      ctaLabel: 'Find a Group',
      ctaLink: '/small-groups'
    },
    {
      title: 'Volunteer',
      description: 'Use your gifts to serve others and make a difference in our community.',
      ctaLabel: 'Serve With Us',
      ctaLink: '/volunteer'
    },
    {
      title: 'Membership',
      description: 'Become an official member and commit to our church family.',
      ctaLabel: 'Join Our Family',
      ctaLink: '/membership'
    }
  ]
};

// Sermons section fallbacks
export const SERMONS_FALLBACKS = {
  heroTitle: 'Sermons',
  heroSubtitle: 'Listen to our latest messages and grow in your faith',
  featuredSermon: {
    title: 'No featured sermon available',
    description: 'Check back soon for our latest featured sermon.',
    scriptureReference: 'John 3:16',
    seriesTitle: 'Featured Series',
    videoUrl: null,
    audioUrl: null,
    speaker: {
      name: 'Guest Speaker',
      photo: null
    }
  },
  noResults: 'No sermons found matching your criteria.',
  clearFilters: 'Clear filters',
  searchPlaceholder: 'Search sermons...',
  viewGrid: 'Grid view',
  viewList: 'List view',
  watchSermon: 'Watch',
  listenSermon: 'Listen',
  duration: 'Duration',
  series: 'Series',
  scripture: 'Scripture',
  speaker: 'Speaker',
  allSeries: 'All Series',
  newestFirst: 'Newest First',
  oldestFirst: 'Oldest First',
  bySeries: 'By Series',
};

export const PREACHERS_FALLBACKS = {
  title: 'Our Preachers',
  subtitle: 'Meet the people who share God\'s word with us',
  viewSermons: 'View Sermons',
  noPreachers: 'No preachers available at this time.',
};

export const SERIES_FALLBACKS = {
  title: 'Sermon Series',
  subtitle: 'Explore our collection of sermon series',
  viewSeries: 'View Series',
  noSeries: 'No series available at this time.',
  sermonCount: 'sermon',
  sermonCountPlural: 'sermons',
};

export const ARCHIVE_FALLBACKS = {
  title: 'Sermon Archive',
  description: 'Access our complete collection of past sermons and messages.',
  contactEmail: 'info@thagospel.com',
  contactLabel: 'Contact us for access to older sermon archives.',
};

// Media section fallbacks
export const MEDIA_FALLBACKS = {
  heroTitle: 'Media Hub',
  heroSubtitle: 'Discover our collection of sermons, galleries, blog posts, and inspiration',
  noBlogPosts: 'No blog posts available. Check back soon for inspiring stories and updates.',
  noPhotos: 'No photos available. Check back soon for photos from our recent events.',
  noVideos: 'No videos available. Check back soon for our latest sermons and messages.',
  backToMedia: 'Back to Media',
  clearFilters: 'Clear Filters',
  searchPlaceholder: 'Search...',
  loadMore: 'Load More',
  sharePost: 'Share Post',
  downloadPhoto: 'Download Photo',
  closeLightbox: 'Close lightbox',
  nextPhoto: 'Next photo',
  previousPhoto: 'Previous photo',
  relatedPosts: 'Related Posts',
  readMore: 'Read More',
  viewPhotos: 'View Photos',
  watchNow: 'Watch Now',
  readStories: 'Read Stories',
  comingSoon: 'Coming Soon',
  allCategories: 'All Categories',
  allAlbums: 'All Albums',
  allYears: 'All Years',
  newestFirst: 'Newest First',
  oldestFirst: 'Oldest First',
  gridView: 'Grid View',
  listView: 'List View',
};

// Blog fallbacks
export const BLOG_FALLBACKS = {
  heroTitle: 'Blog',
  heroSubtitle: 'Read inspiring stories, devotionals, and updates from our church community',
  featuredPost: 'Featured Post',
  allPosts: 'All Posts',
  noPostsFound: 'No posts found',
  noPostsAvailable: 'No blog posts available. Check back soon for inspiring stories and updates.',
  searchPlaceholder: 'Search posts, authors, or tags...',
  showingResults: 'Showing {visible} of {total} posts',
  tags: 'Tags',
  aboutAuthor: 'About the author',
  sharePost: 'Share this post',
  readTime: 'min read',
  relatedPosts: 'Related Posts',
  backToBlog: 'Back to Blog',
  linkCopied: 'Link copied to clipboard!',
};

// Gallery fallbacks
export const GALLERY_FALLBACKS = {
  heroTitle: 'Gallery',
  heroSubtitle: 'Browse through photos from our events, services, and community activities',
  noPhotosFound: 'No photos found',
  noPhotosAvailable: 'No photos available. Check back soon for photos from our recent events.',
  searchPlaceholder: 'Search photos by title, caption, or event...',
  showingPhotos: 'Showing {count} photos',
  photoCount: 'photo',
  photoCountPlural: 'photos',
  downloadPhoto: 'Download photo',
  sharePhoto: 'Share photo',
  closeLightbox: 'Close lightbox',
  previousPhoto: 'Previous photo',
  nextPhoto: 'Next photo',
  album: 'Album',
  event: 'Event',
  dateTaken: 'Date taken',
  caption: 'Caption',
  untitled: 'Untitled',
  noImage: 'No Image',
  linkCopied: 'Image link copied to clipboard!',
};

// Ministries fallbacks
export const MINISTRIES_FALLBACKS = {
  heroTitle: 'Ministries',
  heroTagline: 'Find your place to serve and grow',
  closingCtaTitle: 'Ready to Get Involved?',
  closingCtaSubtitle: 'Join a ministry today and become part of our church family.',
  findYourMinistry: 'FIND YOUR MINISTRY',
  learnMore: 'LEARN MORE',
  joinUs: 'JOIN US',
  noMinistries: 'No ministries available. Check back soon for ministry opportunities.',
  statsPlaceholder: '—',
  whatToExpect: 'What to Expect',
  leadership: 'Leadership',
  gallery: 'Gallery',
  upcomingEvents: 'Upcoming Events',
  relatedMinistries: 'Related Ministries',
  joinMinistry: 'Join {ministryName}',
  fullName: 'Full Name',
  email: 'Email',
  phone: 'Phone',
  ageGroup: 'Age Group',
  message: 'Message (Optional)',
  submitting: 'Submitting...',
  joinMinistryButton: 'Join Ministry',
  thankYou: 'Thank You!',
  submissionFailed: 'Submission Failed',
  tryAgain: 'Try Again',
  ageGroups: {
    under13: 'Under 13',
    range13_17: '13-17',
    range18_25: '18-25',
    range26_40: '26-40',
    over40: '40+',
  },
  validationErrors: {
    fullNameRequired: 'Full name is required',
    emailRequired: 'Email is required',
    emailInvalid: 'Please enter a valid email',
  },
  successMessage: 'Thank you for your interest in {ministryName}! We\'ll be in touch soon.',
  errorMessage: 'Something went wrong. Please try again.',
  rateLimitError: 'Too many requests. Please try again later.',
};

// Events fallbacks
export const EVENTS_FALLBACKS = {
  heroTitle: 'Events',
  heroTagline: 'Join us for upcoming events and gatherings',
  noFeaturedEvent: 'No featured event at the moment. Check back soon.',
  noUpcomingEvents: 'No upcoming events at the moment. Check back soon.',
  noPastEvents: 'No past events to display.',
  noEventsFound: 'No events found matching your criteria.',
  free: 'FREE',
  registrationRequired: 'Registration Required',
  registerNow: 'REGISTER NOW',
  learnMore: 'LEARN MORE',
  viewEvent: 'VIEW EVENT',
  subscribeForUpdates: 'Subscribe for Updates',
  searchEvents: 'Search events...',
  clearFilters: 'Clear Filters',
  noResults: 'No events found. Try adjusting your filters.',
  showingEvents: 'Showing {count} events',
  event: 'event',
  events: 'events',
  views: {
    grid: 'Grid View',
    list: 'List View',
    calendar: 'Calendar View',
  },
  sortOptions: {
    soonest: 'Soonest First',
    latest: 'Latest First',
    thisWeek: 'This Week',
    thisMonth: 'This Month',
  },
  categories: {
    'Sunday Services': 'Sunday Services',
    'Youth Events': 'Youth Events',
    'Conferences': 'Conferences',
    'Outreach': 'Outreach',
    'Special Services': 'Special Services',
    'General': 'General',
  },
  countdown: {
    days: 'Days',
    hours: 'Hours',
    minutes: 'Minutes',
    seconds: 'Seconds',
    eventNow: 'This event is happening now!',
    eventEnded: 'This event has ended',
  },
  registration: {
    fullName: 'Full Name',
    email: 'Email',
    phone: 'Phone',
    numberOfAttendees: 'Number of Attendees',
    message: 'Message (Optional)',
    submitting: 'Registering...',
    registerButton: 'Register Now',
    thankYou: 'Registration Successful!',
    thankYouMessage: 'Thank you for registering for {eventTitle}! We\'ll be in touch soon.',
    registrationFailed: 'Registration Failed',
    registrationFailedMessage: 'Something went wrong. Please try again.',
    tryAgain: 'Try Again',
    eventFullyBooked: 'This event is fully booked.',
    validationErrors: {
      fullNameRequired: 'Full name is required',
      emailRequired: 'Email is required',
      emailInvalid: 'Please enter a valid email',
    },
  },
  newsletter: {
    title: 'Subscribe for Updates',
    subtitle: 'Get the latest events and announcements delivered to your inbox.',
    name: 'Name (Optional)',
    email: 'Email',
    preferences: 'I\'m interested in:',
    preferencesOptions: {
      events: 'Events',
      sermons: 'Sermons',
      announcements: 'Announcements',
    },
    subscribing: 'Subscribing...',
    subscribeButton: 'Subscribe',
    thankYou: 'Thank You!',
    thankYouMessage: 'You\'ve been successfully subscribed to our newsletter.',
    alreadySubscribed: 'Already Subscribed',
    alreadySubscribedMessage: 'This email is already subscribed to our newsletter.',
    subscriptionFailed: 'Subscription Failed',
    subscriptionFailedMessage: 'Something went wrong. Please try again.',
    tryAgain: 'Try Again',
  },
  calendar: {
    previousMonth: 'Previous month',
    nextMonth: 'Next month',
    moreEvents: '+{count} more',
    noEventsToday: 'No events today',
  },
  quickView: {
    title: 'Event Quick View',
    close: 'Close quick view',
  },
  export: {
    googleCalendar: 'Add to Google Calendar',
    appleCalendar: 'Add to Apple Calendar',
    outlookCalendar: 'Add to Outlook',
  },
};

// Contact fallbacks
export const CONTACT_FALLBACKS = {
  heroTitle: 'CONTACT',
  heroTagline: 'We\'d Love to Hear From You',
  address: '123 Church Street, Accra, Ghana',
  phone: '+233 30 123 4567',
  email: 'contact@thagospel.com',
  officeHours: [
    { days: 'Monday - Friday', hours: '9:00 AM - 5:00 PM' },
    { days: 'Saturday', hours: '10:00 AM - 2:00 PM' },
    { days: 'Sunday', hours: 'Closed' },
  ],
  socialLinks: [
    { platform: 'Facebook', url: 'https://facebook.com/thagospel' },
    { platform: 'Twitter', url: 'https://twitter.com/thagospel' },
    { platform: 'YouTube', url: 'https://youtube.com/thagospel' },
    { platform: 'Instagram', url: 'https://instagram.com/thagospel' },
  ],
  scriptureReference: 'Philippians 4:6',
  scriptureText: 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.',
  closingCtaTitle: 'Ready to Connect?',
  closingCtaSubtitle: 'We\'re here to help you grow in your faith journey. Reach out to us today.',
  contactForm: {
    fullName: 'Full Name',
    phone: 'Phone',
    email: 'Email',
    subject: 'Subject',
    message: 'Message',
    sending: 'Sending...',
    submitButton: 'Send Message',
    thankYou: 'Message Sent!',
    thankYouMessage: 'Thank you for contacting us. We\'ll get back to you soon.',
    sendAnother: 'Send Another Message',
    submissionFailed: 'Submission Failed',
    submissionFailedMessage: 'Something went wrong. Please try again.',
    tryAgain: 'Try Again',
    validationErrors: {
      fullNameRequired: 'Full name is required',
      emailRequired: 'Email is required',
      emailInvalid: 'Please enter a valid email',
      messageRequired: 'Message is required',
      messageMinLength: 'Message must be at least 10 characters',
    },
    subjects: {
      general: 'General Enquiry',
      prayer: 'Prayer Request',
      pastoral: 'Pastoral Appointment',
      partnership: 'Partnership/Collaboration',
      media: 'Media/Press',
      feedback: 'Feedback',
      volunteering: 'Volunteering',
      other: 'Other',
    },
  },
  prayerForm: {
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    requestType: 'Request Type',
    public: 'Public - share with congregation',
    private: 'Private - keep confidential',
    needsFollowUp: 'I would like someone to follow up with me',
    message: 'Share your prayer request here...',
    submitting: 'Submitting...',
    submitButton: 'Submit Prayer Request',
    thankYou: 'Prayer Request Received',
    thankYouMessage: 'Your prayer request has been received. We will be praying for you.',
    submitAnother: 'Submit Another Request',
    submissionFailed: 'Submission Failed',
    submissionFailedMessage: 'Something went wrong. Please try again.',
    tryAgain: 'Try Again',
    validationErrors: {
      nameRequired: 'Name is required',
      emailRequired: 'Email is required',
      emailInvalid: 'Please enter a valid email',
      messageRequired: 'Prayer request is required',
      messageMinLength: 'Prayer request must be at least 10 characters',
    },
  },
  visit: {
    title: 'VISIT US',
    subtitle: 'Find your way to ThaGospel Church',
    openInMaps: 'Open in Google Maps',
    mapTitle: 'Church location map',
  },
  serviceTimes: {
    title: 'SERVICE TIMES',
    noServices: 'No service times available',
  },
};
