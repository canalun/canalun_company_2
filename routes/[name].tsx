import { PageProps } from "$fresh/server.ts";

export default function Greet(props: PageProps) {
  const { name } = props.params;
  return (
    <>
      <div>Hello {name}</div>
      <div>and {props.url}</div>
    </>
  );
}
