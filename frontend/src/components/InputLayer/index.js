import React, { useState } from "react";
import { detectTextEmotion } from "../api";

function InputLayer() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const handleDetect = async () => {
    const token = localStorage.getItem("token");
    if (!token) return setResult("Harus login");
    const res = await detectTextEmotion({ text }, token);
    setResult(res.data.emotion);
  };

  return (
    <div>
      <h3>Deteksi Emosi dari Teks</h3>
      <textarea value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleDetect}>Deteksi</button>
      <div>Hasil: {result}</div>
    </div>
  );
}
export default InputLayer;
