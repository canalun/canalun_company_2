export function GameList(props: { fontSize: string }) {
  return (
    <div style={{ lineHeight: "1.2em", fontSize: `${props.fontSize}` }}>
      <ul
        style={{
          paddingLeft: "0",
        }}
      >
        <li
          style={{
            "list-style": "none",
            marginBottom: "10px",
          }}
        >
          <a href="/guest_rooms/oshiriGame">
            <strong>oshiri katori</strong>
          </a>
          : for those who want summer chill feeling...!
        </li>
        <li
          style={{
            "list-style": "none",
            marginBottom: "10px",
          }}
        >
          <a href="/guest_rooms/reverseGame">
            <strong>reverse game</strong>
          </a>
          : irritating puzzle
        </li>
        <li
          style={{
            "list-style": "none",
            marginBottom: "10px",
          }}
        >
          <a href="/guest_rooms/brickBlockAnywhere">
            <strong>brick-block-anywhere(DEMO)</strong>
          </a>
          : legendary brick-block game for those who love DOM
        </li>
        <li
          style={{
            "list-style": "none",
            marginBottom: "10px",
          }}
        >
          <a href="./guest_rooms/hotel/index.html">
            <strong>hotel</strong>
          </a>
          : for those who like riddles…
          <strong>
            <span style="color:red;">[temporary closing]</span>
          </strong>
        </li>
      </ul>
    </div>
  );
}
