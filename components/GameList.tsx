export function GameList(props: { fontSize: string }) {
  return (
    <ul
      style={{
        paddingLeft: "0",
        marginTop: "0",
        fontSize: `${props.fontSize}`,
      }}
    >
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
  );
}
