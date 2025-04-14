import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PropsType {
  data: {
    unique_id: string;
    image_num: number;
    image_thumbnail: string; // base64 원본 이미지
    image_path: string;
    heatmap_thumbnail: string; // base64 판독 이미지
    heatmap_path: string;
    result: boolean;
  }[];
  onSelect: (uniqueId: string) => void;
  selectValue: string;
}

export default function ImageSelect(props: PropsType) {
  const { data, onSelect, selectValue } = props;

  const cameraName = (unique_id: string) => {
    const [key, imageNum] = unique_id.split("-"); // 0-0
    const groupKey = parseInt(key);
    const GROUPS = "ABCD";
    const groupLetter = GROUPS[Math.floor(groupKey / 2)]; // 0:A 1:B 2:C 3:D
    const groupNumber = (groupKey % 2) + 1; // 1 or 2
    return `Camera ${groupLetter}${groupNumber}_${parseInt(imageNum) + 1}`;
  };

  const handleSelectChange = (selectedUniqueId: string) => {
    onSelect(selectedUniqueId);
  };

  return (
    <Select onValueChange={handleSelectChange} value={selectValue}>
      <SelectTrigger className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {data.map((item, idx) => (
            <SelectItem key={idx} value={item.unique_id}>
              <span
                className={`w-2 h-2 rounded-full inline-block mr-2 ${
                  item.result === true ? "bg-brand-500" : "bg-error-500"
                }`}
              ></span>

              {cameraName(item.unique_id)}
              <span className="text-text-teriary ml-2 text-[13px]"></span>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
