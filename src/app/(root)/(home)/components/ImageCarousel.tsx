import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Base64Image } from "@/data/data";
import Image from "next/image";
import React from "react";
import {
  TransformComponent,
  TransformWrapper,
  useControls,
} from "react-zoom-pan-pinch";

interface CarouselProps {
  setApi: React.Dispatch<React.SetStateAction<CarouselApi | undefined>>;
  filteredPaths: string[];
  blurDataList: string[];
}
export default function ImageCarousel(props: CarouselProps) {
  const { setApi, filteredPaths, blurDataList } = props;
  const Controls = () => {
    const { zoomIn, zoomOut, resetTransform } = useControls();
    const [plus, setPlus] = React.useState(false);

    const handleZoomIn = () => {
      zoomIn();
      setPlus(true);
    };

    return (
      <div className="absolute top-2 left-2 z-50 flex items-center">
        <Button variant={"minus"} onClick={() => zoomOut()} disabled={!plus}>
          -
        </Button>
        <Button
          variant={"reset"}
          onClick={() => {
            resetTransform();
            setPlus(false);
          }}
          disabled={!plus}
        >
          초기화
        </Button>
        <Button variant={"plus"} onClick={handleZoomIn}>
          +
        </Button>
      </div>
    );
  };

  // 이미지 경로 데이터가 없는 경우
  const displayedPaths =
    filteredPaths.length > 0
      ? filteredPaths
      : [
          process.env.NODE_ENV === "production"
            ? "./images/basic.png"
            : "/images/basic.png",
        ];

  return (
    <Carousel setApi={setApi}>
      <CarouselContent>
        {displayedPaths.map((src, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="relative">
                  {/* 패스 이미지 */}
                  <TransformWrapper
                    initialScale={1}
                    initialPositionX={200}
                    initialPositionY={100}
                  >
                    <Controls />
                    <TransformComponent
                      wrapperStyle={{ width: "100%", height: "100%" }}
                      contentStyle={{ width: "100%", height: "100%" }}
                    >
                      {/* 이미지 로드 지연 개선 */}
                      <Image
                        src={src}
                        width={"1920"}
                        height={"1080"}
                        alt={"이미지 자세히 보기"}
                        className="w-full h-full"
                        sizes="100vw"
                        placeholder="blur"
                        blurDataURL={
                          // 블러 이미지는 base64형식
                          blurDataList[index]
                            ? `data:image/png;base64,${blurDataList[index]}`
                            : Base64Image
                        }
                      />
                    </TransformComponent>
                  </TransformWrapper>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
