const HTML_ENTITIES: Record<string, string> = {
  '&nbsp;': ' ',
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
};

export function stripHtml(input: string | null): string {
  if (!input) return '';
  const withoutTags = input.replace(/<[^>]*>/g, ' ');
  const withoutEntities = withoutTags.replace(
    /&nbsp;|&amp;|&lt;|&gt;|&quot;|&#39;/g,
    (match) => HTML_ENTITIES[match],
  );
  return withoutEntities.replace(/\s+/g, ' ').trim();
}
