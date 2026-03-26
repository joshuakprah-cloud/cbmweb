// Singletons
import siteSettings from "./singletons/siteSettings"
import navigation from "./singletons/navigation"
import serviceTimes from "./singletons/serviceTimes"
import homepage from "./singletons/homepage"
import announcementBanner from "./singletons/announcementBanner"
import footerContent from "./singletons/footerContent"
import cookieConsent from "./singletons/cookieConsent"
import notFoundPage from "./singletons/notFoundPage"

// Pages
import aboutPage from "./pages/aboutPage"
import storyPage from "./pages/storyPage"
import beliefsPage from "./pages/beliefsPage"
import leadershipPage from "./pages/leadershipPage"
import ministriesPage from "./pages/ministriesPage"
import sermonsPage from "./pages/sermonsPage"
import sermonsArchivePage from "./pages/sermonsArchivePage"
import speakersPage from "./pages/speakersPage"
import eventsPage from "./pages/eventsPage"
import mediaPage from "./pages/mediaPage"
import blogPage from "./pages/blogPage"
import galleryPage from "./pages/galleryPage"
import connectPage from "./pages/connectPage"
import contactPage from "./pages/contactPage"
import newHerePage from "./pages/newHerePage"
import groupsPage from "./pages/groupsPage"
import podcastPage from "./pages/podcastPage"

// Documents
import sermon from "./documents/sermon"
import sermonSeries from "./documents/sermonSeries"
import preacher from "./documents/preacher"
import ministry from "./documents/ministry"
import ministryLeader from "./documents/ministryLeader"
import outreachInitiative from "./documents/outreachInitiative"
import event from "./documents/event"
import eventCategory from "./documents/eventCategory"
import venue from "./documents/venue"
import registrationSubmission from "./documents/registrationSubmission"
import post from "./documents/post"
import author from "./documents/author"
import category from "./documents/category"
import gallery from "./documents/gallery"
import prayerRequest from "./documents/prayerRequest"
import prayerRequestCategory from "./documents/prayerRequestCategory"
import contactSubject from "./documents/contactSubject"
import smallGroup from "./documents/smallGroup"
import teamMember from "./documents/teamMember"
import campus from "./documents/campus"
import testimony from "./documents/testimony"
import statsBar from "./documents/statsBar"

// Objects
import pageSeo from "./objects/pageSeo"
import ctaBlock from "./objects/ctaBlock"
import socialLinks from "./objects/socialLinks"
import serviceTimeEntry from "./objects/serviceTimeEntry"
import historyMilestone from "./objects/historyMilestone"
import beliefItem from "./objects/beliefItem"
import nextStep from "./objects/nextStep"
import officeHour from "./objects/officeHour"
import ministryProgram from "./objects/ministryProgram"
import scheduleEntry from "./objects/scheduleEntry"
import ageGroup from "./objects/ageGroup"
import safetyPolicy from "./objects/safetyPolicy"
import serviceArea from "./objects/serviceArea"
import galleryPhoto from "./objects/galleryPhoto"

export const schemaTypes = [
  // Singletons
  siteSettings, navigation, serviceTimes, homepage,
  announcementBanner, footerContent, cookieConsent,
  notFoundPage,
  // Pages
  aboutPage, storyPage, beliefsPage, leadershipPage,
  ministriesPage, sermonsPage, sermonsArchivePage,
  speakersPage, eventsPage, mediaPage, blogPage,
  galleryPage, connectPage, contactPage, newHerePage,
  groupsPage, podcastPage,
  // Documents
  sermon, sermonSeries, preacher, ministry,
  ministryLeader, outreachInitiative, event,
  eventCategory, venue, registrationSubmission,
  post, author, category, gallery, prayerRequest,
  prayerRequestCategory, contactSubject, smallGroup,
  teamMember, campus, testimony, statsBar,
  // Objects
  pageSeo, ctaBlock, socialLinks, serviceTimeEntry,
  historyMilestone, beliefItem, nextStep, officeHour,
  ministryProgram, scheduleEntry, ageGroup,
  safetyPolicy, serviceArea, galleryPhoto
]
