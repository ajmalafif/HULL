import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Document types
import homePage from './documents/page-home'
import errorPage from './documents/page-error'
import page from './documents/page'

import generalSettings from './documents/settings-general'
import cookieSettings from './documents/settings-cookie'
import promoSettings from './documents/settings-promo'
import headerSettings from './documents/settings-header'
import footerSettings from './documents/settings-footer'
import seoSettings from './documents/settings-seo'
import menu from './documents/menu'
import redirect from './documents/redirect'

// Module types
import grid from './modules/grid'
import gridColumn from './modules/grid-column'
import gridSize from './modules/grid-size'
import hero from './modules/hero'
import marquee from './modules/marquee'
import dividerPhoto from './modules/divider-photo'
import newsletter from './modules/newsletter'

// Block types
import freeform from './blocks/freeform'
import accordions from './blocks/accordions'

// Object types
import seo from './objects/seo'

import navDropdown from './objects/nav-dropdown'
import navPage from './objects/nav-page'
import navLink from './objects/nav-link'
import socialLink from './objects/social-link'

import simplePortableText from './objects/portable-simple'
import complexPortableText from './objects/portable-complex'

import accordion from './objects/accordion'
import figure from './objects/figure'
import horizontalRule from './objects/horizontal-rule'

/*  ------------------------------------------ */
/*  Your Schema documents / modules / objects
/*  ------------------------------------------ */
export default createSchema({
  // The name of our schema
  name: 'content',

  types: schemaTypes.concat([
    /* ----------------- */
    /* 1: Document types */
    homePage,
    errorPage,
    page,

    generalSettings,
    cookieSettings,
    promoSettings,
    headerSettings,
    footerSettings,
    seoSettings,
    menu,
    redirect,

    /* --------------- */
    /* 2: Module types */
    grid,
    gridColumn,
    gridSize,
    hero,
    marquee,
    dividerPhoto,
    newsletter,

    /* -------------- */
    /* 3: Block types */
    freeform,
    accordions,

    /* ----------------------- */
    /* 4: Generic Object types */
    seo,

    navDropdown,
    navPage,
    navLink,
    socialLink,

    simplePortableText,
    complexPortableText,

    accordion,
    figure,
    horizontalRule
  ])
})
