const targetHref = "/products/pumps/plunger-pumps/sm-100-pmma";

export const metadata = {
  title: "Redirecting | FOREACH",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: targetHref,
  },
};

export default function LegacyProbePlungerRedirectPage() {
  return (
    <main style={{ padding: "80px 24px", fontFamily: "Arial, sans-serif" }}>
      <meta httpEquiv="refresh" content={`0;url=${targetHref}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.location.replace(${JSON.stringify(targetHref)});`,
        }}
      />
      <h1 style={{ margin: "0 0 12px", fontSize: 24 }}>Redirecting...</h1>
      <p style={{ margin: "0 0 20px", color: "#4b5563" }}>
        This plunger pump page has moved to the correct pump route.
      </p>
      <a href={targetHref}>Open correct product page</a>
    </main>
  );
}
