import ImageComponent from "@/components/common/Image";
import { Button } from "@/components/ui/button";
import React from "react";

interface PropsType {
  onClose: (open: boolean) => void;
  image: string;
}

export default function AddFailedArea({ onClose, image }: PropsType) {
  // 드래그 시작 위치
  const [startPos, setStartPos] = React.useState<{
    x: number;
    y: number;
  } | null>(null);
  // 드래그 종료 위치
  const [endPos, setEndPos] = React.useState<{ x: number; y: number } | null>(
    null
  );
  // 드래그된 영역
  const [selectedAreas, setSelectedAreas] = React.useState<
    { x: number; y: number; width: number; height: number }[]
  >([]);
  const [dragging, setDragging] = React.useState(false); // 드래그 중인지 여부
  const imageRef = React.useRef<HTMLDivElement>(null); // 이미지 크기 및 위치

  console.log(selectedAreas);

  // 드래그 시작
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!imageRef.current) return;
    e.stopPropagation();
    // 선택된 요소 찾기
    const rect = imageRef.current.getBoundingClientRect();
    setStartPos({
      // 현재 위치 설정
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setDragging(true); // 드래그 중
  };

  // 드래그 중
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging || !startPos || !imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setEndPos({ x, y }); // 마우스 움직일 때마다 종료 지점 업데이트
  };

  // 드래그 종료
  const handleMouseUp = () => {
    if (!startPos || !endPos) return;
    const newArea = {
      x: Math.min(startPos.x, endPos.x),
      y: Math.min(startPos.y, endPos.y),
      width: Math.abs(startPos.x - endPos.x), // 절댓값 반환
      height: Math.abs(startPos.y - endPos.y),
    };

    setSelectedAreas([...selectedAreas, newArea]);
    setStartPos(null);
    setEndPos(null);
    setDragging(false);
  };

  // 드래그 영역 삭제
  const handleDragAreaDelete = (e: React.MouseEvent, idx: number) => {
    e.stopPropagation();
    setSelectedAreas(selectedAreas.filter((_, i) => i !== idx));
  };

  return (
    <div className="flex flex-col gap-8">
      <div
        ref={imageRef}
        className="relative w-full max-h-[40rem] overflow-hidden cursor-crosshair"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <ImageComponent url={image} />

        {/* 저장된 모든 드래그 영역 표시 */}
        {selectedAreas.map((area, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              left: area.x,
              top: area.y,
              width: area.width,
              height: area.height,
              border: "2px solid #F04438",
              borderRadius: "8px",
            }}
          >
            <span className="bg-error-500 px-2 absolute top-0 left-0 rounded-br-lg text-[17px] font-semibold">
              {index + 1 < 10 ? `0${index + 1}` : index + 1}
            </span>
            <Button
              onClick={(e) => handleDragAreaDelete(e, index)}
              onMouseDown={(e) => e.stopPropagation()} // 삭제 버튼 시 드래그 시작 이벤트 버블링 방지
              className="bg-error-500 h-auto p-1 z-10 rounded-none absolute top-0 right-0 rounded-bl-lg text-[17px] font-bold"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.99967 11.1668L5.91634 15.2502C5.76356 15.4029 5.56912 15.4793 5.33301 15.4793C5.0969 15.4793 4.90245 15.4029 4.74967 15.2502C4.5969 15.0974 4.52051 14.9029 4.52051 14.6668C4.52051 14.4307 4.5969 14.2363 4.74967 14.0835L8.83301 10.0002L4.74967 5.91683C4.5969 5.76405 4.52051 5.56961 4.52051 5.3335C4.52051 5.09739 4.5969 4.90294 4.74967 4.75016C4.90245 4.59738 5.0969 4.521 5.33301 4.521C5.56912 4.521 5.76356 4.59738 5.91634 4.75016L9.99967 8.8335L14.083 4.75016C14.2358 4.59738 14.4302 4.521 14.6663 4.521C14.9025 4.521 15.0969 4.59738 15.2497 4.75016C15.4025 4.90294 15.4788 5.09739 15.4788 5.3335C15.4788 5.56961 15.4025 5.76405 15.2497 5.91683L11.1663 10.0002L15.2497 14.0835C15.4025 14.2363 15.4788 14.4307 15.4788 14.6668C15.4788 14.9029 15.4025 15.0974 15.2497 15.2502C15.0969 15.4029 14.9025 15.4793 14.6663 15.4793C14.4302 15.4793 14.2358 15.4029 14.083 15.2502L9.99967 11.1668Z"
                  fill="white"
                />
              </svg>
            </Button>
          </div>
        ))}

        {/* 현재 드래그 중인 영역 표시 */}
        {startPos && endPos && (
          <div
            style={{
              position: "absolute",
              left: Math.min(startPos.x, endPos.x),
              top: Math.min(startPos.y, endPos.y),
              width: Math.abs(startPos.x - endPos.x),
              height: Math.abs(startPos.y - endPos.y),
              border: "2px solid #F04438",
              borderRadius: "8px",
            }}
          />
        )}
      </div>
      <div className="flex gap-3 justify-end">
        <Button variant={"outline"} onClick={() => onClose(false)}>
          취소
        </Button>
        <Button
          variant={selectedAreas.length > 0 ? "activate" : "disabled"}
          type="submit"
        >
          불합격 영역 추가하기
        </Button>
      </div>
    </div>
  );
}
