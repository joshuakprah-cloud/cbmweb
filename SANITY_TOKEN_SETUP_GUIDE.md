# Sanity API Token Setup Guide

## Project Details
- **Project ID**: 98sik2dm
- **Dataset**: cbmweb

## Required Tokens

### 1. Read-Only API Token (for frontend data fetching)
This token allows your Next.js frontend to read data from Sanity.

**Steps to create:**
1. Go to [https://www.sanity.io/manage](https://www.sanity.io/manage)
2. Select your project: `98sik2dm`
3. Go to **API** tab in the left sidebar
4. Click **"Add API token"**
5. Fill in the details:
   - **Name**: `Frontend Read Token` or `Production Read Token`
   - **Dataset**: `cbmweb`
   - **Permissions**: **Read-only** (uncheck Write)
6. Click **"Generate"**
7. Copy the generated token (starts with `sk...`)
8. Add to your `.env` file:
   ```
   SANITY_API_READ_TOKEN=your_new_token_here
   ```

### 2. Management Token (for studio operations)
This token allows studio management and deployment operations.

**Steps to create:**
1. In the same **API** section
2. Click **"Add API token"** again
3. Fill in the details:
   - **Name**: `Studio Management Token` or `Deployment Token`
   - **Dataset**: `cbmweb`
   - **Permissions**: **Read and Write** (check both)
4. Click **"Generate"**
5. Copy the generated token (starts with `sk...`)
6. Add to your `.env` file:
   ```
   SANITY_AUTH_TOKEN=your_new_management_token_here
   ```

### 3. Webhook Token (optional but recommended)
For automatic revalidation when content changes.

**Steps to create:**
1. Go to **API** → **Webhooks** section
2. Click **"Add webhook"**
3. Fill in:
   - **Name**: `Production Revalidation`
   - **URL**: `https://your-domain.com/api/revalidate` (update with your domain)
   - **Trigger on**: Create, Update, Delete
   - **Dataset**: `cbmweb`
   - **Secret**: Generate a random secret
4. Add webhook secret to `.env`:
   ```
   SANITY_REVALIDATE_SECRET=your_webhook_secret_here
   ```

## Security Best Practices

1. **Never commit tokens to git** - they're already in `.env` which is in `.gitignore`
2. **Use read-only tokens for frontend** whenever possible
3. **Regenerate tokens periodically** for security
4. **Limit token permissions** to only what's needed
5. **Use different tokens** for different environments (dev/staging/prod)

## Testing Your Tokens

After adding tokens to `.env`, test them:

```bash
# Test read token
curl -H "Authorization: Bearer $SANITY_API_READ_TOKEN" \
     "https://98sik2dm.api.sanity.io/v2024-01-01/data/query/cbmweb?query=*%5B_type%20%3D%3D%20%22post%22%5D"

# Test management token
curl -H "Authorization: Bearer $SANITY_AUTH_TOKEN" \
     "https://api.sanity.io/v2021-06-07/projects/98sik2dm"
```

## Current Status

Your `.env` file currently has:
- ✅ Project ID and dataset updated
- ⏳ Need new read-only token
- ⏳ Need new management token
- ⏳ Optional: webhook token

## Next Steps

1. Generate the tokens using the steps above
2. Replace the existing tokens in `.env`
3. Restart your development server
4. Test the tokens using the curl commands above
5. Deploy to production once verified

## Troubleshooting

**Common Issues:**
- "401 Unauthorized" → Token is invalid or expired
- "403 Forbidden" → Token doesn't have required permissions
- "Project not found" → Wrong project ID or token belongs to different project

**Solutions:**
- Double-check token values in `.env`
- Ensure tokens are generated for project `98sik2dm`
- Verify dataset is set to `cbmweb`
- Regenerate tokens if needed
