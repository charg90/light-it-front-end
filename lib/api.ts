import { getApiUrl, buildApiUrl } from "./config";

class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = getApiUrl();
  }

  async get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = buildApiUrl(endpoint);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }

  async post<T>(
    endpoint: string,
    data?: unknown | FormData,
    options?: RequestInit
  ): Promise<T> {
    const url = buildApiUrl(endpoint);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        ...options?.headers,

        ...(data instanceof FormData
          ? {}
          : { "Content-Type": "application/json" }),
      },
      body: data instanceof FormData ? data : JSON.stringify(data),
      ...options,
    });

    if (!response.ok) {
      let message = `Error ${response.status}: ${response.statusText}`;

      try {
        const errorBody = await response.json();
        if (errorBody?.message) {
          message = errorBody.message;
        }
      } catch {
        message = `Please try again later.`;
      }

      throw new Error(message);
    }

    return response.json();
  }

  async put<T>(
    endpoint: string,
    data?: unknown | FormData,
    options?: RequestInit
  ): Promise<T> {
    const url = buildApiUrl(endpoint);

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }

  async delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = buildApiUrl(endpoint);

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }
}

// Instancia singleton del cliente API
export const apiClient = new ApiClient();

// Funciones helper para uso directo
export const api = {
  get: apiClient.get,
  post: apiClient.post,
  put: apiClient.put,
  delete: apiClient.delete,
};
