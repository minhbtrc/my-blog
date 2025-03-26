'use client'
import dayjs from 'dayjs'
import useSWR from 'swr'
import ky from 'ky'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import Tags from './tags'

// Helper function to normalize API routes
function normalizeApiRoute(route: string): string {
  // Ensure route starts with a slash for API calls
  const normalizedRoute = route.startsWith('/') ? route : `/${route}`;
  console.log(`Normalized API route: ${route} → ${normalizedRoute}`);
  return normalizedRoute;
}

// Helper function to normalize link routes
function normalizeLinkRoute(route: string): string {
  // For links, remove blog/ prefix if it exists
  let normalizedRoute = route;
  if (route.startsWith('blog/')) {
    normalizedRoute = route.substring(5); // Remove 'blog/'
  } else if (route.startsWith('/blog/')) {
    normalizedRoute = route.substring(6); // Remove '/blog/'
  }
  console.log(`Normalized link route: ${route} → ${normalizedRoute}`);
  return normalizedRoute;
}

export function useBlog(route: string) {
  const apiRoute = normalizeApiRoute(route);
  return useSWR(`/api${apiRoute}`, async (api: string) => {
    console.log(`Fetching blog data from: ${api}`);
    try {
      const data = await ky.get(api).json<Blog>();
      console.log(`Blog data for ${route}:`, data);
      return data;
    } catch (error) {
      console.error(`Error fetching blog data for ${route}:`, error);
      return {};
    }
  });
}

export function BlogCard({ route }: { route: string }) {
  const {
    data: { date = new Date(), tags = [], title = '', description = '' } = {},
  } = useBlog(route)

  const linkRoute = normalizeLinkRoute(route);

  return (
    <Link
      className="w-full grid grid-cols-6 gap-4 py-16 border-t border-base-300 cursor-pointer relative group"
      href={`/blog/${linkRoute}`}
    >
      <div className="col-span-full sm:col-span-1 sm:mt-1 flex flex-col gap-3">
        <p className="text-xs opacity-60">
          {dayjs(date).format('DD MMMM, YYYY')}
        </p>
        <Tags value={tags} readOnly />
      </div>
      <h2 className="col-span-full sm:col-span-2 font-semibold tracking-tight sm:-mt-1">
        {title}
      </h2>
      <p className="col-span-full sm:col-span-3 text-sm opacity-60">
        {description}
      </p>
      <button className="btn btn-circle btn-outline btn-sm absolute bottom-4 left-0 hidden transition-all group-hover:flex">
        <ArrowUpRight className="w-4 h-4" />
      </button>
    </Link>
  )
}

export function LiteBlogCard({ route }: { route: string }) {
  const { data: { title = '', description = '' } = {} } = useBlog(route)
  const linkRoute = normalizeLinkRoute(route);

  return (
    <Link
      className="w-full grid grid-cols-12 gap-2 py-6 border-t border-base-300 cursor-pointer relative group"
      href={`/blog/${linkRoute}`}
    >
      <h3 className="col-span-full font-semibold tracking-tight leading-tight">
        {title}
      </h3>
      <p className="col-span-full text-sm opacity-60 line-clamp-2">
        {description}
      </p>
    </Link>
  )
}
