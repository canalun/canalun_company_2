export type Article = {
  language: "ja" | "en";
  category: Category[];
  title: string;
  link: string;
  date: Date;
};

export type Category =
  | "engineering"
  | "philosophy"
  | "debate"
  | "thoughts"
  | "typescript"
  | "javascript"
  | "serverside";

export const languageMap = new Map<Article["language"], string>([
  ["ja", "日本語"],
  ["en", "English"],
]);

export const categoryMap = new Map<
  Article["language"],
  Map<Category, string>
>([
  [
    "ja",
    new Map([
      ["engineering", "エンジニアリング"],
      ["typescript", "TypeScript"],
      ["javascript", "JavaScript"],
      ["serverside", "サーバーサイド"],
      ["debate", "ディベート"],
      ["philosophy", "思想"],
      ["thoughts", "雑感"],
    ]),
  ],
  [
    "en",
    new Map([
      ["engineering", "engineering"],
      ["typescript", "TypeScript"],
      ["javascript", "JavaScript"],
      ["serverside", "Server-Side"],
      ["debate", "debate"],
      ["philosophy", "philosophy"],
      ["thoughts", "thoughts"],
    ]),
  ],
]);
