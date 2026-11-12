import { projectCases } from '../data/projectCases.ts';
/** Compare parsed URLs so root demos with or without a trailing slash map equally. */
export function demoProject(href: string): string | undefined {
  let url: URL;
  try { url = new URL(href); } catch { return undefined; }
  return Object.entries(projectCases).find(([, project]) => {
    if (!project.demo) return false;
    const demo = new URL(project.demo);
    return demo.origin === url.origin && demo.pathname === url.pathname;
  })?.[0];
}
