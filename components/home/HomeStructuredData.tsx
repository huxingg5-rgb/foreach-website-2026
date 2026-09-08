import { HOME_SITE_IDENTITY } from "@/lib/seo/site-identity";

// Render only on home pages: inner pages already provide their own graphs.
export default function HomeStructuredData() {
  return (
    <script
      id="foreach-home-site-identity"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(HOME_SITE_IDENTITY).replace(/</g, "\\u003c"),
      }}
    />
  );
}
