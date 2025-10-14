import { Layout } from '../components/Layout.js';
import { Hero } from '../components/Hero.js';
import { Timeline } from '../components/Timeline.js';

export function renderHome(site, recent) {
  const body = `${Hero(site)}${Timeline(recent, site.base || '')}`;
  return Layout(site, site.title, body);
}


