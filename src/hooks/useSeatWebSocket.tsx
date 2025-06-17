// hooks/useSeatWebSocket.tsx
import { useEffect, useRef, useCallback } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

interface SeatSelectionMessage {
  matchId: number;
  row: string;
  seatIndex: number;
  status: "selected" | "available";
  userId: number;
  selectedUntil?: string;
}

export const useSeatWebSocket = (
  matchId: number, 
  onSeatUpdate: (message: SeatSelectionMessage) => void,
  currentlySelectedKey: string | null,
  userId: number | undefined
) => {
  const clientRef = useRef<Client | null>(null);

  const sendSeatSelection = useCallback((
    row: string, 
    seatIndex: number, 
    status: "selected" | "available" | "reserved", 
    userId: number
  ) => {
    if (clientRef.current?.connected) {
      clientRef.current.publish({
        destination: "/app/select",
        body: JSON.stringify({ 
          matchId, 
          row, 
          seatIndex, 
          status, 
          userId 
        }),
      });
    }
  }, [matchId]);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        //console.log("Connected to WebSocket");
        client.subscribe(`/topic/seats/${matchId}`, (msg) => {
          try {
            const body: SeatSelectionMessage = JSON.parse(msg.body);
           // console.log("Received WebSocket message:", body);
            onSeatUpdate(body);
          } catch (error) {
           // console.error("Error parsing WebSocket message:", error);
          }
        });
      },
      onDisconnect: () => {
        //console.log("WebSocket disconnected");
      },
      onStompError: (frame) => {
       // console.error("STOMP error:", frame);
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
     // console.log("Cleaning up WebSocket");
      if (clientRef.current?.active) {
        clientRef.current.deactivate();
      }
    };
  }, [matchId, onSeatUpdate]);

  useEffect(() => {
    return () => {
      if (currentlySelectedKey && userId) {
        const [row, seatIndex] = currentlySelectedKey.split('-');
        sendSeatSelection(row, parseInt(seatIndex), "available", userId);
      }
    };
  }, [currentlySelectedKey, userId, sendSeatSelection]);

  return {
    sendSeatSelection,
  };
};