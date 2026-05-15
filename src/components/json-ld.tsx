type Props = {
  id: string;
  data: unknown;
};

// Escape any closing-script sequences to keep the JSON safely inside a
// <script> tag. JSON has no HTML semantics so this is the only thing that
// could prematurely terminate the script element.
function safeJson(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function JsonLd({ id, data }: Props) {
  return (
    <script
      id={id}
      type="application/ld+json"
      // Safe: the payload comes from server-side constants and is JSON
      // with all `<` escaped to its Unicode form.
      dangerouslySetInnerHTML={{ __html: safeJson(data) }}
    />
  );
}
