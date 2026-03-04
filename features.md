# ThaGospel Church Website - Features and Functions

This document outlines all the features and functions implemented in the ThaGospel Church website.

## Core Website Structure

### Homepage
- **Hero Section**: Dynamic background image and heading fetched from Sanity CMS
- **Welcome Section**: Displays pastor information (name, bio, photo) from Sanity
- **Services Grid**: Shows church services with images, titles, descriptions, days, and times from Sanity
- **Live Stream Section**: Embedded YouTube video player for live services
- **Upcoming Events**: Dynamic list of events with titles, dates, descriptions, and images from Sanity
- **Testimonials Section**: Displays user testimonials fetched from Sanity
- **Request Prayer Section**: Dynamic form for prayer requests with API submission to Sanity CMS
- **Social Feed & Buttons**: Social media integration placeholders
- **Contact Form**: Functional contact form with EmailJS integration
- **Footer**: Site footer with links and information

### Navigation
- **Responsive Navbar**: Fixed header with direct navigation links
- **Menu Items**:
  - Home
  - About
  - Sermons
  - Events
  - Ministries
  - Give
  - Contact
- **Watch Live Button**: Highlighted red button with live indicator (pulsing dot when live)
- **Global Search**: Search icon with modal querying posts and events from Sanity
- **Mobile-Friendly**: Collapsible menu for mobile devices

## Content Management System (Sanity CMS)

### Schemas Implemented
- **Hero**: Title, subheading, background image
- **Pastor**: Name, bio, photo, branch
- **Service**: Title, description, day, time, image, branch
- **Event**: Title, date, description, image, branch
- **Testimony**: Name, message, branch
- **Post**: Title, slug, content (rich text), published date, image, branch
- **Sermon**: Title, slug, preacher, date, video/audio URLs, series, scripture, notes, branch
- **PrayerRequest**: Name, email, message, phone (optional), request type (public/private), follow-up requested, created date
- **VisitorRegistration**: Name, email, phone, service, bringing children, notes, created date
- **Contact**: First name, last name, email, subject, message, created date

### Dynamic Content Features
- Real-time content updates from Sanity Studio
- Image optimization and URL generation via Sanity Image API
- Rich text rendering for blog posts and sermons using PortableText
- Branch-based filtering (Ghana HQ content only)
- Automatic revalidation for fresh content (60 seconds)

## Blog System
- **Blog List Page** (`/blog`): Displays all posts with images, titles, dates, and excerpts
- **Individual Post Pages** (`/blog/[slug]`): Full post content with rich text, images, and metadata
- **Post Creation**: Add/edit posts in Sanity Studio
- **SEO-Friendly**: Automatic slug generation and meta data

## Sermons System
- **Sermons List Page** (`/sermons`): Displays all sermons with titles, preachers, dates, and descriptions from Sanity
- **Individual Sermon Pages** (`/sermons/[slug]`): Full sermon content with video/audio players, notes, scripture references
- **Sermon Creation**: Add/edit sermons in Sanity Studio with branch filtering
- **Media Support**: Video and audio URL embedding

## Donation System
- **Give Page** (`/donate`): Professional donation interface with Paystack integration
- **Payment Features**:
  - Preset amount buttons (GHS 10, 25, 50, 100)
  - Custom amount input
  - Email collection
  - Recurring donation option
  - Giving category dropdown (Tithe, Offering, Missions, Building Fund)
  - Secure payment processing via Paystack with category metadata
  - Mobile Money (Momo) support for Ghana
- **Confirmation**: Payment success/failure feedback

## Contact and Communication
- **Contact Form**: Name, email, message fields with EmailJS sending and reCAPTCHA placeholder
- **Email Integration**: Automated email delivery for inquiries

## Information Pages
- **Overview Page** (`/overview`): Church story, mission, vision, beliefs, leadership overview
- **New Here? Page** (`/new-here`): Welcome information, service expectations, connection guide, FAQs
- **Church Leadership Page** (`/leadership`): Leadership team profiles, philosophy, involvement opportunities

## Plan Your Visit Page (`/plan-your-visit`)
- **Service Times**: Dynamic display of church services fetched from Sanity
- **Interactive Map**: Embedded Google Maps showing church location
- **Visitor Registration Form**: Name, email, phone, service selection, bringing children checkbox, notes, with API submission to Sanity
- **reCAPTCHA Integration**: Security for form submissions

## API Routes
- **Prayer Request API** (`/api/prayer`): Handles prayer form submissions, stores in Sanity prayerRequest schema
- **Visitor Registration API** (`/api/visit`): Handles visitor form submissions, stores in Sanity visitorRegistration schema

## Technical Features

### Performance & SEO
- **Next.js 16**: App Router with server components and client components
- **SEO Optimization**: Meta tags, Open Graph, Twitter cards, structured data
- **Google Analytics**: Tracking and analytics integration
- **Image Optimization**: Next.js Image component and Sanity image processing
- **Responsive Design**: Tailwind CSS for mobile-first design

### Progressive Web App (PWA)
- **Web App Manifest**: Installable on devices
- **Service Worker**: Offline caching for key pages and assets
- **Background Sync**: Improved offline experience

### Security & Accessibility
- **Secure Payments**: Paystack integration with SSL
- **Form Validation**: Client-side and server-side validation
- **ARIA Labels**: Screen reader compatibility
- **Keyboard Navigation**: Accessible navigation and interactions

### Development Features
- **TypeScript**: Full type safety
- **ESLint**: Code quality enforcement
- **Turbopack**: Fast development builds
- **Environment Variables**: Secure API key management

## Pending Features (For Future Implementation)
- User Authentication with NextAuth.js
- Event calendar integration
- Email newsletter subscription
- Sermon audio/video uploads
- Admin dashboard
- Social sharing for blog posts

## Third-Party Integrations
- **Sanity CMS**: Content management and headless CMS
- **Paystack**: Payment processing and Mobile Money
- **EmailJS**: Email delivery service
- **YouTube**: Live stream embedding
- **Google Analytics**: Website analytics

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- PWA compatible devices

## Deployment Ready
The website is fully functional and ready for deployment to platforms like Vercel, Netlify, or traditional hosting with Node.js support.
