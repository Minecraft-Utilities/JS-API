import type { ErrorResponse } from "./types/response/error-response";
import { BedrockServer } from "./types/server/bedrock-server";
import type { JavaServer } from "./types/server/java-server";

const API_BASE = process.env.MCUTILS_API_BASE || "https://mc.fascinated.cc/api";

/**
 * Fetch a Java Minecraft server.
 *
 * @param host the host to fetch the server using (eg: aetheria.cc)
 * @returns the server or the error (if one occured)
 */
export async function fetchJavaServer(
  host: string
): Promise<{ server?: JavaServer; error?: ErrorResponse }> {
  const response = await fetch(`${API_BASE}/server/java/${host}`);
  if (response.ok) {
    return {
      server: (await response.json()) as JavaServer,
    };
  }
  return {
    error: (await response.json()) as ErrorResponse,
  };
}

/**
 * Fetch a Bedrock Minecraft server.
 *
 * @param host the host to fetch the server using (eg: geo.hivebedrock.network)
 * @returns the server or the error (if one occured)
 */
export async function fetchBedrockServer(
  host: string
): Promise<{ server?: BedrockServer; error?: ErrorResponse }> {
  const response = await fetch(`${API_BASE}/server/bedrock/${host}`);
  if (response.ok) {
    return {
      server: (await response.json()) as BedrockServer,
    };
  }
  return {
    error: (await response.json()) as ErrorResponse,
  };
}