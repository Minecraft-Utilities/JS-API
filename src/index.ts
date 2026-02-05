import type { ErrorResponse } from "./types/response/error-response";
import type { ServerBlockedResponse } from "./types/response/server-blocked-response";
import type { IpLookup } from "./types/response/ip-lookup-response";
import type { BedrockServer } from "./types/server/impl/bedrock-server";
import type { JavaServer } from "./types/server/impl/java-server";
import type { CachedPlayer } from "./types/cache/cached-player";
import type { CachedPlayerName } from "./types/cache/cached-player-name";
import type { CapeData } from "./types/player/cape/cape";
import { ServerType } from "./types/server/server";

export class McUtilsAPI {
  private readonly endpoint: string;

  constructor(endpoint: string = "https://mc.fascinated.cc/api") {
    this.endpoint = endpoint;
  }

  /**
   * Build URL search params string from a record of key-value pairs.
   *
   * @param params record of param names to string values
   * @returns query string including leading `?`, or empty string if no params
   */
  buildParams(params: Record<string, string>): string {
    const str = new URLSearchParams(params).toString();
    return str ? `?${str}` : "";
  }

  /**
   * Fetch a Minecraft server.
   *
   * @param host the host to fetch the server using (eg: aetheria.cc)
   * @param type the type of server to fetch (eg: java or bedrock)
   * @returns the server or the error (if one occurred)
   */
  async fetchServer(
    host: string,
    type: ServerType
  ): Promise<{ server?: JavaServer | BedrockServer; error?: ErrorResponse }> {
    const response = await fetch(`${this.endpoint}/servers/${type}/${host}`);
    if (response.ok) {
      return {
        server: (await response.json()) as JavaServer | BedrockServer,
      };
    }
    return {
      error: (await response.json()) as ErrorResponse,
    };
  }

  /**
   * Fetch a Java Minecraft server.
   *
   * @param host the host to fetch the server using (eg: aetheria.cc)
   * @returns the server or the error (if one occurred)
   */
  async fetchJavaServer(
    host: string
  ): Promise<{ server?: JavaServer; error?: ErrorResponse }> {
    const response = await fetch(`${this.endpoint}/servers/java/${host}`);
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
   * @returns the server or the error (if one occurred)
   */
  async fetchBedrockServer(
    host: string
  ): Promise<{ server?: BedrockServer; error?: ErrorResponse }> {
    const response = await fetch(`${this.endpoint}/servers/bedrock/${host}`);
    if (response.ok) {
      return {
        server: (await response.json()) as BedrockServer,
      };
    }
    return {
      error: (await response.json()) as ErrorResponse,
    };
  }

  /**
   * Fetch whether a server is blocked by Mojang.
   *
   * @param host the hostname to check (eg: aetheria.cc)
   * @returns the blocked status or the error (if one occurred)
   */
  async fetchServerBlocked(
    host: string
  ): Promise<{ blocked?: boolean; error?: ErrorResponse }> {
    const response = await fetch(`${this.endpoint}/servers/blocked/${host}`);
    if (response.ok) {
      const json = (await response.json()) as ServerBlockedResponse;
      return { blocked: json.blocked };
    }
    return {
      error: (await response.json()) as ErrorResponse,
    };
  }

  /**
   * Look up IP address (geo + ASN).
   *
   * @param query the IP address to lookup (eg: 127.0.0.1)
   * @returns the IP lookup response or the error (if one occurred)
   */
  async fetchIpLookup(
    query: string
  ): Promise<{ data?: IpLookup; error?: ErrorResponse }> {
    const response = await fetch(`${this.endpoint}/ips/${query}`);
    if (response.ok) {
      return { data: (await response.json()) as IpLookup };
    }
    return {
      error: (await response.json()) as ErrorResponse,
    };
  }

  /**
   * Fetch a player by UUID or username.
   *
   * @param id the UUID or username of the player (eg: ImFascinated)
   * @returns the player or the error (if one occurred)
   */
  async fetchPlayer(
    id: string
  ): Promise<{ player?: CachedPlayer; error?: ErrorResponse }> {
    const response = await fetch(`${this.endpoint}/players/${id}`);
    if (response.ok) {
      return {
        player: (await response.json()) as CachedPlayer,
      };
    }
    return {
      error: (await response.json()) as ErrorResponse,
    };
  }

  /**
   * Resolve a username to UUID (or UUID to username).
   *
   * @param id the UUID or username to resolve (eg: ImFascinated)
   * @returns the player name data or the error (if one occurred)
   */
  async fetchPlayerUuid(
    id: string
  ): Promise<{ playerName?: CachedPlayerName; error?: ErrorResponse }> {
    const response = await fetch(`${this.endpoint}/players/uuid/${id}`);
    if (response.ok) {
      return {
        playerName: (await response.json()) as CachedPlayerName,
      };
    }
    return {
      error: (await response.json()) as ErrorResponse,
    };
  }

  /**
   * Fetch a server favicon/icon image.
   *
   * @param host the hostname of the server (eg: aetheria.cc)
   * @returns the PNG image or the error (if one occurred)
   */
  async fetchServerIcon(
    host: string
  ): Promise<{ image?: ArrayBuffer; error?: ErrorResponse }> {
    const response = await fetch(`${this.endpoint}/servers/icon/${host}`);
    if (response.ok) {
      return { image: await response.arrayBuffer() };
    }
    return {
      error: (await response.json()) as ErrorResponse,
    };
  }

  /**
   * Fetch a server preview image.
   *
   * @param platform the platform (java or bedrock)
   * @param host the hostname of the server (eg: aetheria.cc)
   * @param size the image size (default: 768)
   * @returns the PNG image or the error (if one occurred)
   */
  async fetchServerPreview(
    platform: string,
    host: string,
    size = 768
  ): Promise<{ image?: ArrayBuffer; error?: ErrorResponse }> {
    const response = await fetch(
      `${this.endpoint}/servers/${platform}/preview/${host}${this.buildParams({ size: String(size) })}`
    );
    if (response.ok) {
      return { image: await response.arrayBuffer() };
    }
    return {
      error: (await response.json()) as ErrorResponse,
    };
  }

  /**
   * Fetch a player's skin image.
   *
   * @param id the UUID or username of the player (eg: ImFascinated)
   * @returns the skin PNG image or the error (if one occurred)
   */
  async fetchPlayerSkinTexture(
    id: string
  ): Promise<{ image?: ArrayBuffer; error?: ErrorResponse }> {
    const response = await fetch(`${this.endpoint}/skins/${id}/texture.png`);
    if (response.ok) {
      return { image: await response.arrayBuffer() };
    }
    return {
      error: (await response.json()) as ErrorResponse,
    };
  }

  /**
   * Fetch a specific part of a player's skin (eg: head, body).
   *
   * @param id the UUID or username of the player (eg: ImFascinated)
   * @param part the skin part to fetch (eg: head)
   * @param size the image size (default: 768)
   * @param overlays whether to render skin overlay layers (default: true)
   * @returns the skin part PNG image or the error (if one occurred)
   */
  async fetchPlayerSkin(
    id: string,
    part: string,
    size = 768,
    overlays = true
  ): Promise<{ image?: ArrayBuffer; error?: ErrorResponse }> {
    const response = await fetch(
      `${this.endpoint}/skins/${id}/${part}.png${this.buildParams({ size: String(size), overlays: String(overlays) })}`
    );
    if (response.ok) {
      return { image: await response.arrayBuffer() };
    }
    return {
      error: (await response.json()) as ErrorResponse,
    };
  }

  /**
   * Fetch the list of available capes (e.g. Migrator).
   *
   * @returns the list of cape data or the error (if one occurred)
   */
  async fetchCapes(): Promise<{
    capes?: CapeData[];
    error?: ErrorResponse;
  }> {
    const response = await fetch(`${this.endpoint}/capes`);
    if (response.ok) {
      return { capes: (await response.json()) as CapeData[] };
    }
    return {
      error: (await response.json()) as ErrorResponse,
    };
  }

  /**
   * Fetch a cape texture image.
   *
   * @param query player UUID/username or 64-char cape texture id
   * @returns the cape PNG image or the error (if one occurred)
   */
  async fetchCapeTexture(
    query: string
  ): Promise<{ image?: ArrayBuffer; error?: ErrorResponse }> {
    const response = await fetch(`${this.endpoint}/capes/${query}/texture.png`);
    if (response.ok) {
      return { image: await response.arrayBuffer() };
    }
    return {
      error: (await response.json()) as ErrorResponse,
    };
  }

  /**
   * Fetch a rendered cape part (e.g. front).
   *
   * @param query player UUID/username or 64-char cape texture id
   * @param type cape part (e.g. front) – see CapeRendererType
   * @param size image height (default 768)
   * @returns the cape part PNG image or the error (if one occurred)
   */
  async fetchCapePart(
    query: string,
    type: string,
    size = 768
  ): Promise<{ image?: ArrayBuffer; error?: ErrorResponse }> {
    const response = await fetch(
      `${this.endpoint}/capes/${query}/${type}.png${this.buildParams({ size: String(size) })}`
    );
    if (response.ok) {
      return { image: await response.arrayBuffer() };
    }
    return {
      error: (await response.json()) as ErrorResponse,
    };
  }
}

export default McUtilsAPI;
