# Sanity Deployment & Website Sync Guide

## 🚀 Complete Process to Ensure Sanity Changes Reflect on Website

### **Current Setup Analysis**
✅ **Project ID**: `98sik2dm`
✅ **Dataset**: `cbmweb`
✅ **Studio Path**: `/studio`
✅ **API Tokens**: Configured
✅ **Next.js Integration**: Set up

---

## 📋 Step-by-Step Deployment Process

### **1. Deploy Schema Changes to Sanity Studio**

```bash
# Deploy schema changes to Sanity
npx sanity deploy

# Or if you have the CLI installed globally
sanity deploy
```

**What this does:**
- Updates your Sanity Studio with new schema types
- Makes new fields available in the content editor
- Deploys the studio to `https://98sik2dm.sanity.studio`

---

### **2. Verify Studio Access**

1. **Local Development**: `http://localhost:3000/studio`
2. **Production Studio**: `https://98sik2dm.sanity.studio`

**Check that:**
- ✅ New schema types appear in the studio
- ✅ All fields are visible and editable
- ✅ No TypeScript errors in the studio

---

### **3. Update Content in Sanity Studio**

1. **Navigate to your studio**: `http://localhost:3000/studio`
2. **Find the Homepage document** (or create one)
3. **Update content** using the new schema fields
4. **Publish changes** (click "Publish" button)

---

### **4. Verify Website Updates**

#### **For Development:**
```bash
# Start development server
npm run dev
```
Visit: `http://localhost:3000`

#### **For Production:**
```bash
# Build and deploy
npm run build
npm run start
```

---

## 🔍 Troubleshooting Guide

### **Issue 1: Changes Not Showing on Website**

**Check these in order:**

1. **Is content published in Sanity?**
   - Look for "Published" status in studio
   - Unpublished content won't appear on website

2. **Is the website using the correct query?**
   ```bash
   # Check your queries in: sanity/lib/queries.ts
   # Ensure queries match new schema field names
   ```

3. **Is the Next.js cache cleared?**
   ```bash
   # Clear Next.js cache
   rm -rf .next
   npm run dev
   ```

4. **Is the Sanity client using CDN?**
   - Your `client.ts` has `useCdn: false` ✅ (Good for immediate updates)
   - If using CDN, changes may take up to 60 seconds

---

### **Issue 2: New Schema Fields Not Visible**

**Solutions:**

1. **Deploy schema again:**
   ```bash
   npx sanity deploy --force
   ```

2. **Clear browser cache:**
   - Hard reload studio: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

3. **Check TypeScript errors:**
   ```bash
   npm run lint
   # Fix any schema errors before deploying
   ```

---

### **Issue 3: API Token Issues**

**Verify tokens in `.env`:**
```bash
# Check that tokens are correct and not expired
echo $NEXT_PUBLIC_SANITY_PROJECT_ID  # Should be: 98sik2dm
echo $NEXT_PUBLIC_SANITY_DATASET     # Should be: cbmweb
```

---

## ⚡ Quick Verification Checklist

### **After Schema Changes:**
- [ ] Run `npx sanity deploy`
- [ ] Access studio at `http://localhost:3000/studio`
- [ ] See new schema types in the sidebar
- [ ] Can edit new fields without errors

### **After Content Updates:**
- [ ] Content is published (green checkmark)
- [ ] Website shows new content
- [ ] No console errors on website
- [ ] Images load correctly

---

## 🔄 Real-time Updates Setup

### **Current Configuration Analysis:**

**Your `client.ts` is configured for immediate updates:**
```typescript
export const client = createClient({
  projectId: '98sik2dm',
  dataset: 'cbmweb',
  apiVersion: '2023-01-01',
  useCdn: false,  // ✅ This gives you real-time updates
})
```

**For Production Optimization:**
```typescript
// Consider this for production (with revalidation)
export const client = createClient({
  projectId: '98sik2dm',
  dataset: 'cbmweb',
  apiVersion: '2023-01-01',
  useCdn: true,  // Use CDN for better performance
  // Add revalidation webhook if needed
})
```

---

## 📱 Testing Workflow

### **1. Schema Testing:**
```bash
# 1. Deploy schema
npx sanity deploy

# 2. Open studio
http://localhost:3000/studio

# 3. Test new fields
# - Create test content
# - Publish changes
# - Verify no errors
```

### **2. Content Testing:**
```bash
# 1. Update content in studio
# 2. Publish changes
# 3. Check website immediately
# 4. Verify all sections update correctly
```

### **3. Production Testing:**
```bash
# 1. Build for production
npm run build

# 2. Start production server
npm run start

# 3. Test all functionality
# 4. Verify performance
```

---

## 🚨 Common Pitfalls to Avoid

### **❌ Don't Do This:**
- Skip `sanity deploy` step
- Forget to publish content in studio
- Use old field names in queries
- Ignore TypeScript errors

### **✅ Do This Instead:**
- Always deploy schema changes first
- Publish content after editing
- Update queries to match schema
- Fix all TypeScript errors

---

## 🎯 Best Practices

### **For Schema Changes:**
1. **Deploy schema** → `npx sanity deploy`
2. **Test in studio** → Verify fields work
3. **Update queries** → Match new field names
4. **Update components** → Handle new data structure

### **For Content Updates:**
1. **Edit in studio** → Make changes
2. **Preview** → Check content looks good
3. **Publish** → Make content live
4. **Verify website** → Confirm changes appear

### **For Production:**
1. **Test locally** → Verify everything works
2. **Deploy schema** → `npx sanity deploy`
3. **Build site** → `npm run build`
4. **Deploy** → Push to production

---

## 📞 Quick Help Commands

```bash
# Sanity help
npx sanity help

# Check project status
npx sanity project list

# Deploy with verbose output
npx sanity deploy --verbose

# Check dataset
npx sanity dataset list
```

---

## ✅ Success Indicators

**When everything is working correctly:**
- ✅ Studio shows new schema types immediately after deploy
- ✅ Content updates appear on website within seconds
- ✅ No console errors on website or in studio
- ✅ All images and media load correctly
- ✅ SEO meta tags update properly

---

## 🎉 Summary

**Your Sanity setup is properly configured!** Just follow these steps:

1. **Deploy schema**: `npx sanity deploy`
2. **Update content**: Edit and publish in studio
3. **Verify changes**: Check website immediately

With `useCdn: false` in your client config, you should see content changes on your website within seconds of publishing in Sanity Studio.
