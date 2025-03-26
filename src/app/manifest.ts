import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'minhbtc.blog',
    short_name: 'minhbtc.blog',
    description:
      "      Tôi viết về công nghệ, chia sẻ các kiến thức mình biết, nói về quan điểm cuộc sống, về lịch sử, về những câu chuyện, những chuyến đi,...\n" +
      "\n" +
      "            I write about technology, share my knowledge, talk about life perspectives, history, stories, trips,...",
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '16x16',
        type: 'image/x-icon',
      },
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
