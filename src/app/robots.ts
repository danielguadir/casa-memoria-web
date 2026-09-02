import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Rules for legitimate search engine crawlers (Google, Bing, DuckDuckGo)
        userAgent: ['Googlebot', 'Bingbot', 'DuckDuckBot'],
        allow: '/',
        disallow: ['/api/admin/', '/admin/', '/_next/', '/private/'],
      },
      {
        // Rules for blocking aggressive AI scrapers, bad bots, and vulnerabilities scanners
        userAgent: [
          'GPTBot',
          'CCBot',
          'ChatGPT-User',
          'Google-Extended',
          'AnthropicAI',
          'ClaudeBot',
          'Omgilibot',
          'FacebookBot',
          'MJ12bot',
          'AhrefsBot',
          'SemrushBot',
          'DotBot',
          'Baiduspider',
          'YandexBot',
        ],
        disallow: '/',
      },
      {
        // Default rule for all other agents
        userAgent: '*',
        allow: '/',
        disallow: ['/api/admin/', '/admin/', '/private/'],
      },
    ],
    sitemap: 'https://casamemoria.gov.co/sitemap.xml',
  };
}
