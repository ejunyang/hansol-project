import React from "react";
import ImageComponent from "../../../../components/common/Image";
import StatusButton from "@/components/common/StatusButton";
import { ImageType, SocketDataType } from "@/type/DetectType";
import { useActiveTabStore } from "@/store/useActiveTabStore";
import { useModalStore } from "@/store/useModalStore";

interface PropsType {
  message: SocketDataType | null;
  sideLabel: string;
  cameraIds: string[];
  subCamera: string;
}

export default function SideCamera(props: PropsType) {
  const { message, sideLabel, cameraIds, subCamera } = props;
  // const { connect, isConnected } = useSocketStore();
  const { activeTab } = useActiveTabStore();
  const ImageData: ImageType = message?.product_info?.images ?? {};
  const { setSelectedImage } = useModalStore();

  return (
    <div className="w-1/4 flex flex-col gap-4 border-r border-r-border-primary pt-8 pr-5">
      <h1 className="text-[26px] font-bold text-text-secondary">{sideLabel}</h1>

      <div className="flex items-center justify-center gap-4">
        {cameraIds.map((cameraId, idx) => {
          const images = ImageData?.[cameraId] || [];
          const imageCount = images.length || 4; // 들어오는 이미지 동적 처리

          return (
            <div key={cameraId} className="flex flex-col gap-4">
              <h2 className="text-[19px] font-bold text-text-secondary">
                {`${subCamera}${idx + 1}`}
              </h2>
              <ul className="grid grid-cols-1 gap-1 w-full">
                {Array.from({ length: imageCount }).map((_, index) => {
                  const image = images[index];

                  return (
                    // 전체 이미지 보여줄때 base64
                    <li key={index}>
                      <ImageComponent
                        url={
                          activeTab === "detectImage"
                            ? image?.heatmap_thumbnail
                            : image?.image_thumbnail
                        }
                        showButton
                        status={image?.result ?? true} // 이미지가 없으면 기본값 true
                        onClick={() =>
                          setSelectedImage({
                            ...image,
                            unique_id: `${cameraId}-${image.image_num}`,
                          })
                        } // 모달 열기
                      />
                    </li>
                  );
                })}
              </ul>
              {/* 하나라도 NG (false)가 있다면 false */}
              <StatusButton
                status={
                  images.length > 0
                    ? images.every((item) => item.result === true)
                    : undefined
                }
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
