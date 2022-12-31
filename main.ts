/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { start } from "$fresh/server.ts";
import manifest from "@/fresh.gen.ts";

// TODO: ここにエントリーのキャッシュデータの更新ロジック仕込む
//import { cron } from "deno_cron/cron.ts";
// cron("*/5 * * * * *", () => {
//   console.log("5sec");
// });

await start(manifest, { port: 8100 });
