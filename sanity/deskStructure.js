export const deskStructure = (S) =>
  S.list()
    .title("ThaGospel CMS")
    .items([
      S.listItem().title("⚙️ Site Settings")
        .child(S.document().schemaType("siteSettings")
          .documentId("siteSettings")),
      S.listItem().title("📢 Announcement Banner")
        .child(S.document().schemaType("announcementBanner")
          .documentId("announcementBanner")),
      S.listItem().title("🦶 Footer")
        .child(S.document().schemaType("footerContent")
          .documentId("footerContent")),
      S.divider(),
      S.listItem().title("🏠 Homepage")
        .child(S.document().schemaType("homepage")
          .documentId("homepage")),
      S.listItem().title("📖 About Pages")
        .child(S.list().title("About").items([
          S.documentTypeItem("aboutPage")
            .id("aboutPage"),
          S.documentTypeItem("storyPage")
            .id("storyPage"),
          S.documentTypeItem("beliefsPage")
            .id("beliefsPage"),
          S.documentTypeItem("leadershipPage")
            .id("leadershipPage"),
          S.documentTypeList("teamMember")
            .title("Team Members"),
          S.documentTypeList("campus")
            .title("Campuses"),
        ])),
      S.listItem().title("🎙 Sermons")
        .child(S.list().title("Sermons").items([
          S.documentTypeItem("sermonsPage")
            .id("sermonsPage"),
          S.documentTypeList("sermon")
            .title("All Sermons"),
          S.documentTypeList("sermonSeries")
            .title("Series"),
          S.documentTypeList("preacher")
            .title("Speakers"),
        ])),
      S.listItem().title("✋ Ministries")
        .child(S.list().title("Ministries").items([
          S.documentTypeItem("ministriesPage")
            .id("ministriesPage"),
          S.documentTypeList("ministry")
            .title("All Ministries"),
          S.documentTypeList("ministryLeader")
            .title("Ministry Leaders"),
          S.documentTypeList("outreachInitiative")
            .title("Outreach Initiatives"),
          S.documentTypeList("statsBar")
            .title("Stats Bars"),
        ])),
      S.listItem().title("📅 Events")
        .child(S.list().title("Events").items([
          S.documentTypeItem("eventsPage")
            .id("eventsPage"),
          S.documentTypeList("event")
            .title("All Events"),
          S.documentTypeList("eventCategory")
            .title("Event Categories"),
          S.documentTypeList("venue")
            .title("Venues"),
          S.documentTypeList("registrationSubmission")
            .title("Registrations"),
        ])),
      S.listItem().title("🎬 Media")
        .child(S.list().title("Media").items([
          S.documentTypeItem("mediaPage")
            .id("mediaPage"),
          S.documentTypeItem("blogPage")
            .id("blogPage"),
          S.documentTypeList("post")
            .title("Blog Posts"),
          S.documentTypeList("author")
            .title("Authors"),
          S.documentTypeList("category")
            .title("Blog Categories"),
          S.documentTypeItem("galleryPage")
            .id("galleryPage"),
          S.documentTypeList("gallery")
            .title("Galleries"),
          S.documentTypeItem("podcastPage")
            .id("podcastPage"),
        ])),
      S.listItem().title("🤝 Connect")
        .child(S.list().title("Connect").items([
          S.documentTypeItem("connectPage")
            .id("connectPage"),
          S.documentTypeItem("contactPage")
            .id("contactPage"),
          S.documentTypeItem("newHerePage")
            .id("newHerePage"),
          S.documentTypeItem("groupsPage")
            .id("groupsPage"),
          S.documentTypeList("smallGroup")
            .title("Small Groups"),
          S.documentTypeList("contactSubject")
            .title("Contact Subjects"),
          S.documentTypeList("prayerRequest")
            .title("Prayer Requests"),
          S.documentTypeList("prayerRequestCategory")
            .title("Prayer Categories"),
        ])),
      S.divider(),
      S.documentTypeItem("serviceTimes")
        .id("serviceTimes").title("🕐 Service Times"),
      S.documentTypeList("testimony")
        .title("💬 Testimonies"),
      S.documentTypeItem("notFoundPage")
        .id("notFoundPage").title("❌ 404 Page"),
      S.documentTypeItem("cookieConsent")
        .id("cookieConsent").title("🍪 Cookie Consent"),
    ])
