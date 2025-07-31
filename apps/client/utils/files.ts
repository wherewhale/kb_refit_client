export function extractFilenameFromUrl(url: string): string {
  const match = url.match(/\/o\/uploads%2F([^?]+)/);
  return match ? decodeURIComponent(match[1]) : "";
}
