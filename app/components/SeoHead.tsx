import Head from 'next/head';

interface SeoHeadProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
}

export default function SeoHead({
  title = "Can you be my friend?",
  description = "Be my friend, can make you happy",
  canonicalUrl = "https://affa.ai",
}: SeoHeadProps) {
  
  return (
    <Head>
      {/* Page-specific structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: title,
            description: description,
            url: canonicalUrl,
          }),
        }}
      />
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
    </Head>
  );
} 