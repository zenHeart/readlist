import type { SiteData, RouteMeta } from '../../types';
import { Layout } from '../components/Layout';
import { Hero } from '../components/Hero';
import { Timeline } from '../components/Timeline';

export function renderHome(site: SiteData, recent: RouteMeta[]): string {
  const body = `${Hero(site)}${Timeline(recent, site.base || '')}`;
  return Layout(site, site.title, body);
}


