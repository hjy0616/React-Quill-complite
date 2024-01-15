"use client";
import dynamic from "next/dynamic";
import React from "react";
import "react-quill/dist/quill.bubble.css";
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});
export default function TextEditorView({ content }) {
  return <ReactQuill value={content} readOnly={true} theme={"bubble"} />;
}
