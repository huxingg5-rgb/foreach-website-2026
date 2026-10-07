import Image from "next/image";
import type { ReactNode } from "react";

export default function ProductTypeIntroImage({ image, children }: {
  image: { src: string; alt: string; width: number; height: number };
  children: ReactNode;
}) {
  return <>
    <div className="product-type-intro-image">
      <Image alt={image.alt} decoding="async" height={image.height} loading="eager"
        src={image.src} unoptimized width={image.width} />
    </div>
    {children}
  </>;
}
