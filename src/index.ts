import type { ErrorResponse } from "./types/response/error-response";
import type { ServerBlockedResponse } from "./types/response/server-blocked-response";
import type { IpLookup } from "./types/response/ip-lookup-response";
import type { BedrockServer } from "./types/server/impl/bedrock-server";
import type { JavaServer } from "./types/server/impl/java-server";
import type { ServerPlatform } from "./types/server/server";
import type { Cape } from "./types/player/cape/cape";
import { ServerRegistryEntry } from "./types/server-registry/server-registry-entry";
import { Player } from "./types/player/player";
import { CachedPlayerName } from "./types/cache/cached-player-name";
import { StatisticsResponse } from "./types/response/statistics-response";
import { Skin } from "./types/player/skin/skin";
import { Page } from "./types/pagination/pagination";
import { PlayerSearchEntry } from "./types/player/player-search-entry";

type RequestOptions = RequestInit & { responseType?: "json" | "arrayBuffer" };

export class McUtilsAPI {
  private readonly endpoint: string;
  private readonly fetchOptions?: RequestInit;

  constructor(
    endpoint: string = "https://mc.fascinated.cc/api",
    fetchOptions?: RequestInit
  ) {
    this.endpoint = endpoint;
    this.fetchOptions = fetchOptions;
  }

  /**
   * Requests data from the API.
   *
   * @param path the path to the API endpoint
   * @param options the options for the request
   * @returns the data or the error (if one occurred)
   */
  private async request<T>(
    path: string,
    options?: RequestOptions
  ): Promise<{ data?: T; error?: ErrorResponse }> {
    const { responseType = "json", ...init } = options ?? {};
    const url = path.startsWith("http") ? path : `${this.endpoint}${path}`;
    const response = await fetch(url, { ...this.fetchOptions, ...init });

    if (!response.ok) {
      return { error: (await response.json()) as ErrorResponse };
    }

    const data =
      responseType === "arrayBuffer" ? await response.arrayBuffer() : await response.json();
    return { data: data as T };
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
    type: ServerPlatform
  ): Promise<{ server?: JavaServer | BedrockServer; error?: ErrorResponse }> {
    const { data, error } = await this.request<JavaServer | BedrockServer>(
      `/servers/${type}/${host}`
    );
    return error ? { error } : { server: data };
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
    const { data, error } = await this.request<JavaServer>(`/servers/java/${host}`);
    return error ? { error } : { server: data };
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
    const { data, error } = await this.request<BedrockServer>(
      `/servers/bedrock/${host}`
    );
    return error ? { error } : { server: data };
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
    const { data, error } = await this.request<ServerBlockedResponse>(
      `/servers/blocked/${host}`
    );
    if (error) return { error };
    return { blocked: data!.blocked };
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
    return this.request<IpLookup>(`/ips/${query}`);
  }

  /**
   * Fetch a player by UUID or username.
   *
   * @param id the UUID or username of the player (eg: ImFascinated)
   * @returns the player or the error (if one occurred)
   */
  async fetchPlayer(
    id: string
  ): Promise<{ player?: Player; error?: ErrorResponse }> {
    const { data, error } = await this.request<Player>(`/players/${id}`);
    return error ? { error } : { player: data };
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
    const { data, error } = await this.request<CachedPlayerName>(
      `/players/uuid/${id}`
    );
    return error ? { error } : { playerName: data };
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
    const { data, error } = await this.request<ArrayBuffer>(
      `/servers/icon/${host}`,
      { responseType: "arrayBuffer" }
    );
    return error ? { error } : { image: data };
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
    const { data, error } = await this.request<ArrayBuffer>(
      `/servers/${platform}/preview/${host}${this.buildParams({ size: String(size) })}`,
      { responseType: "arrayBuffer" }
    );
    return error ? { error } : { image: data };
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
    const { data, error } = await this.request<ArrayBuffer>(
      `/skins/${id}/texture.png`,
      { responseType: "arrayBuffer" }
    );
    return error ? { error } : { image: data };
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
    const { data, error } = await this.request<ArrayBuffer>(
      `/skins/${id}/${part}.png${this.buildParams({ size: String(size), overlays: String(overlays) })}`,
      { responseType: "arrayBuffer" }
    );
    return error ? { error } : { image: data };
  }

  /**
   * Fetch the list of available capes (e.g. Migrator).
   *
   * @returns the list of cape data or the error (if one occurred)
   */
  async fetchCapes(): Promise<{
    capes?: Cape[];
    error?: ErrorResponse;
  }> {
    const { data, error } = await this.request<Cape[]>(`/capes`);
    return error ? { error } : { capes: data };
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
    const { data, error } = await this.request<ArrayBuffer>(
      `/capes/${query}/texture.png`,
      { responseType: "arrayBuffer" }
    );
    return error ? { error } : { image: data };
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
    const { data, error } = await this.request<ArrayBuffer>(
      `/capes/${query}/${type}.png${this.buildParams({ size: String(size) })}`,
      { responseType: "arrayBuffer" }
    );
    return error ? { error } : { image: data };
  }

  /**
   * Fetch the list of available server registry entries.
   *
   * @param query the query to search for (eg: aetheria)
   * @returns the list of server registry entries or the error (if one occurred)
   */
  async fetchServerRegistryEntries(query: string): Promise<{ entries?: ServerRegistryEntry[]; error?: ErrorResponse }> {
    const { data, error } = await this.request<ServerRegistryEntry[]>(
      `/servers${this.buildParams({ query: query })}`
    );
    return error ? { error } : { entries: data };
  }

  /**
   * Fetch the statistics of the API.
   *
   * @returns the statistics or the error (if one occurred)
   */
  async fetchStatistics(): Promise<{ statistics?: StatisticsResponse; error?: ErrorResponse }> {
    const { data, error } = await this.request<StatisticsResponse>(`/statistics`);
    return error ? { error } : { statistics: data };
  }

  /**
   * Fetch the list of available skins.
   *
   * @param page the page to fetch (default: 1)
   * @returns the list of skins or the error (if one occurred)
   */
  async fetchSkins(page: number = 1): Promise<{ skins?: Page<Skin>; error?: ErrorResponse }> {
    const { data, error } = await this.request<Page<Skin>>(
      `/skins${this.buildParams({ page: String(page) })}`
    );
    return error ? { error } : { skins: data };
  }

  /**
   * Search for players by username.
   *
   * @param query the query to search for (eg: aetheria)
   * @returns the player search entry or the error (if one occurred)
   */
  async searchPlayers(query: string): Promise<{ entry?: PlayerSearchEntry; error?: ErrorResponse }> {
    const { data, error } = await this.request<PlayerSearchEntry>(`/players/search/${query}`);
    return error ? { error } : { entry: data };
  }
}

export default McUtilsAPI;
