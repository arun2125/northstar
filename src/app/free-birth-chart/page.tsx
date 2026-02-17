import { Metadata } from 'next';
import FreeBirthChartClient from './FreeBirthChartClient';
import { metadata as pageMetadata, howToSchema, faqSchema } from './metadata';

export const metadata: Metadata = pageMetadata;

export default function FreeBirthChartPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FreeBirthChartClient />
    </>
  );
}
