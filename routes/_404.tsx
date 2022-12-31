import { Head } from "https://deno.land/x/fresh@1.1.2/runtime.ts";

export default function NotFoundPage() {
  const width = 395;
  const height = 395;
  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>404</title>
        <link rel="stylesheet" href="/stackeditStyle.css" />
      </Head>
      <body class="stackedit">
        <div class="stackedit__html">
          <p>
            <em>
              <strong>SORRY, we couldn’t find that page…</strong>
            </em>
          </p>
          <img
            width={width}
            height={height}
            alt="404 fairy"
            src="/404.jpeg"
          />
          <p>
            <a href="/">go back to TOP</a>
          </p>
        </div>
      </body>
    </>
  );
}
