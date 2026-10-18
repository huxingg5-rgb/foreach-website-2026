'use client';
import { useEffect } from 'react';
/** Keep existing module links usable while the article tree replaces query tabs. */
export default function EnglishReviewQueryBridge({ targets }: { targets: Record<string, { href: string; modules: Record<string, string> }> }) {
  useEffect(() => {
    const redirect = () => {
      const query = new URLSearchParams(window.location.search);
      const group = query.get('application') ?? query.get('instrument');
      const target = group ? targets[group] : undefined;
      if (!target) return;
      const section = target.modules[query.get('module') ?? ''];
      window.location.replace(target.href + (section ? '#' + section : ''));
    };
    redirect();
    window.addEventListener('popstate',redirect);
    return () => window.removeEventListener('popstate',redirect);
  }, [targets]);
  return null;
}
