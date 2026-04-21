# Sermon Upload System Guide

Your website now supports **TWO ways** to add sermons:

1. **YouTube Sync** - Automatic sync from YouTube playlist
2. **Direct Upload** - Upload video files directly

---

## 📺 OPTION 1: YouTube Sync (Recommended)

### Best For:
- ✅ Regular sermon uploads
- ✅ Files larger than 500MB
- ✅ Already using YouTube
- ✅ Team is comfortable with YouTube

### How It Works:
1. Upload sermon to YouTube
2. Add to designated playlist
3. Click "Sync Now" in admin panel
4. Sermon appears on website

### Setup Steps:
1. Go to `/admin/youtube-sync`
2. Configure YouTube API key
3. Set playlist ID
4. Choose default preacher
5. Done!

**Full guide:** `YOUTUBE_SYNC_SETUP.md`

---

## 💾 OPTION 2: Direct File Upload

### Best For:
- ✅ One-off uploads
- ✅ Files under 500MB
- ✅ Need immediate publishing
- ✅ Private/unlisted content
- ✅ Audio-only sermons

### How It Works:
1. Go to `/admin/upload`
2. Drag & drop video file
3. Fill sermon details
4. Upload thumbnail (optional)
5. Upload audio file (optional)
6. Click "Upload Sermon"

### Supported Formats:

| Format | Extension | Best For |
|--------|-----------|----------|
| **MP4** | `.mp4` | Universal compatibility |
| **MOV** | `.mov` | High quality (Apple) |
| **WebM** | `.webm` | Web optimization |
| **MKV** | `.mkv` | High quality |
| **AVI** | `.avi` | Windows compatibility |

### File Size Limits:
- **Video**: 500MB maximum
- **Thumbnail**: 10MB maximum
- **Audio**: 100MB maximum

### Thumbnail Recommendations:
- **Ratio**: 16:9 (widescreen)
- **Resolution**: 1920x1080 (1080p)
- **Format**: JPG or PNG
- **File size**: Under 2MB

---

## 🎯 Which Should You Use?

| Scenario | Recommended | Why |
|----------|-------------|-----|
| Weekly sermons | **YouTube Sync** | Hands-off automation |
| One special sermon | **Direct Upload** | Quick & simple |
| Files > 500MB | **YouTube Sync** | No file size limits |
| Need custom thumbnail | **Direct Upload** | Full control |
| Audio + Video | **Direct Upload** | Upload both files |
| Private sermon | **Direct Upload** | Not on YouTube |
| Archive old sermons | **YouTube Sync** | Batch processing |

---

## 🔧 Advanced: Using Both Together

### Hybrid Workflow Example:

**Regular Sunday Sermons:**
1. Record sermon
2. Upload to YouTube
3. Auto-sync to website
4. Done!

**Special Events (Conferences, Guest Speakers):**
1. Record event
2. Go to `/admin/upload`
3. Upload directly
4. Custom thumbnail
5. Add to specific series

**Audio Podcast Episodes:**
1. Upload audio file only
2. Add cover image
3. No video needed

---

## 📱 Admin Panel URLs

| Feature | URL | Purpose |
|---------|-----|---------|
| YouTube Sync | `/admin/youtube-sync` | Sync from YouTube |
| Direct Upload | `/admin/upload` | Upload local files |
| View Sermons | `/messages` | Browse all sermons |
| Edit Sermons | Sanity Studio | Update metadata |

---

## 🛠️ Configuration

### Environment Variables:

```env
# YouTube Sync
YOUTUBE_API_KEY=your_key_here

# Direct Upload
SANITY_API_TOKEN=your_token_here
UPLOAD_API_KEY=optional_secret_key

# Optional: Cloudinary (for large files)
CLOUDINARY_CLOUD_NAME=your_cloud
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

### Sanity Schema:

The sermon document now has:

```typescript
{
  // ... other fields ...
  
  // Video source type
  videoSource: 'youtube' | 'upload' | 'external',
  
  // YouTube URL (when videoSource = 'youtube')
  videoUrl: 'https://youtube.com/watch?v=...',
  
  // Direct file (when videoSource = 'upload')
  videoFile: { asset: { _ref: '...' } },
  
  // External URL (when videoSource = 'external')
  externalVideoUrl: 'https://vimeo.com/...',
  
  // Optional audio file
  audioFile: { asset: { _ref: '...' } }
}
```

---

## 🔍 Troubleshooting

### YouTube Sync Issues:

| Problem | Solution |
|---------|----------|
| "API key not configured" | Add `YOUTUBE_API_KEY` to `.env.local` |
| "Playlist not found" | Check playlist is public/unlisted |
| "No new sermons" | Videos already synced or not in playlist |
| Sync is slow | Normal for first sync with many videos |

### Direct Upload Issues:

| Problem | Solution |
|---------|----------|
| "File too large" | Use YouTube sync for files > 500MB |
| Upload fails | Check internet connection |
| Video won't play | Verify file isn't corrupted |
| Wrong thumbnail | Re-upload in Sanity Studio |

---

## 💡 Best Practices

### Video Compression:

**Before uploading large files, compress them:**

1. **HandBrake** (Free): handbrake.fr
   - Preset: "Web" or "Vimeo YouTube 1080p30"
   - Reduces file size by 70-80%

2. **Online**: clipchamp.com
   - No software needed
   - Good for occasional use

### Naming Conventions:

**Good sermon titles:**
- ✅ "The Power of Faith - Hebrews 11:1"
- ✅ "Walking in Victory - January 2024"
- ✅ "Guest Speaker: Pastor John Smith"

**Bad sermon titles:**
- ❌ "VID_20240114_103052.mp4"
- ❌ "Untitled"
- ❌ "Sunday Sermon"

### Organizing Series:

1. Create series in Sanity first
2. Assign sermons to series when uploading
3. Use consistent series naming

---

## 🚀 Future Enhancements

Possible additions:
- Automatic video transcription
- AI-generated thumbnails
- Auto-create social media clips
- Podcast RSS feed generation

---

## 📞 Support

**Questions?**
1. Check this guide
2. Check `YOUTUBE_SYNC_SETUP.md`
3. Visit admin panels at `/admin/upload` and `/admin/youtube-sync`

**Need help?** The system is designed to be intuitive - try both methods and see which works best for your workflow!
