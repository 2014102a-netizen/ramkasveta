/**
 * SEO Schemas Component
 * Injects Schema.org JSON-LD structured data into the page
 */

import React from 'react';

interface SEOSchemasProps {
  schema: object;
}

/**
 * Component to inject JSON-LD structured data
 * Used for SEO and LLM visibility
 */
export const SEOSchemas: React.FC<SEOSchemasProps> = ({ schema }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
