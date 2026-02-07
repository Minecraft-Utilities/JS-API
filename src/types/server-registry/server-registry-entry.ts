import { ServerPlatform } from "../server/server";

export type ServerRegistryEntry = {
    serverId: string;
    displayName: string;
    hostnames: string[];
    wildcardHostnames: string[];
    backgroundImageUrl: string;
    platform: ServerPlatform;
}