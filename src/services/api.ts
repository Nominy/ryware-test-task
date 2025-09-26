import type { ParkingMeter, ParkingMeterFull } from "../types";
import { useQuery, queryOptions } from "@tanstack/react-query";

const RAW_API_BASE_URL = (import.meta.env.VITE_API_URL ?? "").toString().trim();

function getApiBaseUrl(): URL {
  try {
    if (RAW_API_BASE_URL) {
      const normalized = RAW_API_BASE_URL.endsWith("/")
        ? RAW_API_BASE_URL
        : `${RAW_API_BASE_URL}/`;
      return new URL(normalized);
    }
  } catch {}
  return new URL("/", window.location.origin);
}

const API_BASE = getApiBaseUrl();

function buildApiUrl(pathname: string): URL {
  const trimmed = pathname.replace(/^\//, "");
  return new URL(trimmed, API_BASE);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function fetchJson<T>(url: URL, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: {
      Accept: "application/json",
      ...(init?.headers ?? {}),
    },
  });

  const contentType = response.headers.get("content-type") ?? "";

  if (!response.ok) {
    let message = `Request failed ${response.status}`;
    try {
      if (contentType.includes("application/json")) {
        const body: unknown = await response.json();
        const bodyText = (body as any)?.message ?? (body as any)?.error ?? "";
        if (bodyText) message = `${message}: ${String(bodyText)}`;
      } else {
        const text = await response.text();
        if (text) message = `${message}: ${text}`;
      }
    } catch {}
    throw Object.assign(new Error(message), {
      status: response.status,
      url: url.toString(),
    });
  }

  if (contentType.includes("application/json")) {
    return (await response.json()) as T;
  }
  return (await response.text()) as unknown as T;
}

export const parkingKeys = {
  all: ["parkings"] as const,
  list: () => ["parkings"] as const,
  details: () => ["parking"] as const,
  detail: (id: string) => ["parking", id] as const,
};

export const parkingsQueryOptions = queryOptions({
  queryKey: parkingKeys.list(),
  queryFn: async (): Promise<ParkingMeter[]> => {
    const url = buildApiUrl("parkings");
    return fetchJson<ParkingMeter[]>(url, { method: "GET" });
  },
  staleTime: 60_000,
});

export const parkingByIdQueryOptions = (id: string) =>
  queryOptions({
    queryKey: parkingKeys.detail(id),
    queryFn: async (): Promise<ParkingMeterFull> => {
      const url = buildApiUrl(`parkings/${encodeURIComponent(id)}`);
      return fetchJson<ParkingMeterFull>(url, { method: "GET" });
    },
    enabled: Boolean(id),
    staleTime: 60_000,
  });

export function useParkings() {
  return useQuery(parkingsQueryOptions);
}

export function useParkingById(id: string) {
  return useQuery(parkingByIdQueryOptions(id));
}
