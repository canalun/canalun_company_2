import { Head } from "$fresh/runtime.ts";
import { Dog } from "@/components/AA.tsx";
import { CeoImg } from "@/components/CeoImg.tsx";
import { ReadingList } from "@/components/ReadingList.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Article } from "@/types/Articles.ts";
import { getArticles } from "@/utils/getArticles.ts";

export const handler: Handlers = {
  async GET(_, ctx) {
    const articles = await getArticles();
    return ctx.render(articles);
  },
};

export default function Index({ data: article }: PageProps<Article[]>) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Canalun Company</title>
        <link rel="stylesheet" href="/stackeditStyle.css" />
      </Head>
      <body class="stackedit">
        <div class="stackedit__left">
          <div class="stackedit__toc">
            <ul>
              <li>
                <a href="#welcome-to-canalun-company">
                  Welcome to Canalun Company!
                </a>
                <ul>
                  <li>
                    <a href="#ceos">Our CEO</a>
                  </li>
                  <li>
                    <a href="#values">Our Values</a>
                  </li>
                  <li>
                    <a href="#business">Our business</a>
                    <ul>
                      <li>
                        <a href="#articles">- Articles</a>
                      </li>
                      <li>
                        <a href="#guest-rooms">- Guest rooms</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div class="stackedit__right">
          <div class="stackedit__html">
            <h1 id="welcome-to-canalun-company">Welcome to Canalun Company!</h1>
            <h2 id="ceos">One of our BRILLIANT CEOs</h2>
            <CeoImg />
            <h2 id="values">GREAT Values</h2>
            <ul>
              <li>Go to bed when feeling sleepy</li>
              <li>Don’t go with strangers</li>
            </ul>
            <h2 id="business">BIG business</h2>
            <h3 id="articles">SUPER articles</h3>
            <ReadingList articles={article} />
            <h3 id="musics">SUPER MUSIC</h3>
            <iframe
              width="100%"
              height="300"
              scrolling="no"
              frameBorder="no"
              allow="autoplay"
              src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1547544679&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
            />
            <h3 id="guest-rooms">SUPER NICE guest rooms</h3>
            <ul>
              <li>
                <a href="/guest_rooms/oshiriGame">
                  <strong>oshiri katori</strong>
                </a>: for those who want summer chill feeling...!
              </li>
              <li>
                <a href="/guest_rooms/reverseGame">
                  <strong>reverse game</strong>
                </a>: irritating puzzle
              </li>
              <li>
                <a href="./guest_rooms/hotel/index.html">
                  <strong>hotel</strong>
                </a>: for those who like riddles…
                <strong>
                  <span style="color:red;">[temporary closing]</span>
                </strong>
              </li>
            </ul>
            <Dog />
          </div>
        </div>
      </body>
    </>
  );
}
