import { getSiteIdentity } from "@/lib/seo/site-identity";

// Render only on home pages: inner pages already provide their own graphs.
export default function HomeStructuredData({ locale = "zh-CN" }: { locale?: string }) {
  return (
    <script
      id="foreach-home-site-identity"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getSiteIdentity(locale)).replace(/</g, "\\u003c"),
      }}
    />
  );
}
