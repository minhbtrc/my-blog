import { MetadataRoute } from 'next'
import { profile } from '@/data/profile'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Minh BTC - AI Engineer Portfolio',
    short_name: 'Minh BTC',
    description: profile.intro,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
