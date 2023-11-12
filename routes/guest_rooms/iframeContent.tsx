export default function iframeContent() {
  // this page is demo, and it has a lot of div, p, a, img tags.
  return (
    <>
      <h3>IframeContent</h3>
      <p>
        <em>
          <strong>This is in Iframe</strong>
        </em>
      </p>
      <img
        width={120}
        height={120}
        alt="alpaca"
        src="/CEOs/alpaca.jpeg"
      />
      <img
        width={100}
        height={100}
        alt="boy"
        src="/CEOs/boy.jpeg"
      />
      <img
        width={140}
        height={140}
        alt="goat"
        src="/CEOs/goat.jpeg"
      />
      <div>
        <p>This is in Iframe</p>
        <div>
          <img
            width={120}
            height={120}
            alt="cat in the box"
            src="/CEOs/cat_in_the_box.jpeg"
          />
          <img
            width={150}
            height={150}
            alt="cat doing dj"
            src="/CEOs/dj_cat.jpg"
          />
        </div>
        <p>This is in Iframe</p>
        <p>This is in Iframe</p>
      </div>
      <p>
        <a href="/">Link</a>
      </p>
    </>
  );
}
