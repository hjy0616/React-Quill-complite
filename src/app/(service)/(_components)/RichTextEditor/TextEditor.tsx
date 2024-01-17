"use client";
import React, { useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

import { uploadS3Image } from "@shared/utils/uploadS3";



const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");

    // eslint-disable-next-line react/display-name
    return ({ forwardedRef, ...props }: any) => (
      <RQ ref={forwardedRef} {...props} />
    );
  },
  {
    ssr: false,
  }
);
export default function RichTextEditorWithIframe({ value, onChange }) {
  const editorRef = useRef<any>();

    const handleImageUpload = async () => {
    const input = document.createElement("input");
    const quill = editorRef.current.getEditor();
    let fileInput = quill.root.querySelector("input.ql-image[type=file]");
    if (fileInput === null) {
      fileInput = document.createElement("input");
      fileInput.setAttribute("type", "file");
      fileInput.setAttribute("accept", "image/*");
      fileInput.classList.add("ql-image");

      fileInput.addEventListener("change", async () => {
        const files = fileInput.files;
        const range = quill.getSelection(true);

        if (!files || !files.length) {
          console.log("No files selected");
          return;
        }
        quill.enable(false);
        const uploadImageUrl = await uploadS3Image(files[0] as any, ["posts"]);

        quill.enable(true);
        quill.insertEmbed(range.index, "image", uploadImageUrl);
        quill.setSelection(range.index + 1);
        fileInput.value = "";
      });
      quill.root.appendChild(fileInput);
    }
    fileInput.click();
  };

  function YoutubeEmbedReplace(value){
        value = value.replace("youtube.com/watch?v=", "youtube.com/embed/");
        value = value.replace("youtube.com/v/", "youtube.com/embed/");
        return value;
  }

  function iframeHandler() {
    const quill = editorRef.current.getEditor();
    let value = prompt("Enter the iframe URL");
    if( value != "" ){
            value = YoutubeEmbedReplace(value);

            const range = quill.getSelection(true);
            quill.insertEmbed(range.index, 'video', value);
    }
  }
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          // [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
          ["bold", "italic", "underline", "strike"], // toggled buttons
          [{ header: 1 }, { header: 2 }], // custom button values
          [{ color: [] }, { background: [] }], // dropdown with defaults from theme

          ["blockquote", "code-block"],
          [{ list: "ordered" }, { list: "bullet" }],

          [{ indent: "-1" }, { indent: "+1" }], // outdent/indent

          [{ align: [] }],
          ["link", "image", "formula", "video"],

          // ['clean'], // remove formatting button
        ],
        handlers: {
          image: handleImageUpload,
          video: iframeHandler,
        },
      },
    }),
    []
  );

  return (
    // @ts-ignore
    <ReactQuill
      forwardedRef={editorRef}
      theme="snow"
      value={value}
      onChange={onChange}
      modules={modules}
      style={{
        height: "460px",
        width: "100%",
        border: 0,
      }}
    />
  );
}