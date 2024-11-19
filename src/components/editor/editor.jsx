import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function EditorComponent({value, handler}) {
  const editorRef = useRef();
   const [currentValue, setCurrentValue] = useState(value);
 
  return (
    <Editor
      apiKey="gughuoqlfnh5qtrwzs5lzh6ekrwbflti9xkn9thzbyd33i3q"
      onInit={(evt, editor) => (editorRef.current = editor)}
      onEditorChange={(content) =>{
        handler(content);
        setCurrentValue(content);
      }}
      value={currentValue}
      init={{
        plugins:
          "image links table save autosave template anchor wordcount code emoticons autolink visualblocks",
        toolbar:
          "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
       
      }}
    />
  );
}
