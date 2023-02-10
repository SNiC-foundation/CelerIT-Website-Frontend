export function apiImageUrl(urlProp?: string) {
  if (!urlProp) return '';
  return `/${urlProp.replaceAll('\\', '/')}`;
}
