# Sanity Data Debugging Steps

## Issue: Welcome Section Content Not Updating

### Problem Analysis:
1. **Homepage query updated** ✅ - Query matches new schema structure
2. **Component props updated** ✅ - WelcomeSection accepts dynamic props
3. **Data flow connected** ✅ - page.tsx passes correct props
4. **Content still hardcoded** ❌ - Shows fallback values instead of Sanity data

### Root Cause Investigation:

**Most likely causes:**
1. **No homepage document exists in Sanity** - Query returns null/undefined
2. **Wrong dataset/project** - Query hitting different dataset
3. **Schema not deployed** - Sanity Studio doesn't have new schema
4. **Document not published** - Homepage exists but not published

### Debugging Steps:

#### 1. Check Sanity Studio Access
```
Visit: http://localhost:3000/studio
Look for: "Homepage" document type in sidebar
```

#### 2. Create Homepage Document (if missing)
```
In Sanity Studio:
1. Click "Create new" 
2. Select "Homepage" type
3. Add content to fields:
   - welcomeSection.title: "Who We Are"
   - welcomeSection.message: "Welcome to House of God"
   - welcomeSection.image: [upload image]
4. Click "Publish"
```

#### 3. Verify Query Results
```javascript
// Add this to homepage temporarily to debug:
{console.log('Homepage data:', homepageData)}
```

#### 4. Check Network Requests
```javascript
// In browser dev tools:
// Look for Sanity API requests
// Check if data is being fetched
// Verify response structure
```

### Quick Fix Test:

**Test if query works by creating simple homepage document:**

1. Go to Sanity Studio
2. Create Homepage document with basic content
3. Publish it
4. Check if website updates

### Expected Behavior:
- ✅ Section label shows "Who We Are" (from Sanity)
- ✅ Title shows "A Warm Welcome Awaits You" (from Sanity)  
- ✅ Message shows "Welcome to House of God" (from Sanity)
- ❌ Currently showing hardcoded fallbacks

### Next Steps:
1. **Create homepage document in Sanity Studio**
2. **Publish the document**
3. **Test website updates**
4. **Verify all sections work correctly**
