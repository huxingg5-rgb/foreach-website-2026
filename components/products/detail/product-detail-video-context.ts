"use client";

import { createContext } from "react";

// Related resources retain their article/product cards without repeating the
// product clips already shown before the FAQ. Other page types keep their videos.
export const ProductDetailVideoContext = createContext(false);
