---
title:        DOMDOMタイムス#15 canvas-based renderingとa11y。いま、そしてこれから
emoji:        🎨
type:         tech
topics:       ["dom", "javascript", "ブラウザ"]
published:    true
published_at: 2023-12-04 09:26
---

はい、DOMDOMタイムスです。知ってるよって？この挨拶は、まあ準備体操みたいなものなので。いつだって欠かさずやっていきます👶  
さて、今日はcanvas-based renderingとa11yの話です。[この前のJSConfセッション](https://jsconf.jp/2023/talk/canalun-1/)の最後のあたりで話したことと重複が大きいですが、面白がってくれる方が多かったので文章にしておこうと思いました。

(一応JSConfセッションの資料へのリンクも載せておきますね)
https://docs.google.com/presentation/d/1hjs2J4fScWcs42oJ11F9uv1iuSnb_25TEZxyJo6UlLU/edit?usp=sharing

# canvas-based renderingの波
canvas-based renderingという言葉は、この記事では「canvasをゴリゴリに使ってwebコンテンツをレンダリングすること」ってくらいの意味で使います。**通常のform要素やdiv要素ではなくて、canvas要素なんだぞっていうニュアンスです**。  
この言葉は一部のサイトでは見かけますが、まだどこかの機関や組織が公式に使っているわけではないと思います。少なくとも自分は知らないので、みんなが人前でこの言葉を使うときは慎重になったほうがいいかもしれないね！

さて「canvas-based renderingって言うけどそんなサイトあるかよ？？」って思われるかもしれません。  
これがまあ意外とあるんですね。例えばGoogle Docs。2021年にGoogleがcanvasで行くわ〜って言って以降、今日までガチでcanvasでがんばっています。当時のみんなの反応がHNでも見れますよ👶
https://news.ycombinator.com/item?id=27129858
![Google Docsのメインのエディターの部分がcanvas要素であることをDev Toolsで確かめている画像](/images/google_docs_canvas.png)

他にはGoogle Sheets(スプシ)もそうですよね。  
また、フレームワークで言うと、Reactと同じ書き味でcanvasアプリケーションを作れるkonvaがあったり、Flutter on the Webはcanvas-based renderingをサポートしています。

おいおい、**canvas-based renderingが思ったより来てるじゃないか**となった方もいるかもしれませんね。自分はなりました👶  
良さがなければ誰も使いたがらないわけですが、canvasレンダリングの良さというと大体は下記のような感じなのでしょうか？ちょっとここはあんまりちゃんと調べられていないので自信がありませんが、まあ一応書いておいてみます🐮
- パフォーマンスの良さ
- 操作の自由度
  - 例えばGoogle Docsのcanvas化に対するHN上の以下のコメントが示唆にとんでいます！改行は私が勝手に入れました。
  > Word processors have extremely specific requirements for layout, rendering, and incremental updates. I'll name just two examples.
  > First, to highlight a text selection in mixed left-to-right / right-to-left text, it's necessary to obtain extremely specific information regarding text layout; information that the DOM may not be set up to provide.
  > Second, to smoothly update as the user is typing text, it's often desirable to "cheat" the reflow process and focus on updating just the line of text containing the insertion point.
  > (Obviously browser engines support text selections, but they probably don't expose the underlying primitives the way a word processor would need. Similarly, they support incremental layout + rendering, but probably not specifically optimized in the precise way a word processor would need.)

実際、特に後者の観点はHixie氏による"Towards a modern Web stack"の中でも指摘されています。Hixie氏はもっと急進的に、wasmとかと組み合わせることでもっとwebを低レイヤに落としていこうやという話を展開しています。
https://docs.google.com/document/d/1peUSMsvFGvqD5yKh3GprskLC3KVdAlLGOsK6gFoEOD0/edit?usp=sharing&resourcekey=0-bPajpoo9IBZpG__-uCBE6w

このHixie氏の話はJxckさんが下記のポストでも扱っているのでぜひ読んでみて下さい📖
https://blog.jxck.io/entries/2023-11-27/hixie.html

このようにcanvas-based renderingは一部で使われ始め、明確なメリットもどうやらあるわけです。  
**もちろんすぐにこれが主流になる気はしないし、いつかこれが主流になるのか、サブストリームになるのかどうかさえもわかりません。ただまあ1つのトレンドとして存在することは確かです**👶  

```
const a = 0;
```

それに、WebXRがこれから本当にメインストリーム級になっていくならWebGLがもっともっと使われるようになるのでしょう。  

# じゃあa11yは？？
じゃあcanvas-based renderingのもとでa11yはどうなるのでしょうか？？  
DOMは、みなさんもご存知のようにバチバチにセマンティクスが定められておりDOMからAOMを構築することができます。  
![DOMツリーからAOMツリーが構築されることを説明したWICGによるイラストレーション](/images/DOM-a11y-tree.png)
*WICGドキュメントより(https://github.com/WICG/aom/blob/gh-pages/explainer.md#background-dom-tree-accessibility-tree-and-platform-accessibility-apis)*

一方で**canvasはただのpixelでしかないので、ブラウザはそこからAOMを構築することはできません**。そりゃそうだという感じです。  

実際、古くからcanvasのa11yは議論されており、基本的にはcanvasで高度にインタラクティブなコンテンツを作るべきではないという雰囲気があります。例えばW3Cのドキュメントなんかを掘るとそんな話が昔からされていることが分かるはずです。  
また、**canvas要素でテキスト編集を実装するのは本当に大変だからやめとけ**というようなことが下記のwhatwgドキュメントにも書いてあります。それでもGoogle Docsはやっているのですが……汗
https://html.spec.whatwg.org/multipage/canvas.html#best-practices

とは言え、それでもcanvasで作られるアプリケーションはあるわけで、**ここからはcanvas-based renderingのもとでa11yがどう担保されるかについて現状と将来の両方を見ていってみます！👶**  
(※下記で挙げていく解決策は排反ではないと思っています)

# a11y in canvas-based renderingの現状
## 現状の解決策1: canvas自体にARIAを設定する
canvas要素にaria-labelだったりroleだったりを設定しておく方法です。単純なコンテンツならこれでなんとかなりそうですね。下記のサイトの例がわかりやすいです。
https://pauljadam.com/demos/canvas.html#:~:text=not%20support%20canvas.-,Good%20example%3A%20Canvas%20element%20with%20accessible%20name%20and%20role%20via%20ARIA,-%3Ccanvas%20id%3D%22goodCanvas1

## 現状の解決策2: fallback contentを設定する
少し複雑なコンテンツになると、canvasにaria-labelやroleを設定するだけではキツくなりそうです。そこで**fallback content**です。  
canvasにはfallback contentと呼ばれる仕様があります。これはcanvasタグに挟んだ要素はAT(Assistive Technology)の関係などでcanvasが無効化されている時に表示されるよというモノです👶
> The <canvas> element, like the <img>, <video>, <audio>, and <picture> elements, must be made accessible by providing fallback text to be displayed when the media doesn't load or the user is unable to experience it as intended. You should always provide fallback content, captions, and alternative text, as appropriate for the media type.
> Providing fallback content is very straightforward: just insert the alternate content inside the <canvas> element to be accessed by screen readers, spiders, and other automated bots. Browsers, by default, will ignore the content inside the container, rendering the canvas normally unless <canvas> isn't supported.
> https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_usage#accessible_content

もう少しわかりやすい例をこちらで各自で見てみて下さい👀
https://pauljadam.com/demos/canvas.html#:~:text=OK%20example%3A%20Canvas%20element%20with%20text%20alternative%20via%20fallback%20content

## 現状の解決策3: DOMを作りこんでAOMを別途構成する
一方でfallback contentとかではなくて、**全然別でDOMを構成してcanvas内容に対応するAOMをブラウザに作らせることができます**。まさにFlutterがそれです。
完全にモノグサなのですが、前にtwitterで投稿した説明を貼っておきます。これを見て頂ければ分かるかと思います🐤
@[tweet](https://x.com/i_am_canalun/status/1723654802859802779)

tweet内でもリンクしている下記の記事を読んで頂ければ分かりますが、**Flutterは各コンポーネントにSemanticsを登録することができ、上のようなことも簡単にできるわけです**。すごいねえ👶
https://developers.cyberagent.co.jp/blog/archives/36573/

# a11y in canvas-based renderingのこれから
さて、これからの話に視点を移してみましょう👀  
**もちろんこれからどうなるという結論は出ないし、全てを解決する最強のソリューションが今あるわけではありません！**  
まあでも一旦どんなんがあるのかなということで！

## 未来の解決策1: AOMを開発者が直接さわれるようにする
**AOMを直接さわれるようにしちゃおうよ！という話があります。**

現状、AOMを作るためには、DOMを通じてブラウザにAOMを作ってもらうしかないのでFlutterも先ほど紹介したようなやり方をやっているわけです。  
**そこで、「AOMを開発者が直接さわれちゃえばよくない！？」という発想が出てきます**。実際、canvas-based rendering推しのHixie氏も先ほど紹介したドキュメント内で"An ARIA-based ABI to describe the current accessibility tree"を提案しています(Wasmの話なのでAPIではなくてABIです)。  
![開発者がcanvasでコンテンツをレンダリングし、AOMをAPIで作るというフローの図解](/images/aom_and_canvas_world.png)
*こんな世界なんだろうね*

ただ、**この発想は現時点ではそこまで優勢ではありません**。というのも、**まさにこのアイデアが過去に`Virtual Accessibility Nodes`という名の仕様として議論され、プライバシーの問題を招くとして現在は一時停止になっています**。  
https://github.com/WICG/aom/blob/gh-pages/explainer.md#speculative-blocked-virtual-accessibility-nodes

止まった理由の具体的な内容は、**AOMの自由度を高めることはユーザーがATを使用しているかという重要なプライバシー情報の詮索を開発者に可能にさせてしまう恐れがある**というものです。  
どう詮索できるのかについてはここに直接載せるのも微妙かなと思うので、興味のある方は下記の議論を追ってみて下さい👶
https://github.com/w3ctag/design-principles/issues/293

## 未来の解決策2: `hit region`を使えるようにする
これはcanvasにおけるa11yの問題を全て解決するわけではありませんが、個人的に重要な気がする提案なので紹介しておいてみます。
https://github.com/whatwg/html/issues/3407

上記のissueにて、`hit region`なる**canvasの一部の領域をインタラクティブな領域であるとして要素に結びつけることができる仕様**が現在検討されています(**議論の勢いはわからないので、実際にはほとんど議論が動いていない仕様である可能性もあります！**)。

これがなんなのか理解するために、canvasで発生しがちな問題について説明させて下さい👶  
canvas上のある領域でクリックされたときに特定のアクションを起こすアプリケーションを作るとします。例えばcanvasに描かれたりんごをDnDできるというようなイメージ🍎  
**ありがちな実装はcanvas要素そのものにclickイベントリスナーを仕掛けて、そのclickの座標をりんごの位置と照らし合わせて処理をするということになります**。  
しかし、それでは**キーボードを利用しているユーザーはどうするのよ**という話になってしまいますね。**タブキーで移動してもフォーカスは良くてcanvas要素全体にあたるわけで、その中のどの領域をクリックするとかは開発側の工夫なしでは制御できません**。  

そこで`hit region`です。これは**canvasの一部の領域をインタラクティブな領域であるとして要素に結びつけることができる仕様**なので、りんごの領域を`hit region`として登録すればOKというわけです。canvasの一部が文字入力欄になっているならinput要素と結びつけて登録するのもありです。

:::message
まだ`hit region`の仕様自体が上記issueで議論され始まったくらいなので、今後全然違う感じに転がっていったらそのときは「なんかあいつが言ってたのとは違う感じになったな……」と思ってください👶
:::

実は一昔前にもcanvasに`addHitRegion`というだいたい同じような仕様があったのですが、それは有用性がないと判断されて一旦仕様から削除されています。
https://github.com/whatwg/html/pull/1942

ChromeやFirefoxでも昔は使えたのにいまではexperimentalとしてすらも使えない感じがあります(このあたり間違ってたら教えてください！)。  
当時まだ扱えたころのやり方を解説しているのだろうサイトを見ると、イメージが膨らみやすいです。例えば下記。
https://kuroeveryday.blogspot.com/2019/04/how-to-detect-click-on-shape-on-canvas.html

実はこの`hit region`の議論を追うと分かりますが、もともとは先ほど紹介した`Virtual Accessibility Nodes`を使えばよくね？という雰囲気になっていました。しかし、**それがプライバシーの問題から難しくなったため、今後もしかしたら`hit region`の議論はガチみを帯びてくる可能性があるなと思います**。もちろん勝手な予想ですよ！  
ただ、もとのissueを読んでもらえばわかるように、**webGLまで合わせて考えた時に三次元だとどうすんねん**とか、**イベントのバブリングはcanvasでも起きるんですかね**とか、なんかもうとにかく色々検討すべきポイントがあるようです。けっこう大変そうですね汗

# さてさて
canvas-based renderingの現状、そしてそれにまつわるa11yの現状と今後を見てみました。  
この領域からはまだまだ発展途上感を自分は受け取っています。課題が山積みである一方、なんだか夢のある話でもある気がしていて、みんなも興味があったらぜひウォッチしていってほしいです👶そして面白い話があったら教えてほしいです！  

記事を書いていて思いましたが、**遠い遠い未来では、もしかしたらAIの利用もありうるなと思います**。要するに、canvasだったとしてもAIがそれを解析してAOMを作っちゃうみたいな。なんかそんなこと言ってる人が冒頭で紹介したHNにもいた気がします。  
**イメージ的にはEdgeのaltテキスト自動生成が近いんですかね**。あれが既に実現しているので、ああいうのが他領域にも広がっていくなら面白いなと思います。

それじゃあ今日はここまで！👋