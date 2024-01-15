import TextEditorView from "@root/src/app/(service)/(_components)/Textedit/quillviews";

export default function DetailPage() {
  const content = {
    content: "내용일수다.",
  };
  return (
    <div>
      <TextEditorView content={content.content} />
    </div>
  );
}
