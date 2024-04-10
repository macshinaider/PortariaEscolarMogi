"use client";
import { socket } from "@/utils/socket.io/socket";
import { useEffect, useState } from "react";

export default function SocketTest() {
  const [socketInstance] = useState(socket());

  useEffect(() => {
    socketInstance.on("mensagem", (mensagem) => {
      console.log("Mensagem recebida", mensagem);
    });
  }, []);

  return (
    <div>
      <button className="">Teste</button>
    </div>
  );
}
