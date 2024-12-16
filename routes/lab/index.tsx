import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  GET(_, ctx) {
    return ctx.render();
  },
};

export default function EspionageMagicFrame() {
  return (
    <>
      <a href="lab/espionageMagicFrame">espionage frame</a>
    </>
  );
}
