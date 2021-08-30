import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { m } from 'framer-motion'
import { imageBuilder } from '@lib/sanity'

import { isBrowser, useWindowSize } from '@lib/helpers'

import CookieBar from '@components/cookie-bar'
import Header from '@components/header'
import Footer from '@components/footer'

const duration = 0.4
const variants = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: {
      duration: duration,
      delay: 0.3,
      ease: 'linear',
      when: 'beforeChildren',
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: duration, ease: 'linear', when: 'beforeChildren' },
  },
}

const Layout = ({ site = {}, page = {}, schema, children }) => {
  // set <head> variables
  const siteTitle = site.title
  const siteIcon = site.seo?.siteIcon

  const templateTags = [
    {
      tag: '{{page_title}}',
      value: page.title,
    },
    {
      tag: '{{site_title}}',
      value: siteTitle,
    },
  ]

  const metaTitle = replaceTemplateTags(
    page.seo?.metaTitle || site.seo?.metaTitle,
    templateTags
  )
  const metaDesc = page.seo?.metaDesc || site.seo?.metaDesc

  const shareTitle = replaceTemplateTags(
    page.seo?.shareTitle || site.seo?.shareTitle,
    templateTags
  )
  const shareDesc = page.seo?.shareDesc || site.seo?.shareDesc
  const shareGraphic =
    page.seo?.shareGraphic?.asset || site.seo?.shareGraphic?.asset

  // set window height var
  const { height: windowHeight } = useWindowSize()

  // set header height
  const [headerHeight, setHeaderHeight] = useState(null)

  useEffect(() => {
    if (isBrowser) {
      document.body.style.setProperty('--vh', `${windowHeight * 0.01}px`)
    }
  }, [windowHeight])

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="format-detection" content="telephone=no" />

        <link preload="true" rel="icon" href="/favicon.svg" />
        <link
          preload="true"
          rel="mask-icon"
          href="/favicon.svg"
          color="#000000"
        />
        {siteIcon && (
          <link
            rel="apple-touch-icon"
            href={imageBuilder.image(siteIcon).width(180).height(180).url()}
          />
        )}

        <link rel="preconnect" href="https://hull-demo.myshopify.com" />
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="" />

        <title>{metaTitle}</title>
        {metaDesc && <meta name="description" content={metaDesc} />}

        {shareTitle && (
          <>
            <meta property="og:title" content={shareTitle} />
            <meta name="twitter:title" content={shareTitle} />
          </>
        )}

        {shareDesc && (
          <>
            <meta property="og:description" content={shareDesc} />
            <meta name="twitter:description" content={shareDesc} />
          </>
        )}

        {shareGraphic && (
          <>
            <meta
              property="og:image"
              content={imageBuilder
                .image(shareGraphic)
                .width(1200)
                .height(630)
                .url()}
            />
            <meta
              name="twitter:image"
              content={imageBuilder
                .image(shareGraphic)
                .width(1200)
                .height(630)
                .url()}
            />
          </>
        )}

        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />

        {siteTitle && <meta property="og:site_name" content={siteTitle} />}

        {schema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        )}
      </Head>

      <CookieBar data={site.cookieConsent} />

      <m.div
        initial="initial"
        animate="enter"
        exit="exit"
        variants={variants}
        style={headerHeight ? { '--headerHeight': `${headerHeight}px` } : null}
      >
        <Header
          data={site.header}
          isTransparent={page.hasTransparentHeader}
          onSetup={({ height }) => setHeaderHeight(height)}
        />
        <main id="content">{children}</main>
        <Footer data={site.footer} />
      </m.div>
    </>
  )
}

export default Layout

// replace template tags with values
function replaceTemplateTags(string, templateTags = []) {
  let newString = string

  templateTags.map((v) => {
    newString = newString.replace(new RegExp(v.tag, 'g'), v.value)
  })

  return newString
}
