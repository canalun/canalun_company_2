import { fromFileUrl } from "std/path/mod.ts";

export function resolve(s: string): string {
  return fromFileUrl(new URL(s, import.meta.url));
}
