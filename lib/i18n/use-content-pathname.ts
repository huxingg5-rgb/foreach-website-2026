"use client";

import { usePathname } from "next/navigation";
import { getEnglishDraftSourcePath } from "./draft-languages";

// Core site features read paths in the same locale as the content they render.
export function useContentPathname() {
  return getEnglishDraftSourcePath(usePathname());
}
