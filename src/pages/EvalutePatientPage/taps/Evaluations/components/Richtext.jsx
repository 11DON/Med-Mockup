import DOMPurify from "dompurify";

export default function RichText({ html }) {
  return (
    <div
      className="ql-editor"
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }}
    />
  );
}