// "use client";

// import "react-quill/dist/quill.snow.css";
// import { useMemo, useRef } from "react";
// // import AWS from "aws-sdk";
// import QuillNoSSRWrapper from "./quillEdit";

// interface props {
//   value: any;
//   onChange: any;
// }

// const REGION = process.env.NEXT_AWS_S3_BUCKET_REGION;
// const ACCESS_KEY = process.env.NEXT_AWS_S3_BUCKET_ACCESS_KEY_ID;
// const SECRET_ACCESS_KEY = process.env.NEXT_AWS_S3_BUCKET_SECRET_ACCESS_KEY;

// export default function QuillEditor({ value, onChange }: props) {
//   const quillRef = useRef<any>();

//   const imageHandler = async () => {
//     const input = document.createElement("input");
//     input.setAttribute("type", "file");
//     input.setAttribute("accept", "image/*");
//     input.click();
//     input.addEventListener("change", async () => {
//       //이미지를 담아 전송할 file을 만든다
//       const file = input.files?.[0];
//       try {
//         //업로드할 파일의 이름으로 Date 사용
//         const name = Date.now();
//         //생성한 s3 관련 설정들
//         AWS.config.update({
//           region: REGION,
//           accessKeyId: ACCESS_KEY,
//           secretAccessKey: SECRET_ACCESS_KEY,
//         });
//         //앞서 생성한 file을 담아 s3에 업로드하는 객체를 만든다
//         const upload = new AWS.S3.ManagedUpload({
//           params: {
//             ACL: "public-read",
//             Bucket: "test4342", //버킷 이름
//             Key: `upload/${name}`,
//             Body: file,
//           },
//         });
//         //이미지 업로드 후
//         //곧바로 업로드 된 이미지 url을 가져오기
//         const IMG_URL = await upload.promise().then((res) => res.Location);
//         //useRef를 사용해 에디터에 접근한 후
//         //에디터의 현재 커서 위치에 이미지 삽입
//         const editor = quillRef.current.getEditor();
//         const range = editor.getSelection();
//         // 가져온 위치에 이미지를 삽입한다
//         editor.insertEmbed(range.index, "image", IMG_URL);
//       } catch (error) {
//         console.log(error);
//       }
//     });
//   };

//   function iframeHandler() {
//     const quill = quillRef.current.getEditor();
//     const value = prompt("Enter the iframe URL");
//     const range = quill.getSelection(true);
//     quill.root.innerHTML += value;
//   }

//   const modules = useMemo(() => {
//     return {
//       toolbar: {
//         container: [
//           // [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
//           ["bold", "italic", "underline", "strike"], // toggled buttons
//           [{ header: 1 }, { header: 2 }], // custom button values
//           [{ color: [] }, { background: [] }], // dropdown with defaults from theme

//           ["blockquote", "code-block"],
//           [{ list: "ordered" }, { list: "bullet" }],

//           [{ indent: "-1" }, { indent: "+1" }], // outdent/indent

//           [{ align: [] }],
//           ["link", "image", "formula", "video"],
//         ],
//         handlers: {
//           image: imageHandler,
//           video: iframeHandler,
//         },
//       },
//     };
//   }, []);

//   const formats = [
//     "header",
//     "font",
//     "size",
//     "bold",
//     "italic",
//     "underline",
//     "strike",
//     "blockquote",
//     "list",
//     "bullet",
//     "indent",
//     "link",
//     "image",
//     "video",
//   ];

//   return (
//     <QuillNoSSRWrapper
//       modules={modules}
//       formats={formats}
//       theme="snow"
//       value={value}
//       forwardedRef={quillRef}
//       onChange={onChange}
//       style={{
//         height: "460px",
//         width: "100%",
//       }}
//     />
//   );
// }
