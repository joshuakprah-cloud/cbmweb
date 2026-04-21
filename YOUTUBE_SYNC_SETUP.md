# YouTube Sermon Sync Setup Guide

This feature automatically syncs sermons from your YouTube playlist to your website.

## 🚀 Quick Start

### Step 1: Get YouTube API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing)
3. Navigate to **APIs & Services** > **Credentials**
4. Click **Create Credentials** > **API Key**
5. Copy the API key

**Enable YouTube Data API:**
1. Go to **APIs & Services** > **Library**
2. Search for "YouTube Data API v3"
3. Click **Enable**

### Step 2: Create YouTube Playlist

1. Go to [YouTube Studio](https://studio.youtube.com/)
2. Navigate to **Playlists**
3. Create a new playlist called "ThaGospel Sermons" (or similar)
4. Add your sermon videos to this playlist
5. Copy the **Playlist ID** from the URL:
   - URL looks like: `youtube.com/playlist?list=PLxxxxxxxxxxxxxxxxxxxxxxxx`
   - Playlist ID is: `PLxxxxxxxxxxxxxxxxxxxxxxxx`

### Step 3: Add Environment Variables

Add to your `.env.local` file:

```env
YOUTUBE_API_KEY=your_youtube_api_key_here
SANITY_API_TOKEN=your_sanity_write_token
```

**Get Sanity API Token:**
1. Go to [Sanity Manage](https://www.sanity.io/manage)
2. Select your project
3. Go to **API** > **Tokens**
4. Click **Add API Token**
5. Give it "Write" permissions
6. Copy the token

### Step 4: Configure in Sanity Studio

1. Open Sanity Studio (`npm run dev` or your deployed studio)
2. Navigate to **"YouTube Sync Settings"** document type
3. Create new document:
   - **Playlist ID**: Paste your YouTube playlist ID
   - **Channel ID**: Optional - your YouTube channel ID
   - **Default Preacher**: Select your main pastor (auto-assigned to new sermons)
   - **Auto-Publish**: 
     - ✅ ON = sermons appear immediately on website
     - ❌ OFF = sermons saved as drafts (review first)
   - **Sync Frequency**: Choose how often to check for new videos
   - **Enable Auto-Sync**: ✅ Enable

### Step 5: Test the Sync

1. Go to `/admin/youtube-sync` on your website
2. Click **"Sync Now"**
3. Check results:
   - ✅ Shows number of synced sermons
   - ✅ Lists new sermon titles
   - ❌ Shows any errors if configuration is wrong

### Step 6: Verify in Sanity

1. Open Sanity Studio
2. Go to **Sermons** section
3. You should see new sermons with:
   - ✅ Title from YouTube
   - ✅ Description (truncated)
   - ✅ Published date
   - ✅ Duration
   - ✅ Video URL
   - ✅ Thumbnail

## 📋 What Gets Synced

| Data | Source | Notes |
|------|--------|-------|
| Title | YouTube video title | Slug auto-generated |
| Description | YouTube description | First 500 characters |
| Date | YouTube publish date | Used for sorting |
| Duration | YouTube video length | Converted to readable format |
| Video URL | YouTube video ID | Direct link to video |
| Thumbnail | YouTube thumbnail | High quality if available |
| Scripture | Title/description scan | Auto-detects verse references |
| Preacher | Default preacher setting | Can edit in Sanity after sync |

## 🔧 Features

### Duplicate Prevention
- Already synced videos are skipped
- Based on video URL matching
- Safe to run sync multiple times

### Scripture Detection
- Scans titles and descriptions
- Detects patterns like "John 3:16" or "Genesis 1:1-5"
- Auto-fills scriptureReference field

### Draft vs Published
- **Auto-publish OFF**: Sermons saved as drafts
  - Review/edit in Sanity before publishing
  - Great for quality control
- **Auto-publish ON**: Sermons appear immediately
  - Fastest workflow
  - Good when YouTube uploads are final

## 🔄 Automation Options

### Option 1: Manual Sync (Default)
- Visit `/admin/youtube-sync`
- Click button when ready

### Option 2: Scheduled Sync (Recommended)
Set up a cron job or scheduled function:

**Using Vercel Cron:**
```json
// vercel.json
{
  "crons": [
    {
      "path": "/api/sermons/sync/youtube",
      "schedule": "0 2 * * *"
    }
  ]
}
```
Runs daily at 2 AM.

**Using external service (Zapier, Make.com):**
- Schedule HTTP POST to `/api/sermons/sync/youtube`
- Set frequency (daily, weekly, etc.)

### Option 3: Webhook (Advanced)
- Set up YouTube webhook notifications
- Instant sync on new uploads
- Requires server setup

## ❓ Troubleshooting

### "YouTube API key not configured"
- Check `.env.local` has `YOUTUBE_API_KEY`
- Restart dev server after adding env vars
- Verify key is copied correctly (no spaces)

### "Playlist not found"
- Verify playlist ID is correct
- Playlist must be **Public** or **Unlisted**
- Private playlists won't work

### "No new sermons to sync"
- Videos already exist in Sanity
- Check Sanity Sermons to confirm
- Try adding a new video to playlist

### "Failed to create sermon"
- Check Sanity API token has write permissions
- Verify token is in `.env.local`
- Check console for detailed errors

### Sync is slow
- First sync may take time (many videos)
- Subsequent syncs are faster (only new videos)
- YouTube API has rate limits

## 📊 Best Practices

### YouTube Upload Workflow
1. Upload sermon to YouTube
2. Add to "ThaGospel Sermons" playlist
3. Use consistent title format: "Sermon Title - Scripture Reference"
4. Add full description (auto-imported to website)
5. Wait for sync (or trigger manually)

### Title Format Tips
Good examples:
- `The Power of Faith - Hebrews 11:1`
- `Walking in Victory - 1 Corinthians 15:57`
- `Sunday Service: January 14, 2024`

This helps with:
- Scripture auto-detection
- SEO
- User clarity

### Description Tips
- First 150 characters become "excerpt" on sermon cards
- First 500 characters become full description
- Include key points, scripture references, speaker bio

## 🛡️ Security Notes

- YouTube API key should be **server-side only** (not exposed to browser)
- Sanity API token should have **restricted permissions**
- Sync endpoint should be **protected** (add auth for production)

## 📈 Future Enhancements

Possible improvements:
- Download YouTube thumbnails to Sanity (better control)
- Auto-generate sermon series from playlist structure
- Import video transcripts for full-text search
- Auto-create social media posts on sync

---

**Questions?** Check the `/admin/youtube-sync` page for real-time status and error messages.
