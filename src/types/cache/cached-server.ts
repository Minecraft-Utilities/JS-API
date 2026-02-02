import type { JavaServer } from "../server/impl/java-server";
import type { BedrockServer } from "../server/impl/bedrock-server";

/**
 * Cached server response (backend returns cache fields + unwrapped server).
 * Use JavaServer or BedrockServer for typed responses.
 */
export type CachedMinecraftServer = JavaServer | BedrockServer;
