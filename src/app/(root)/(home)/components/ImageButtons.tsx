import { Button } from "@/components/ui/button";
import React from "react";

interface ButtonPropType {
  selectedButton: string;
  setSelectedButton: React.Dispatch<React.SetStateAction<string>>;
  hasHeatmap: boolean;
}

export default function ImageButtons(props: ButtonPropType) {
  const { selectedButton, setSelectedButton, hasHeatmap } = props;
  return (
    <div className="border border-border-primary rounded-xl flex p-1 gap-1">
      <Button
        className={`p-1 px-3 h-auto ${
          selectedButton === "판독 이미지" ? "bg-bg-alt" : "text-text-disable"
        }`}
        onClick={() => setSelectedButton("판독 이미지")}
        disabled={!hasHeatmap} // heatmap_path 없는 경우 판독 이미지 비활성화
      >
        판독 이미지
      </Button>
      <Button
        className={`p-1 px-3 h-auto ${
          selectedButton === "원본 이미지" ? "bg-bg-alt" : "text-text-disable"
        }`}
        onClick={() => setSelectedButton("원본 이미지")}
      >
        원본 이미지
      </Button>
    </div>
  );
}
