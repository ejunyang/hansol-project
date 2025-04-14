import { useSocketStore } from "@/store/useSocketStore";
import React from "react";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL;
export default function useWebSocket() {
  const ws = React.useRef<WebSocket | null>(null);
  const { setSocketData, setConnected } = useSocketStore();
  const reconnectTimeout = React.useRef<NodeJS.Timeout | null>(null);

  // 소켓 메세지는 훅에서 관리
  React.useEffect(() => {
    const connectWebSocket = () => {
      ws.current = new WebSocket(String(SOCKET_URL));

      ws.current.onopen = () => {
        console.log(`WebSocket 연결: ${SOCKET_URL}`);
        setConnected(true);
      };

      ws.current.onmessage = (e) => {
        if (!e.data) return;

        try {
          const firstData = JSON.parse(e.data);
          const parsedData =
            typeof firstData === "string" ? JSON.parse(firstData) : firstData;

          setSocketData(parsedData);
        } catch (error) {
          console.error("데이터 파싱 실패", error);
        }
      };

      ws.current.onerror = (error) => {
        console.error("WebSocket 에러:", error);
      };

      ws.current.onclose = (e) => {
        console.log("WebSocket 연결 종료", e.code);
        setConnected(false);

        // 10초 후 재연결 시도
        reconnectTimeout.current = setTimeout(() => connectWebSocket(), 10000);
      };
    };

    connectWebSocket();

    return () => {
      // 기존 WebSocket 연결 종료
      if (ws.current) {
        console.log(`${SOCKET_URL} WebSocket 연결 종료`);
        ws.current.onclose = null;
        ws.current.close(); // 닫기
      }

      if (reconnectTimeout.current) {
        clearTimeout(reconnectTimeout.current);
        reconnectTimeout.current = null;
      }
    };
  }, []);
}
