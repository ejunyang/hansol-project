"use client";
import React from "react";
import ImageDetailModal from "../container/ImageDetailModal";
import SideCamera from "./SideCamera";
import { useModalStore } from "@/store/useModalStore";
import { useSocketStore } from "@/store/useSocketStore";

export default function DetectImage() {
  const { selectedImage } = useModalStore();
  const { socketData: message } = useSocketStore();
  // console.log("현재 연결상태", isConnected);
  // console.log("소켓 데이터", message);

  const sideData = [
    { sideLabel: "측면 A", cameraId: ["0", "1"], subCamera: "Camera A" },
    { sideLabel: "측면 B", cameraId: ["2", "3"], subCamera: "Camera B" },
    { sideLabel: "측면 C", cameraId: ["4", "5"], subCamera: "Camera C" },
    { sideLabel: "측면 D", cameraId: ["6", "7"], subCamera: "Camera D" },
  ];

  return (
    <div className="flex w-full gap-5 h-full">
      {sideData.map((data, idx) => (
        <SideCamera
          key={idx}
          message={message}
          sideLabel={data.sideLabel}
          cameraIds={data.cameraId}
          subCamera={data.subCamera}
        />
      ))}

      {selectedImage && <ImageDetailModal message={message} />}
    </div>
  );
}
