import { Head } from "$fresh/runtime.ts";

export default function reverseGamePage() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>青色にしちゃえゲーム</title>
      </Head>
      <body>
        <h1>青色にしちゃえゲーム</h1>
        <p id="rule">
          犬に負けずにボタンを押して全部青色にしてね！(音量注意！)
        </p>
        <script src="/reverseGame/reverseGame.js"></script>
      </body>
    </>
  );
}
