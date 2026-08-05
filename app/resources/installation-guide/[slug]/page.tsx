import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { installationGuideZhData } from "@/data/resources/installation-guide/installation-guide.zh";

type InstallationGuideDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return installationGuideZhData.guides.map((guide) => ({
    slug: guide.id,
  }));
}

export async function generateMetadata({
  params,
}: InstallationGuideDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  const currentGuide = installationGuideZhData.guides.find(
    (guide) => guide.id === slug,
  );

  if (!currentGuide) {
    return {
      title: "使用教程｜FOREACH 恒永达",
    };
  }

  return {
    title: `${currentGuide.title}｜使用教程｜FOREACH 恒永达`,
    description: currentGuide.description,
  };
}

export default async function InstallationGuideDetailPage({
  params,
}: InstallationGuideDetailPageProps) {
  const { slug } = await params;

  const currentGuide = installationGuideZhData.guides.find(
    (guide) => guide.id === slug,
  );

  if (!currentGuide) {
    notFound();
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#ffffff",
        padding: "48px 20px 80px",
      }}
    >
      <article
        style={{
          width: "min(1080px, 100%)",
          margin: "0 auto",
        }}
      >
        <nav
          aria-label="面包屑"
          style={{
            marginBottom: "28px",
            fontSize: "14px",
            color: "#667085",
          }}
        >
          <Link
            href="/resources/installation-guide"
            style={{
              color: "#173368",
              textDecoration: "none",
            }}
          >
            使用教程
          </Link>

          <span style={{ margin: "0 10px" }}>/</span>

          <span>{currentGuide.title}</span>
        </nav>

        <header
          style={{
            marginBottom: "30px",
          }}
        >
          <p
            style={{
              margin: "0 0 12px",
              color: "#173368",
              fontSize: "14px",
              fontWeight: 700,
              letterSpacing: "0.08em",
            }}
          >
            使用教程
          </p>

          <h1
            style={{
              margin: 0,
              color: "#172033",
              fontSize: "clamp(30px, 4vw, 46px)",
              lineHeight: 1.2,
            }}
          >
            {currentGuide.title}
          </h1>

          <p
            style={{
              maxWidth: "820px",
              margin: "18px 0 0",
              color: "#667085",
              fontSize: "17px",
              lineHeight: 1.8,
            }}
          >
            {currentGuide.description}
          </p>
        </header>

        <section
          id="tutorial-video"
          aria-label={`${currentGuide.title}视频`}
          style={{
            overflow: "hidden",
            background: "#000000",
            borderRadius: "8px",
          }}
        >
          <video
            src={currentGuide.videoUrl}
            poster={currentGuide.thumbnail}
            controls
            playsInline
            preload="metadata"
            style={{
              display: "block",
              width: "100%",
              aspectRatio: "16 / 9",
              objectFit: "contain",
              background: "#000000",
            }}
          >
            您的浏览器暂不支持视频播放。
          </video>
        </section>

        {currentGuide.tags.length > 0 ? (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginTop: "24px",
            }}
          >
            {currentGuide.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  padding: "7px 12px",
                  background: "#f3f6fa",
                  color: "#173368",
                  borderRadius: "999px",
                  fontSize: "14px",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </article>
    </main>
  );
}