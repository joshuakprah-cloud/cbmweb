# Sermons Management Workflow

This workflow covers how to add, edit, and manage sermons on the ThaGospel Church website using Sanity CMS.

## Overview

Sermons are managed through Sanity CMS and automatically displayed on:
- `/sermons` - Main sermons page with featured sermon and browser
- `/sermons#latest` - Direct link to latest/featured sermon
- `/sermons/series` - Series listing page
- `/sermons/speakers` - Speakers listing page
- `/sermons/archive` - Full sermon archive

---

## Adding a New Sermon

### Step 1: Prepare Sermon Content
// turbo
1. **Video**: Upload sermon video to YouTube
2. **Extract Video ID**: Get the YouTube video ID (e.g., `dQw4w9WgXcQ` from `https://www.youtube.com/watch?v=dQw4w9WgXcQ`)
3. **Metadata**: Prepare title, description, preacher name, date, series name

### Step 2: Create Sermon Document in Sanity
// turbo
1. Log into Sanity Studio (`https://your-project.sanity.studio`)
2. Navigate to **Sermons** section
3. Click **Create new document**
4. Select **Sermon** type

### Step 3: Fill Required Fields

#### Basic Information
- **Title**: Sermon title (e.g., "The Power of Faith")
- **Slug**: Auto-generated from title (e.g., "the-power-of-faith")
- **Video ID**: YouTube video ID only (e.g., "dQw4w9WgXcQ")
- **Published At**: Date sermon was delivered
- **Excerpt**: Brief description (2-3 sentences)

#### Preacher/ Speaker
- **Preacher**: Select from existing preachers or create new
- If new preacher:
  - Name: Full name
  - Slug: URL-friendly version
  - Bio: Brief biography
  - Photo: Upload headshot (400x400px recommended)

#### Series (Optional)
- **Series**: Select existing series or create new
- If new series:
  - Name: Series title
  - Slug: URL-friendly version
  - Description: Series overview
  - Cover Image: Upload series artwork (16:9 ratio, 1200x675px)

#### Additional Fields
- **Featured**: Check to make this the featured sermon on homepage
- **Tags**: Add relevant tags (e.g., "faith", "healing", "prayer")
- **Bible References**: Add scripture references (e.g., "John 3:16", "Romans 8:28")

### Step 4: Publish
// turbo
1. Click **Publish** button
2. Verify sermon appears on `/sermons` page
3. Check that featured sermon shows correctly (if marked as featured)

---

## Managing Preachers

### Adding a New Preacher

1. Go to **Preachers** section in Sanity
2. Click **Create new preacher**
3. Fill fields:
   - **Name**: Full name (e.g., "Prophet Powerman Bekoe")
   - **Slug**: Auto-generated (e.g., "prophet-powerman-bekoe")
   - **Title**: Role/position (e.g., "Lead Pastor")
   - **Bio**: Brief biography (150-300 words)
   - **Photo**: Upload headshot
4. Click **Publish**

### Editing Preacher Info

1. Find preacher in **Preachers** list
2. Click to open
3. Make changes
4. Click **Publish** to update

---

## Managing Series

### Creating a New Series

1. Go to **Series** section in Sanity
2. Click **Create new series**
3. Fill fields:
   - **Name**: Series title (e.g., "Kingdom Living 2025")
   - **Slug**: Auto-generated
   - **Description**: Series overview (1-2 paragraphs)
   - **Start Date**: When series begins
   - **End Date**: When series ends (optional)
   - **Cover Image**: Upload artwork (16:9 ratio)
   - **Color**: Brand color for series (optional)
4. Click **Publish**

### Adding Sermons to Series

1. When creating/editing sermon
2. Select series from **Series** dropdown
3. Sermon will automatically appear in series page

---

## Updating Featured Sermon

The featured sermon appears:
- On homepage
- At `/sermons#latest` (linked from navbar)
- As the main sermon on `/sermons`

### To Change Featured Sermon:

1. Find the sermon you want to feature in **Sermons** list
2. Open the sermon document
3. Check the **Featured** toggle
4. Click **Publish**
5. **Important**: Uncheck "Featured" on previous featured sermon

---

## Video Upload Guidelines

### YouTube Requirements
- **Resolution**: Minimum 720p, preferred 1080p
- **Aspect Ratio**: 16:9 (landscape)
- **Thumbnail**: Upload custom thumbnail (1280x720px)
- **Visibility**: Public or Unlisted (not Private)
- **Captions**: Add subtitles for accessibility (optional)

### Best Practices
- Upload video to YouTube first
- Use descriptive title on YouTube (matches sermon title)
- Add full description with timestamps on YouTube
- Include church website link in YouTube description

---

## Troubleshooting

### Sermon Not Appearing
- Check if sermon is **Published** (not just saved as draft)
- Verify **Published At** date is not in the future
- Check that **Video ID** is correct (just the ID, not full URL)
- Ensure preacher is properly linked

### Video Not Playing
- Verify YouTube video is Public or Unlisted
- Check Video ID is correct (11 characters)
- Ensure no extra spaces in Video ID field
- Test video URL: `https://www.youtube.com/watch?v=VIDEO_ID`

### Featured Sermon Not Updating
- Only one sermon should have **Featured** checked
- Clear browser cache and refresh
- Rebuild may take a few minutes (ISR revalidation)

### Speaker/Preacher Not Showing
- Ensure preacher document is published
- Check that preacher slug matches sermon assignment
- Verify preacher has required fields (name, slug)

---

## URL Structure

| Page | URL | Description |
|------|-----|-------------|
| Sermons Main | `/sermons` | All sermons with featured |
| Latest Sermon | `/sermons#latest` | Direct to featured sermon section |
| Series List | `/sermons/series` | All sermon series |
| Series Detail | `/sermons/series/[slug]` | Individual series page |
| Speakers | `/sermons/speakers` | All preachers/speakers |
| Speaker Detail | `/sermons/speakers/[slug]` | Individual speaker page |
| Archive | `/sermons/archive` | Full sermon archive |
| Single Sermon | `/sermons/[slug]` | Individual sermon page |

---

## Quick Reference

### Adding Sermon (Fast Track)
1. Upload to YouTube
2. Copy video ID
3. Sanity → Sermons → Create New
4. Fill: Title, Video ID, Date, Preacher
5. Publish

### Making Featured (Latest)
1. Open sermon
2. Check **Featured** toggle
3. Publish
4. Done!

### Creating New Series
1. Sanity → Series → Create New
2. Name, Description, Cover Image
3. Publish
4. Assign sermons to series

---

## Support

For technical issues or questions about sermon management, contact the development team or refer to Sanity CMS documentation.

**Last Updated**: March 2025
**Version**: 1.0