import type { SiteData, RouteMeta } from '../../types';
import { Layout } from '../components/Layout';
import { Timeline } from '../components/Timeline';

export function renderList(site: SiteData, title: string, list: RouteMeta[]): string {
  // 列表页不显示 section 区块，仅展示时间线；同时高亮导航对应项
  const activeLink = title === '书评' ? '/book/' : title === '电影' ? '/movie/' : '/tv/';
  const siteWithActive = { ...(site as any), activeLink } as SiteData & { activeLink: string };
  const body = `${Timeline(list, site.base || '')}`;
  return Layout(siteWithActive as any, title, body);
}


