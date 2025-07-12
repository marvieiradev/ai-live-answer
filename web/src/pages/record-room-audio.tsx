import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";

const isRecordingSupported =
  !!navigator.mediaDevices &&
  typeof navigator.mediaDevices.getUserMedia === "function" &&
  typeof window.MediaRecorder === "function";

export function RecordRoomAudio() {
  const [isRecording, setIsRecording] = useState(false);
  const recorder = useRef<MediaRecorder | null>(null);

  function stopRecording() {
    setIsRecording(false);

    if (recorder.current && recorder.current.state !== "inactive") {
      recorder.current.stop();
    }
  }

  async function startRecording() {
    if (!isRecordingSupported) {
      alert("Seu navegador não supoorta gravação!");
      return;
    }
    setIsRecording(true);

    const audio = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44_100,
      },
    });

    recorder.current = new MediaRecorder(audio, {
      mimeType: "audio/webm",
      audioBitsPerSecond: 64_000,
    });

    recorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        console.log(event.data);
      }
    };

    recorder.current.onstart = () => {
      console.log("Gravação iniciada");
    };

    recorder.current.onstop = () => {
      console.log("Gravação encerrada");
    };

    recorder.current.start();
  }

  return (
    <div className="flex flex-col gap-3 h-screen items-center justify-center">
      {isRecording ? (
        <Button onClick={stopRecording}>Parar Gravação</Button>
      ) : (
        <Button onClick={startRecording}>Gravar Áudio</Button>
      )}

      {isRecording ? <p>Gravando...</p> : <p>&nbsp;</p>}
    </div>
  );
}
