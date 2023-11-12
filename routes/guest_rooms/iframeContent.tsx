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
        width={"100vw"}
        height={"100vh"}
        alt="alpaca"
        src="/CEOs/alpaca.jpeg"
      />
      <img
        width={"100vw"}
        height={"100vh"}
        alt="boy"
        src="/CEOs/boy.jpeg"
      />
      <img
        width={"100vw"}
        height={"100vh"}
        alt="goat"
        src="/CEOs/goat.jpeg"
      />
    </>
  );
}
