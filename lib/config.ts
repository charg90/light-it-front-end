export function getApiUrl(): string {
  const apiUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error(
      "no API URL is defined. Please set the API_URL or NEXT_PUBLIC_API_URL environment variable."
    );
  }

  return apiUrl.replace(/\/$/, "");
}

export function buildApiUrl(endpoint: string): string {
  const baseUrl = getApiUrl();
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

  return `${baseUrl}${cleanEndpoint}`;
}
