import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import {overviewPageType} from './overviewPageType'
import {beliefsPageType} from './beliefsPageType'
import {themePageType} from './themePageType'
import {preacherType} from './preacherType'
import {sermonType} from './sermonType'
import {ministryType} from './ministryType'
import {contactSubmissionType} from './contactSubmissionType'
import {givingType} from './givingType'
import {givingTransaction} from './givingTransaction'
import {homepageType} from './homepageType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, postType, authorType, overviewPageType, beliefsPageType, themePageType, preacherType, sermonType, ministryType, contactSubmissionType, givingType, givingTransaction, homepageType],
}
