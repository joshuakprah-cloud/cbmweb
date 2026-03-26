import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import {preacherType} from './preacherType'
import {sermonType} from './sermonType'
import {ministryType} from './ministryType'
import {contactSubmissionType} from './contactSubmissionType'
import {givingType} from './givingType'
import {givingTransaction} from './givingTransaction'
import {homepageType} from './homepageType'
import {eventType} from './eventType'
import {testimonyType} from './testimonyType'
import {siteSettingsType} from './siteSettingsType'
import eventRegistrationType from './eventRegistrationType'
import newsletterSubscriberType from './newsletterSubscriberType'
import {leaderType} from './leader'
import {beliefItemType} from './beliefItem'
import {coreValueType} from './coreValue'
import {locationType} from './location'
import {aboutPageType} from './aboutPage'
import {beliefsPageType} from './beliefsPage'
import {overviewPageType} from './overviewPage'
import {themePageType} from './themePage'
import {storyPageType} from './storyPage'
import {connectedPageType} from './connectedPage'
import {sermonsPageType} from './sermonsPage'
import {archivePageType} from './archivePage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType, 
    categoryType, 
    postType, 
    authorType, 
    contactSubmissionType,
    givingType,
    givingTransaction,
    homepageType,
    eventType,
    testimonyType,
    siteSettingsType,
    eventRegistrationType,
    newsletterSubscriberType,
    leaderType,
    beliefItemType,
    coreValueType,
    locationType,
    aboutPageType,
    beliefsPageType,
    overviewPageType,
    themePageType,
    storyPageType,
    connectedPageType,
    sermonsPageType,
    archivePageType,
    preacherType, 
    sermonType, 
    ministryType
  ],
}
