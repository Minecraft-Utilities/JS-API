import type { ErrorResponse } from "./types/response/error-response";
import type { JavaServer } from "./types/server/java-server";

const API_BASE = "https://mc.fascinated.cc/api";

/**
 * Fetch a Java Minecraft server.
 * 
 * @param host the host to fetch the server using (eg: aetheria.cc)
 * @returns the server or the error (if one occured)
 */
export async function fetchJavaServer(host: string): Promise<{ server?: JavaServer, error?: ErrorResponse }> {
  const response = await fetch(`${API_BASE}/server/java/${host}`);
  if (response.ok) {
    return {
      server: await response.json() as JavaServer
    }
  }
  return {
    error: await response.json() as ErrorResponse
  }
}

const server = await fetchJavaServer("wildprison.net");
console.log(server.server?.asn.asnOrg);