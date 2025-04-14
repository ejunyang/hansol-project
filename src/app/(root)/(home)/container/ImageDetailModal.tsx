"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ImageComponent from "@/components/common/Image";
import { useModalStore } from "@/store/useModalStore";
import ImageSelect from "../components/ImageSelect";
import { CarouselApi } from "@/components/ui/carousel";
import { SocketDataType } from "@/type/DetectType";
import Image from "next/image";
import ImageCarousel from "../components/ImageCarousel";
import ImageButtons from "../components/ImageButtons";

interface PropsType {
  message: SocketDataType | null;
}

export default function ImageDetailModal(props: PropsType) {
  const { message } = props;
  const { selectedImage: imageUrl, setSelectedImage } = useModalStore();
  const [api, setApi] = React.useState<CarouselApi>(); // 캐러셀 api
  const [activeIndex, setActiveIndex] = React.useState(0); // 캐러셀 next, prev

  const imageData = Object.entries(message?.product_info?.images ?? {}).flatMap(
    ([key, images]) =>
      images.map((item) => ({
        ...item,
        unique_id: `${key}-${item.image_num}`, // 각 키 값 + image_num
      }))
  );

  // heatmap_path가 없는 경우 판독 이미지 버튼 비활성화
  const hasHeatmap = imageData.some((item) => item.heatmap_path);
  const [selectedButton, setSelectedButton] = React.useState(
    hasHeatmap ? "판독 이미지" : "원본 이미지"
  );

  // 선택한 버튼에 따라 이미지 데이터 변경
  const filteredImages = imageData.map((item) =>
    selectedButton === "판독 이미지"
      ? item.heatmap_thumbnail
      : item.image_thumbnail
  );

  const filteredPaths = imageData?.map((item) =>
    selectedButton === "판독 이미지" ? item.heatmap_path : item.image_path
  );
  // .filter(Boolean)
  // .map((path) =>
  //   path.replaceAll(
  //     "/Users/mt6/Documents/한솔PNS/hansol20250318/",
  //     "/images/hansol20250318/"
  //   )
  // );

  const handleImageChange = (uniqueId: string) => {
    const index = imageData.findIndex((item) => item.unique_id === uniqueId);
    if (api && index !== -1) {
      api.scrollTo(index, true); // 선택한 이미지로 바로 이동
      setActiveIndex(index);
    }
  };

  // 모달 열릴 때 선택한 이미지로 이동
  React.useEffect(() => {
    if (!api || !imageUrl || imageData.length === 0) return;

    const selectedItem = imageData.find(
      // (item) =>
      //   item.image_thumbnail === imageUrl?.image_thumbnail &&
      //   item.image_num === imageUrl.image_num
      (item) => item.unique_id === imageUrl?.unique_id
    );
    if (!selectedItem) return;

    const selectedIndex = imageData.findIndex(
      (item) => item.unique_id === selectedItem.unique_id
    );

    if (selectedIndex !== -1) {
      api?.scrollTo(selectedIndex, true); // 선택한 이미지로 바로 이동
      setActiveIndex(selectedIndex);
    }

    api?.on("select", () => {
      setActiveIndex(api.selectedScrollSnap());
    });

    return () => {
      api?.off("select", () => {
        setActiveIndex(api.selectedScrollSnap());
      });
    };
  }, [api, imageUrl]);

  return (
    <Dialog
      open={!!imageUrl}
      onOpenChange={(open) => {
        if (!open) setSelectedImage(undefined);
      }}
    >
      <DialogContent className="max-w-5xl overflow-hidden">
        <div className="w-full mx-auto flex flex-col gap-6">
          <DialogHeader>
            <div className="flex justify-between items-center">
              <DialogTitle>이미지 자세히 보기</DialogTitle>

              {/* 판독이미지 | 원본이미지 */}
              <ImageButtons
                selectedButton={selectedButton}
                setSelectedButton={setSelectedButton}
                hasHeatmap={hasHeatmap}
              />
            </div>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <>
            {/* 이미지 썸네일 리스트 + 캐러셀 페이지네이션 */}
            <div className="grid grid-cols-[repeat(16,minmax(0,1fr))] gap-2">
              {imageData.length > 0
                ? imageData.map((data, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div
                        className="relative flex-1 hover:cursor-pointer border rounded-sm"
                        onClick={() => handleImageChange(data.unique_id)}
                      >
                        {activeIndex === idx && (
                          <p className="absolute top-0 left-0 w-full h-full z-50 flex justify-center items-center bg-selectedBox border rounded-sm">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M7.06659 9.20016L5.63325 7.76683C5.51103 7.64461 5.35547 7.5835 5.16659 7.5835C4.9777 7.5835 4.82214 7.64461 4.69992 7.76683C4.5777 7.88905 4.51659 8.04461 4.51659 8.2335C4.51659 8.42239 4.5777 8.57794 4.69992 8.70016L6.59992 10.6002C6.73325 10.7335 6.88881 10.8002 7.06659 10.8002C7.24436 10.8002 7.39992 10.7335 7.53325 10.6002L11.2999 6.8335C11.4221 6.71127 11.4833 6.55572 11.4833 6.36683C11.4833 6.17794 11.4221 6.02239 11.2999 5.90016C11.1777 5.77794 11.0221 5.71683 10.8333 5.71683C10.6444 5.71683 10.4888 5.77794 10.3666 5.90016L7.06659 9.20016Z"
                                fill="white"
                              />
                            </svg>
                          </p>
                        )}
                        {/* 썸네일 이미지 */}
                        <ImageComponent
                          url={filteredImages[idx]}
                          onClick={() => handleImageChange(data.unique_id)}
                        />
                      </div>
                    </div>
                  ))
                : Array.from({ length: 32 }).map((_, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="relative flex-1 border rounded-sm">
                        <Image
                          src={
                            process.env.NODE_ENV === "production"
                              ? "./images/basic.png"
                              : "/images/basic.png"
                          }
                          width={100}
                          height={100}
                          alt="default"
                          className="w-full h-full"
                          style={{ aspectRatio: "2/1" }}
                        />
                      </div>
                    </div>
                  ))}
            </div>

            {/* 셀렉트 박스 */}
            <ImageSelect
              data={imageData.length > 0 ? imageData : []}
              onSelect={handleImageChange}
              selectValue={
                imageData.length > 0 ? imageData[activeIndex]?.unique_id : ""
              }
            />

            {/* 캐러셀 */}
            <ImageCarousel
              setApi={setApi}
              filteredPaths={filteredPaths}
              blurDataList={filteredImages}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  닫기
                </Button>
              </DialogClose>
            </DialogFooter>
          </>
        </div>
      </DialogContent>
    </Dialog>
  );
}
