"use client";
import { useState, useRef } from "react";
import { TextField } from "@radix-ui/themes";
import RichTextEditorWithIframe from "@root/src/app/(service)/(_components)/RichTextEditor/TextEditor";

export default function CreateBoardsPage() {
  const [value, setValue] = useState();
  const onSubmit = () => {};
  return (
    <form onSubmit={onSubmit}>
      <div>CreateBoardsPage</div>
      <TextField.Root className="space-y-2">
        <TextField.Input placeholder="title" className="rounded-md w-full" />
      </TextField.Root>
      <RichTextEditorWithIframe value={setValue} onChange={value} />
      <div className="mt-20">
        <button className="btn">완료</button>
      </div>
    </form>
  );
}
