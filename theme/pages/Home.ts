import type { SiteData, RouteMeta } from '../../types';
import { Layout } from '../components/Layout';
import { Hero } from '../components/Hero';
import { Timeline } from '../components/Timeline';

export function renderHome(site: SiteData, recent: RouteMeta[]): string {
  const body = `${Hero(site)}${Timeline(recent, site.base || '')}`;
  const siteWithActive = { ...(site as any), activeLink: '/' } as SiteData & { activeLink: string };
  return Layout(siteWithActive as any, site.title, body);
}


