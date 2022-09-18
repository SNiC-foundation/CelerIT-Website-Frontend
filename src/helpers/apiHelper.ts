export function apiImageUrl(urlProp?: string) {
  if (!urlProp) return '';
  return `/api/static/${urlProp.replaceAll('\\', '/')}`;
}
