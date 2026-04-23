# BLISS SEO Launch Checklist

## 1) Environment setup

- Set `NEXT_PUBLIC_SITE_URL` in `frontend/.env.local` to your live domain.
- Set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` after adding the property in Google Search Console.
- Restart the frontend server after env changes.

## 2) Search Console and indexing

- Open [Google Search Console](https://search.google.com/search-console/about) and add your domain property.
- Submit sitemap: `https://your-domain.com/sitemap.xml`.
- Request indexing for key pages:
  - `/`
  - `/services`
  - `/academy`
  - `/about`
  - `/contact`

## 3) Content quality and targeting

- Create one primary keyword target for each page.
- Keep one clear `h1` per page and use descriptive `h2` sections.
- Add city/location modifiers naturally in content (for local SEO).
- Add original photos and before/after work samples with descriptive `alt` text.

## 4) Local SEO (high impact)

- Create/optimize Google Business Profile with exact same Name, Address, Phone (NAP).
- Keep NAP consistent across website, social pages, and listings.
- Encourage customers to leave Google reviews regularly.
- Add service and location details in GBP posts weekly.

## 5) Technical checks

- Verify `robots.txt` is available and admin routes are blocked from crawling.
- Verify `sitemap.xml` returns all public routes.
- Run Lighthouse and improve:
  - Largest Contentful Paint (LCP)
  - Cumulative Layout Shift (CLS)
  - Interaction to Next Paint (INP)
- Compress hero and service images (WebP preferred).

## 6) Authority and growth

- Build backlinks from local directories, wedding vendors, and beauty communities.
- Publish useful blog/guide pages (bridal prep, skincare routines, service guides).
- Interlink new pages to `/services` and `/contact`.

## 7) Track performance

- Connect Google Analytics 4 and Search Console.
- Monitor:
  - Indexed pages
  - Top queries
  - CTR by page
  - Local rankings for target keywords
- Update titles/descriptions quarterly based on query data.
