import { FFmpeg } from "@ffmpeg/ffmpeg";
import { useEffect, useRef, useState } from "react";

function App() {
  const [loaded, setLoaded] = useState(false);
  const ffmpegRef = useRef(new FFmpeg());
  const videoRef = useRef(null);
  const messageRef = useRef(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const baseURL = "http://localhost:5173/ffmpeg";
    const ffmpeg = ffmpegRef.current;
    ffmpeg.on("log", ({ message }) => {
      if (messageRef.current) messageRef.current.innerHTML = message;
    });
    await ffmpeg.load({
      coreURL: `${baseURL}/ffmpeg-core.js`,
      wasmURL: `${baseURL}/ffmpeg-core.wasm`,
    });
    setLoaded(true);
  };

  return loaded ? (
    <>
      <video ref={videoRef} controls></video>
      <p ref={messageRef}></p>
    </>
  ) : (
    <button onClick={load}>Load ffmpeg-core</button>
  );
}

export default App;
