interface ArticleData {
  path: string;
  headline: string;
  description: string;
  published?: Date;
  modified?: Date;
  image?: string;
}
export function articleSchema(data: ArticleData) {
  const url = new URL(data.path, 'https://rogermurillo.co').href;
  return {
    '@context': 'https://schema.org', '@type': 'Article', '@id': `${url}#article`,
    headline: data.headline, description: data.description, url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url }, inLanguage: 'es-CO',
    author: { '@type': 'Organization', '@id': 'https://rogermurillo.co/#organization', name: 'Roger Murillo Asesoría de Imagen', url: 'https://rogermurillo.co/nosotros/' },
    publisher: { '@id': 'https://rogermurillo.co/#organization' },
    ...(data.published ? { datePublished: data.published.toISOString() } : {}),
    ...(data.modified ? { dateModified: data.modified.toISOString() } : {}),
    ...(data.image ? { image: new URL(data.image, url).href } : {}),
  };
}
