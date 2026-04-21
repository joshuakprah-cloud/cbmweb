# Website Features Summary

A comprehensive overview of all pages and features built for ThaGospel Church website.

---

## Homepage (`/`)

| Section | Features |
|---------|----------|
| **Hero** | Auto-sliding hero carousel, customizable headline, dual CTAs (primary/secondary) |
| **Plan Your Visit** | FAQ accordion, service info preview, registration prompt |
| **About Section** | Welcome message, pastor bio with photo, story CTA |
| **Sermons Teaser** | 3 recent sermon cards with thumbnails, speakers, dates |
| **Upcoming Events** | Horizontal carousel of events with dates, venues, flyers |
| **Ministries Snapshot** | Featured ministries grid, ministry description cards |
| **Testimony Section** | Rotating testimonial carousel with member quotes |
| **Closing CTA** | Final conversion section with dual action buttons |

**Technical Features:**
- Dynamic rendering with `force-dynamic`
- JSON-LD structured data for Church schema
- SEO metadata from Sanity CMS
- Responsive grid layouts

---

## About Section

### Main About Page (`/about`)

| Section | Features |
|---------|----------|
| **Breadcrumb Nav** | Home > About navigation |
| **Page Hero** | Full-width hero with background image, title, subtitle |
| **About Intro** | Church history narrative from CMS |
| **Mission & Vision** | Two-column layout with statements |
| **Navigation Cards** | Cards linking to Story, Leadership, Beliefs, Values |

### Our Story (`/about/story`)

| Section | Features |
|---------|----------|
| **Timeline** | Church history timeline with milestones |
| **Founding Story** | Pastor's vision and church origins |
| **Photo Gallery** | Historical photo progression |
| **Values Grid** | Core values with icons |

### Leadership (`/about/leadership`)

| Section | Features |
|---------|----------|
| **Breadcrumb** | Home > About > Leadership |
| **Hero** | Leadership team introduction |
| **Leadership Grid** | Categorized staff (Pastoral Team, Ministry Leaders, Support Staff) |
| **Staff Cards** | Photo, name, role, initials fallback for missing photos |
| **CTA Section** | Plan Your Visit / Get in Touch buttons |

**Technical Features:**
- Staff grouping by `leadershipCategory`
- Ordered categories: Pastoral Team → Ministry Leaders → Support Staff
- JSON-LD Person schema for each staff member

### Beliefs (`/beliefs`)

| Section | Features |
|---------|----------|
| **Statement of Faith** | Doctrinal beliefs accordion |
| **What We Believe** | Core theological statements |
| **FAQ** | Common questions about doctrine |

---

## Sermons Section

### Main Sermons Page (`/sermons`)

| Section | Features |
|---------|----------|
| **Hero** | Page header with title/subtitle from CMS |
| **Featured Sermon** | Large featured video with play button overlay |
| **Quick Navigation** | Jump links to Recent, Series, Topics |
| **Sermon Browser** | Advanced filtering interface |
| **Search & Filter** | Text search, series filter, speaker filter, date sort |
| **View Toggle** | Grid/List view switcher |
| **Sermon Cards** | Thumbnail, title, speaker, date, duration, scripture |
| **CTA Section** | Join Us This Sunday / Watch Live buttons |

### Sermon Detail (`/sermons/[slug]`)

| Feature | Description |
|---------|-------------|
| **Video Player** | YouTube embed with lazy loading |
| **Audio Player** | Audio sermon playback (if available) |
| **Sermon Info** | Title, speaker, date, scripture reference, series |
| **Related Sermons** | Same series or topic recommendations |
| **Download** | Audio download option |
| **Share** | Social sharing buttons |

### Series Pages (`/sermons/series/[series]`)

| Feature | Description |
|---------|-------------|
| **Series Hero** | Series cover image, title, sermon count |
| **Sermon Grid** | All sermons in the series |
| **Breadcrumb** | Home > Sermons > Series > [Series Name] |
| **Back Link** | Return to all series |

### Series Index (`/sermons/series`)

| Feature | Description |
|---------|-------------|
| **Series Grid** | All sermon series with cover images |
| **Series Cards** | Title, sermon count, date range |
| **Filter** | Search/filter series |

---

## Events Section

### Main Events Page (`/events`)

| Section | Features |
|---------|----------|
| **Hero** | Gradient background, title, tagline |
| **Featured Event** | Highlighted upcoming event with full details |
| **Quick Actions** | Category filter pills |
| **Events Browser** | Filterable events list |
| **Event Cards** | Flyer image, title, date, time, venue, excerpt |
| **CTA Section** | Engagement prompts |
| **Past Events Archive** | Collapsible past events section |

### Event Detail (`/events/[slug]`)

| Feature | Description |
|---------|-------------|
| **Event Header** | Cover image, title, date badge |
| **Event Details** | Full description, schedule, requirements |
| **Venue Info** | Location with map integration |
| **Registration** | Event signup form (if required) |
| **Add to Calendar** | ICS file download |
| **Share Event** | Social sharing |
| **Related Events** | Similar upcoming events |

---

## Media Hub (`/media`)

| Section | Features |
|---------|----------|
| **Hero** | Media hub introduction |
| **Featured Content** | Priority: Featured Sermon > Post > Event |
| **Latest Sermon Card** | Video thumbnail with play overlay |
| **Recent Blog Posts** | 3 latest articles with category, read time |
| **Gallery Preview** | Album grid with cover photos |
| **Media Categories** | 3 cards linking to Sermons, Gallery, Blog |
| **Podcast Banner** | Coming soon notification |
| **CTA** | Watch Live / Plan Your Visit |

### Blog (`/media/blog`)

| Feature | Description |
|---------|-------------|
| **Blog Grid** | Article cards with cover images |
| **Categories** | Filter by category |
| **Author Info** | Name, photo, date |
| **Read Time** | Estimated reading duration |
| **Search** | Article search |

### Blog Post (`/media/blog/[slug]`)

| Feature | Description |
|---------|-------------|
| **Article Header** | Title, author, date, category |
| **Rich Content** | PortableText rendering |
| **Featured Image** | Cover photo |
| **Related Posts** | Same category recommendations |
| **Share Buttons** | Social sharing |

### Gallery (`/media/gallery`)

| Feature | Description |
|---------|-------------|
| **Album Grid** | Photo albums with cover thumbnails |
| **Lightbox** | Full-screen photo viewer |
| **Photo Grid** | Masonry layout within albums |
| **Download** | High-res photo download |

---

## Connect Section

### Get Connected (`/connect`)

| Section | Features |
|---------|----------|
| **New Here Flow** | 4-step guided journey (Plan Visit → Attend → Join Group → Get Connected) |
| **Connection Cards** | Contact Us, Prayer Request, Small Groups |
| **Service Times** | Dynamic schedule from CMS |
| **Quick Links** | Fast access to key actions |

### Small Groups (`/connect/groups`)

| Section | Features |
|---------|----------|
| **Group Browser** | Filterable group directory |
| **Group Cards** | Meeting time, location, leader, description |
| **Categories** | Filter by type (Men, Women, Youth, etc.) |
| **Join Form** | Sign up for a group |
| **Testimonial** | Member quote about groups |

### Prayer Request (`/connect/prayer`)

| Section | Features |
|---------|----------|
| **Hero** | Prayer-focused header with eyebrow text |
| **Prayer Form** | Name, email, prayer request textarea |
| **Privacy Options** | Public vs. private request |
| **Submission Success** | Confirmation message |
| **Prayer Wall** | Public requests (if enabled) |

### Contact (`/connect/contact` or `/contact`)

| Section | Features |
|---------|----------|
| **Hero** | Contact page header |
| **Contact Info Panel** | Address, phone, email, office hours |
| **Contact Form** | Name, email, subject, message |
| **Map Integration** | Embedded Google Map |
| **Service Times** | Church schedule display |
| **Closing CTA** | Ministry exploration prompt |

---

## Ministries Section (`/ministries`)

| Section | Features |
|---------|----------|
| **Hero** | Ministries overview header |
| **Stats Bar** | Key numbers (members, ministries, volunteers, years) |
| **Ministry Grid** | All ministries organized by category |
| **People Ministries** | Kids, Youth, Women, Men |
| **Serve Ministries** | Outreach, Tech/Media |
| **Ministry Cards** | Image, name, tagline, description, join CTA |
| **JSON-LD** | Organization structured data |

### Individual Ministry Pages (`/ministries/[slug]`)

| Feature | Description |
|---------|-------------|
| **Ministry Hero** | Full-width header image |
| **Description** | Detailed ministry overview |
| **Leadership** | Ministry leaders/team |
| **Activities** | Regular meetings/events |
| **Join Form** | Ministry signup |
| **Gallery** | Ministry photos |

---

## Giving Page (`/give`)

| Section | Features |
|---------|----------|
| **Hero** | Giving page header with mission statement |
| **Giving Types** | Multiple giving categories (Tithes, Offerings, Missions, Building, etc.) |
| **Type Selection** | Cards with descriptions and suggested amounts |
| **Frequency Toggle** | One-time vs. Monthly giving |
| **Donation Form** | Name, email, amount input |
| **Anonymous Option** | Checkbox for anonymous giving |
| **Amount Presets** | Quick-select amount buttons |
| **Summary Screen** | Donation review before payment |
| **Paystack Integration** | Secure payment processing |
| **Success/Error States** | Payment feedback |

---

## I'm New / Plan Your Visit (`/im-new`)

| Section | Features |
|---------|----------|
| **Hero** | Welcome message, dual CTAs |
| **Photo Grid** | Asymmetric 5-photo community gallery |
| **What to Expect** | 5-step visitor journey walkthrough |
| **FAQ Accordion** | 8 common visitor questions (parking, dress code, kids, etc.) |
| **Next Steps Grid** | Small Groups, Kids Ministry, Get Connected cards |
| **Visitor Registration Form** | Name, phone, email, service preference, life stage |
| **Success State** | Confirmation with directions, service time, WhatsApp contact |
| **Form Validation** | Required fields, rate limiting |
| **WhatsApp Integration** | Direct contact link |

---

## Watch Live (`/watch`)

| Section | Features |
|---------|----------|
| **Live Stream Player** | YouTube live embed |
| **Live Status** | Currently live indicator |
| **Service Times** | Upcoming service schedule |
| **Recent Services** | Archive of past livestreams |
| **Chat/Engagement** | Live interaction features |

---

## Global Components

### Navigation (`Navbar`)

- Sticky header with scroll behavior
- Mobile hamburger menu with slide-out drawer
- Active link highlighting
- Dropdown menus for nested sections
- CTA button in nav

### Footer (`Footer` / `MegaFooter`)

- Multi-column link sections
- Social media links
- Newsletter signup
- Service times summary
- Copyright and legal links

### Layout Components

- **ConditionalLayout**: Layout wrapper with conditional rendering
- **PageHero**: Reusable hero component for subpages
- **SectionHeader**: Consistent section title/subtitle pattern
- **Breadcrumb**: Navigation breadcrumbs with structured data

---

## CMS Integration (Sanity)

### Content Types Managed

| Content Type | Fields |
|--------------|--------|
| **Homepage** | Hero slides, sections, CTAs, SEO |
| **About Page** | Hero, content, mission, vision |
| **Leadership** | Staff members with categories |
| **Sermons** | Title, speaker, video, audio, series, scripture |
| **Events** | Title, date, venue, flyer, description, category |
| **Blog Posts** | Title, content, author, category, featured image |
| **Gallery Albums** | Title, photos, cover image |
| **Ministries** | Name, description, image, category |
| **Small Groups** | Name, leader, meeting details, type |
| **Site Settings** | Logo, social links, address, service times |
| **Giving Types** | Title, description, suggested amounts |

### API Features

- GROQ queries for all content types
- Image URL generation with `urlFor`
- ISR (Incremental Static Regeneration) per page
- Fallback data for all queries

---

## SEO & Structured Data

### Implemented Schema Types

- **Church** (homepage)
- **AboutPage**
- **Organization** (leadership)
- **ItemList** (sermons, events, ministries)
- **CollectionPage** (series, media)
- **BreadcrumbList** (all subpages)
- **ContactPage**
- **Person** (staff members)
- **CreativeWork** (sermons, blog posts)

### SEO Features

- Dynamic metadata from CMS
- Open Graph tags
- Twitter Card tags
- Canonical URLs
- Robots meta tags
- XML sitemap

---

## Technical Architecture

| Feature | Implementation |
|---------|------------------|
| **Framework** | Next.js 14+ with App Router |
| **Styling** | Tailwind CSS |
| **CMS** | Sanity.io |
| **Images** | Next.js Image component + Sanity CDN |
| **Icons** | Heroicons + Lucide |
| **Forms** | React Hook Form |
| **Payments** | Paystack integration |
| **Maps** | Google Maps embed |
| **Video** | Lazy-loaded YouTube embeds |
| **UI Components** | Custom + shadcn/ui |
