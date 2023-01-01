export type Article = {
  language: "ja" | "en";
  category: "engineering" | "philosophy" | "debate" | "thoughts";
  title: string;
  link: string;
  date: Date;
};

export const languageMap = new Map<Article["language"], string>([
  ["ja", "日本語"],
  ["en", "English"],
]);

export const categoryMap = new Map<
  Article["language"],
  Map<Article["category"], string>
>([
  [
    "ja",
    new Map([
      ["engineering", "エンジニアリング"],
      ["debate", "ディベート"],
      ["philosophy", "思想"],
      ["thoughts", "雑感"],
    ]),
  ],
  [
    "en",
    new Map([
      ["engineering", "engineering"],
      ["debate", "debate"],
      ["philosophy", "philosophy"],
      ["thoughts", "thoughts"],
    ]),
  ],
]);
