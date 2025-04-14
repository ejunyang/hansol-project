"use client";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import useWebSocket from "@/hooks/useWebSocket";
import { useSocketStore } from "@/store/useSocketStore";
import dayjs from "dayjs";
import "dayjs/locale/ko";

export default function HeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useWebSocket();
  // TODO 프로그램 시작 시 직전 데이터 호출
  const { socketData: message } = useSocketStore();
  const [totalCount, setTotalCount] = React.useState(0);
  const [detectCount, setDetectCount] = React.useState(0);
  const [detectPercent, setDetectPercent] = React.useState(0);
  const [result, setResult] = React.useState<boolean | null>(null);

  const [nowDate, setNowDate] = React.useState<string>(""); // 빈 값으로 서버 렌더링 후

  const CurrentDate = () => {
    React.useEffect(() => {
      // 클라이언트에서 현재 시간 렌더링으로 서버와 클라이언트의 DOM 불일치 방지
      const interval = setInterval(() => {
        setNowDate(
          dayjs().locale("ko").format(`YYYY년 M월 D일 (dd)THH : mm : ss`)
        );
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }, []);

    return (
      <li className="px-14 py-3 flex flex-col">
        <span className="text-[13px] text-white">{nowDate.split("T")[0]}</span>
        {nowDate.split("T")[1]}
      </li>
    );
  };

  React.useEffect(() => {
    if (message?.today_info) {
      setTotalCount(message.today_info.total_count ?? 0);
      setDetectCount(message.today_info.defect_count ?? 0);
      setDetectPercent(message.today_info.defect_percent ?? 0);
    }

    if (message?.product_info) {
      setResult(message?.product_info.result ?? null);
    }
  }, [message]);

  return (
    <div className="h-full overflow-hidden px-8 pt-8">
      <div className="flex justify-between items-center">
        <Image
          src={
            process.env.NODE_ENV === "production"
              ? "./images/logo.svg"
              : "/images/logo.svg"
          }
          width={271}
          height={27}
          alt="hansol-logo"
          priority
        />

        <div className="flex items-center gap-4">
          <ul className="flex rounded-lg bg-bg-disabled text-center text-[17px] font-bold items-center divide-x divide-bg-primary">
            <CurrentDate />
            <li className="px-10 py-3 flex flex-col">
              <span className="text-[13px] text-white">총 검사 수량</span>
              {totalCount}
            </li>
            <li className="px-14 py-3 flex flex-col">
              <span className="text-[13px] text-white">불량 수량</span>
              {detectCount}
            </li>
            <li className="px-14 py-3 flex flex-col">
              <span className="text-[13px] text-white">불량률</span>
              {message ? `${detectPercent?.toFixed(1)} %` : `0.0 %`}
            </li>
          </ul>

          <Button
            variant={"layout"}
            size={"lg"}
            className={
              result === false ? "bg-error-500 text-white" : "bg-bg-disabled"
            }
          >
            NG
          </Button>

          <Button
            variant={"layout"}
            size={"lg"}
            className={
              result === true ? "bg-brand-500 text-white" : "bg-bg-disabled"
            }
          >
            OK
          </Button>
        </div>
      </div>
      {children}
    </div>
  );
}
