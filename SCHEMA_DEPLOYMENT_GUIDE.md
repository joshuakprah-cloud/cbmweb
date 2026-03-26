# Quick Schema Deployment Guide

## How to Add Schemas to Your New Sanity Project

### Method 1: Studio Auto-Deploy
1. Go to: https://zwhz7xks.sanity.studio
2. Login with your new Sanity account
3. Schemas should auto-appear from your code

### Method 2: Manual Schema Creation
If schemas don't auto-appear, create them in Studio:

1. **Document Types:**
   - sermon (with fields: title, speaker, date, audioUrl, etc.)
   - event (with fields: title, date, venue, description, etc.)
   - ministry (with fields: name, description, leader, etc.)
   - post (blog post with title, body, author, etc.)
   - author (with fields: name, bio, photo, etc.)
   - teamMember (with fields: name, role, bio, photo, etc.)
   - gallery (with fields: title, images, description, etc.)
   - category (with fields: name, slug, description, etc.)
   - campus (with fields: name, address, serviceTimes, etc.)

2. **Object Types:**
   - serviceTimeEntry (with fields: day, name, time, location)
   - pageSeo (with fields: title, description, keywords)
   - heroSlide (with fields: title, subtitle, image, cta)
   - ministryLink (with fields: title, href, image, order)

### Method 3: Copy from Existing
If you have access to old project, copy schema structure from:
- sanity/schemas/documents/
- sanity/schemas/objects/

## All 65 Schema Types Ready:
✅ Documents: sermon, event, ministry, post, author, teamMember, gallery, category, campus
✅ Objects: serviceTimeEntry, pageSeo, heroSlide, ministryLink
✅ Plus: siteSettings, navigation, footer, prayerRequest, etc.

## Next Steps:
1. Deploy schemas to Sanity
2. Update Vercel environment variables
3. Test website at https://tha-gospel-church-website.vercel.app
