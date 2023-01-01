import { fromFileUrl } from "std/path/mod.ts";

export function resolvePath(s: string): string {
  return fromFileUrl(new URL(s, import.meta.url));
}
