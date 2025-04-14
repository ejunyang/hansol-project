"use client";

import * as React from "react";
import { endOfMonth, format, startOfMonth } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ko } from "date-fns/locale";
import { quickDate } from "@/lib/quickDate";

export function DateRangePicker({
  className,
  onDateChange,
  value,
}: React.HTMLAttributes<HTMLDivElement> & {
  onDateChange: (date: DateRange | undefined) => void;
} & { value: DateRange | undefined }) {
  const today = new Date();
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
  const defaultDate = {
    from: startOfMonth(today),
    to: endOfMonth(today),
  };
  // 내부 상태
  const [tempRange, setTempRange] = React.useState<DateRange | undefined>(
    value
  );

  // 오늘 | 어제 | 이번주 | 지난주 ...
  const handleQuickDate = (label: keyof typeof quickDate) => {
    const selectedRange = quickDate[label];
    if (selectedRange) {
      onDateChange(selectedRange);
      setIsPopoverOpen(false);
    }
  };

  const handelSubmit = () => {
    setIsPopoverOpen(false);
    onDateChange(tempRange);
  };

  const handleResetCalendar = () => {
    setTempRange(defaultDate); // 로컬 초기화
    onDateChange(defaultDate); // 전역 초기화
  };

  return (
    <div className={cn("flex gap-2 my-5", className)}>
      <Button
        onClick={handleResetCalendar}
        className="absolute top-0 left-[300px] border border-border-primary border-l-0 bg-transparent"
      >
        초기화
      </Button>
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <div className="flex">
            <Button
              id="date"
              variant={isPopoverOpen ? "focused" : "outline"}
              className={cn(
                "w-[300px] rounded-tr-none rounded-br-none",
                !tempRange && "text-muted-foreground"
              )}
            >
              <CalendarIcon />
              {tempRange?.from && tempRange.to ? (
                <>
                  {format(tempRange.from, "yyyy년 MM월 dd일", {
                    locale: ko,
                  })}{" "}
                  -{" "}
                  {format(tempRange.to, "yyyy년 MM월 dd일", {
                    locale: ko,
                  })}
                </>
              ) : (
                <span>날짜를 선택하세요</span>
              )}
            </Button>
          </div>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0 flex" align="start">
          <ul className="w-40 px-4 pt-5 flex flex-col gap-4 text-text-secondary text-[15px]">
            {Object.keys(quickDate).map((label) => (
              <li
                key={label}
                className="cursor-pointer"
                onClick={() => handleQuickDate(label as keyof typeof quickDate)}
              >
                {label}
              </li>
            ))}
          </ul>
          <div className="flex-col border-l border-l-border-secondary w-[656px]">
            <Calendar
              mode="range"
              numberOfMonths={2}
              selected={tempRange}
              onDayClick={(day) => {
                if (!tempRange?.from || (tempRange.from && tempRange.to)) {
                  // 선택 초기화 (새로운 from 시작)
                  setTempRange({ from: day, to: undefined });
                } else {
                  // to 선택
                  const newRange =
                    day < tempRange.from
                      ? { from: day, to: tempRange.from }
                      : { from: tempRange.from, to: day };
                  setTempRange(newRange);
                }
              }}
            />

            <div className="flex items-center justify-between px-6 py-3 border-t border-t-border-primary gap-1">
              {/* 시작 날짜 - 끝 날짜 */}
              <div className="text-sm">
                {tempRange?.from ? (
                  <div className="flex items-center gap-1">
                    <Button variant={"outline"}>
                      {format(tempRange.from, "yyyy년 M월 dd일 (EE)", {
                        locale: ko,
                      })}
                    </Button>
                    -
                    {tempRange.to && (
                      <Button variant={"outline"}>
                        {format(tempRange.to, "yyyy년 M월 dd일 (EE)", {
                          locale: ko,
                        })}
                      </Button>
                    )}
                  </div>
                ) : (
                  <p>날짜를 선택하세요.</p>
                )}
              </div>

              <div className="flex gap-1">
                <Button variant={"outline"} onClick={handleResetCalendar}>
                  초기화
                </Button>
                <Button variant={"active"} onClick={handelSubmit}>
                  확인
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
