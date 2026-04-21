# Manual Schema Deployment Guide

Since the automated CLI deployment is having issues, here are alternative methods:

## Option 1: Via Sanity Web Interface (Easiest)

1. Go to https://www.sanity.io/manage
2. Click on your project (project ID: `98sik2dm`)
3. Go to **"Schemas"** tab
4. Click **"Deploy Schema"**
5. Upload or paste the schema files from your `sanity/schema/` folder

## Option 2: Via Sanity HTTP API

You can deploy schemas directly using curl:

```bash
curl -X PUT \
  https://api.sanity.io/v2024-01-01/schemas/cbmweb \
  -H "Authorization: Bearer YOUR_SANITY_TOKEN" \
  -H "Content-Type: application/json" \
  -d @sanity/schema.json
```

## Option 3: Skip Studio Deploy (Recommended for Now)

**Good news: Your upload system works WITHOUT deploying the studio!**

The schema definitions in your code (`sanity/schema/*.ts`) are used by:
- `/api/sermons/upload` endpoint
- `/api/sermons/sync/youtube` endpoint
- Sanity client in your Next.js app

### To use the upload system NOW:

1. **Add this to `.env.local`:**
   ```env
   SANITY_API_TOKEN=your_sanity_write_token_here
   ```

2. **Get your token:**
   - Go to https://www.sanity.io/manage
   - Select your project
   - Go to **API** → **Tokens**
   - Add new token with **"Editor"** or **"Administrator"** role
   - Copy token to `.env.local`

3. **Restart your dev server:**
   ```bash
   npm run dev
   ```

4. **Go to `/admin/upload` and try uploading a video**

The API will create sermon documents with the new fields (videoSource, videoFile, etc.) even if the Studio isn't deployed!

## Option 4: Fix CLI Deployment

Try these commands one by one:

```bash
# 1. Clear everything
rmdir /s /q node_modules .next .sanity

# 2. Fresh install
npm install

# 3. Try deploying with explicit path
npx sanity deploy .

# 4. If that fails, try:
npx --yes sanity@latest deploy
```

## Option 5: Alternative - Use Existing Studio

If you already have a Sanity Studio deployed somewhere:

1. Open your existing studio URL
2. Go to Schema editor
3. Manually add the fields

Or if you have the Sanity Studio running locally:
```bash
npm run sanity
```
Then open http://localhost:3333

---

## Immediate Next Steps

Since the CLI is having issues, **I recommend Option 3** - just add your `SANITY_API_TOKEN` to `.env.local` and try the upload. The schema is already defined in your code and will work!

Need help getting the Sanity API token?
