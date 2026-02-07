import { ServerPlatform } from "../server/server";

export type ServerRegistryEntry = {
    serverName: string;
    hostnames: string[];
    wildcardHostnames: string[];
    platform: ServerPlatform;
}