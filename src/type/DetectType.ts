export type DetectHistoryType = {
  product_id: string;
  create_time: string;
  total_result: boolean;
  CAMERA_A1: boolean;
  CAMERA_A2: boolean;
  CAMERA_B1: boolean;
  CAMERA_B2: boolean;
  CAMERA_C1: boolean;
  CAMERA_C2: boolean;
  CAMERA_D1: boolean;
  CAMERA_D2: boolean;
};

export type DetectHistoryDataType = {
  data: DetectHistoryType;
  total_count: number;
  last_page_num: number;
  page: number;
};

export type ImageItem = {
  image_num: number;
  image_thumbnail: string; // base64 원본 이미지
  image_path: string;
  heatmap_thumbnail: string; // base64 판독 이미지
  heatmap_path: string;
  result: boolean;
};

export type ImageType = {
  [key: string]: ImageItem[];
};

export interface ProductInfoType {
  result: boolean; // NG = false | OK = true
  images: ImageType;
}

export interface TodayInfo {
  total_count: number;
  defect_count: number;
  defect_percent: number;
}

export interface SocketDataType {
  today_info: TodayInfo;
  product_info: ProductInfoType;
}
