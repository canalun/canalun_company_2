import { Handlers } from "$fresh/server.ts";
import MagicFrame from "@/islands/MagicFrame.tsx";

export const handler: Handlers = {
  GET(_, ctx) {
    return ctx.render();
  },
};

export default function EspionageMagicFrame() {
  return (
    <>
      <iframe src="/posts"></iframe>
      <MagicFrame src="/posts"></MagicFrame>
    </>
  );
}
