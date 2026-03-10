const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'cnr6558t',
  dataset: 'production',
  useCdn: false,
  token: 'skzmcqUplobUVsOXXTF5PuibV1May3s42ltKSizRn7mrbvvCJk6G4nvQejWXV8mWdxyfutQllzyA2MLRvxwPF7cnKdkPOPdfgNys2s1LZ8eTyvGSeviiVhM25K26v4Bd7j7VJ0kPfI4sHslTfpXmmtAaLA1Hpqu0cYec6gleB948dQpy9eFS'
});

async function updateProphetAndFirstLadyImages() {
  try {
    // Get existing homepage document
    const existingDoc = await client.fetch('*[_type == "homepage"][0]');
    
    if (!existingDoc) {
      console.log('❌ No homepage document found');
      return;
    }

    console.log('👥 Adding prophet and first lady images to Sanity document...');

    // Update with prophet and first lady images
    const updatedHomepage = {
      ...existingDoc,
      
      // Hero Gallery Section - Proper keyed structure
      heroSlides: existingDoc.heroSlides || [
        {
          _type: 'heroSlide',
          title: "Welcome to ThaGospel Church",
          subtitle: "Raising Believers. Impacting Nations.",
          cta: "Plan Your Visit",
          order: 1
        },
        {
          _type: 'heroSlide',
          title: "Join Our Sunday Service",
          subtitle: "Experience Powerful Worship & Biblical Teaching",
          cta: "Watch Live", 
          order: 2
        },
        {
          _type: 'heroSlide',
          title: "Growing Together in Faith",
          subtitle: "Building a Strong Church Community",
          cta: "Learn More",
          order: 3
        }
      ],
      
      // Ministry Links - Fixed keys with only imageUrl
      ministryLinks: existingDoc.ministryLinks || [
        { 
          _type: 'ministryLink',
          title: "Our Leadership", 
          href: "/about/leadership", 
          imageUrl: "/images/leadership.jpg", 
          order: 1 
        },
        { 
          _type: 'ministryLink',
          title: "Year's Theme", 
          href: "/about/theme", 
          imageUrl: "/images/theme.jpg", 
          order: 2 
        },
        { 
          _type: 'ministryLink',
          title: "Give", 
          href: "/give", 
          imageUrl: "/images/give.jpg", 
          order: 3 
        },
        { 
          _type: 'ministryLink',
          title: "Testimonies", 
          href: "/testimonies", 
          imageUrl: "/images/testimonies.jpg", 
          order: 4 
        },
        { 
          _type: 'ministryLink',
          title: "Sermons", 
          href: "/sermons", 
          imageUrl: "/images/sermons.jpg", 
          order: 5 
        },
        { 
          _type: 'ministryLink',
          title: "Forms", 
          href: "/forms", 
          imageUrl: "/images/forms.jpg", 
          order: 6 
        }
      ],
      
      // Upcoming Events - Proper keyed structure
      upcomingEvents: existingDoc.upcomingEvents || [
        {
          _type: 'upcomingEvent',
          title: "Sunday Service",
          date: "This Sunday",
          time: "9:00 AM",
          venue: "Main Auditorium",
          description: "Join us for powerful worship and life-changing teaching"
        },
        {
          _type: 'upcomingEvent',
          title: "Youth Fellowship", 
          date: "Friday",
          time: "7:00 PM",
          venue: "Youth Center",
          description: "Youth gathering with worship, fellowship, and fun activities"
        },
        {
          _type: 'upcomingEvent',
          title: "Prayer Meeting",
          date: "Wednesday", 
          time: "6:00 PM",
          venue: "Prayer Hall",
          description: "Midweek prayer and intercession meeting"
        }
      ],
      
      // Footer Columns - Proper keyed structure
      footerColumns: existingDoc.footerColumns || [
        {
          _type: 'footerColumn',
          title: "Quick Links",
          links: ["About Us", "Sermons", "Events", "Contact", "Give"]
        },
        {
          _type: 'footerColumn',
          title: "Ministries",
          links: ["Children", "Youth", "Men", "Women", "Outreach"]
        },
        {
          _type: 'footerColumn',
          title: "Resources",
          links: ["Blog", "Prayer Request", "Testimonies", "Gallery"]
        }
      ],
      
      // Footer Contact - Proper keyed structure
      footerContact: existingDoc.footerContact || {
        _type: 'footerContact',
        phone: "+233571124180 | +233570947621",
        email: "info@thagospel.org",
        address: "Gbeshigon Street, La, Accra, Ghana (Near Maale Dada Street)"
      },
      
      // Other sections - Prophet and First Lady images added back
      welcomeTitle: existingDoc.welcomeTitle || "WELCOME TO THAGOSPEL CHURCH",
      welcomeMessage: existingDoc.welcomeMessage || "We are delighted to welcome you to ThaGospel Church. Our heart is to raise believers rooted in biblical truth and empowered to impact the world. Whether you're exploring faith or looking for a spiritual home, we invite you to join our family.",
      prophetName: existingDoc.prophetName || "Prophet Powerman Bekoe",
      prophetTitle: existingDoc.prophetTitle || "Lead Prophet",
      prophetImage: existingDoc.prophetImage || null, // Will be uploaded via Sanity Studio
      firstLadyName: existingDoc.firstLadyName || "Prophetess Tracy Bekoe",
      firstLadyTitle: existingDoc.firstLadyTitle || "Prophetess",
      firstLadyImage: existingDoc.firstLadyImage || null, // Will be uploaded via Sanity Studio
      latestSermon: existingDoc.latestSermon || {
        title: "The Faith Life",
        speaker: "Prophet Powerman Bekoe",
        date: "2026-02-10",
        duration: "45:23",
        audioUrl: "https://your-audio-url.mp3"
      },
      prayerSection: existingDoc.prayerSection || {
        title: "REQUEST PRAYER",
        submitButtonText: "Send"
      },
      footerBottomText: existingDoc.footerBottomText || "© 2026 ThaGospel Church. All rights reserved. | Digital Address: GL-020-5834"
    };

    const updatedDoc = await client.createOrReplace({
      ...updatedHomepage,
      _id: existingDoc._id
    });

    console.log('✅ Prophet and First Lady images added to Sanity document!');
    console.log(`Document ID: ${updatedDoc._id}`);
    
    console.log('\n👥 Updates Applied:');
    console.log('1. Prophet image field added back to Sanity document');
    console.log('2. First Lady image field added back to Sanity document');
    console.log('3. All existing data preserved');
    console.log('4. Ready for frontend side-by-side display');
    console.log('5. Images can now be uploaded via Sanity Studio');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

updateProphetAndFirstLadyImages();
