"use client";

import { Button } from "@/components/ui/button";
import { DetectHistoryType } from "@/type/DetectType";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import Image from "next/image";

export const columns: ColumnDef<DetectHistoryType>[] = [
  {
    accessorKey: "id",
    header: "No",
    cell: ({ row }) => {
      return (
        <p className="font-bold text-text-teriary text-center">
          {row.index + 1}
        </p>
      );
    },
  },
  {
    accessorKey: "date",
    accessorFn: (row) => new Date(row.create_time),
    header: ({ column }) => {
      return (
        <div className="flex gap-1 items-center">
          판독 일시
          <Button
            size={"sm"}
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <Image
              src={
                process.env.NODE_ENV === "production"
                  ? "./icons/arrow.svg"
                  : "/icons/arrow.svg"
              }
              width={20}
              height={20}
              alt="sorting-arrow"
            />
          </Button>
        </div>
      );
    },

    cell: ({ row }) => {
      const date = new Date(row.original.create_time);
      const hours = date.getHours();
      const minutes = date.getMinutes();

      const formattedDate = format(date, "yyyy년 MM월 dd일", { locale: ko });

      const ampm = hours < 12 ? "오전" : "오후";
      const formattedHours = hours % 24 === 0 ? 24 : hours % 24;
      const formattedMinutes = minutes.toString().padStart(2, "0");
      const formattedTime = `${formattedHours}:${formattedMinutes}`;

      return (
        <div>
          <p className="font-medium leading-6">{formattedDate}</p>
          <p className="font-normal text-quaternary leading-6 text-text-quaternary">
            {ampm} {formattedTime}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "totalStatus",
    header: "전체 판독 상태",
    cell: ({ row }) => {
      const totalStatus = row.original.total_result;
      return (
        <p
          className={`border-[1.5px] rounded-md px-3 inline-block ${
            totalStatus === true
              ? "border-brand text-brand-700"
              : "border-error-600 text-error-700"
          }`}
        >
          {totalStatus === true ? "합격" : "불합격"}
        </p>
      );
    },
    // row의 totalStatus값과 데이터가 일치하는지 확인
    filterFn: (row, _, filterValue) => {
      return row.original.total_result === filterValue;
    },
  },

  {
    accessorKey: "cameraA1",
    header: "Camera A1",
    cell: ({ row }) => {
      const status = row.original.CAMERA_A1;
      return (
        <p
          className={`border-[1.5px] border-border-primary px-3 rounded-md inline-block text-gray-700`}
        >
          <span
            className={`w-2 h-2 rounded-full inline-block mr-1 ${
              status === true ? "bg-brand-500" : "bg-error-500"
            }`}
          ></span>
          {status === true ? "합격" : "불합격"}
        </p>
      );
    },
  },
  {
    accessorKey: "cameraA2",
    header: "Camera A2",
    cell: ({ row }) => {
      const status = row.original.CAMERA_A2;

      return (
        <p
          className={`border-[1.5px] border-border-primary px-3 rounded-md inline-block text-gray-700`}
        >
          <span
            className={`w-2 h-2 rounded-full inline-block mr-1 ${
              status === true ? "bg-brand-500" : "bg-error-500"
            }`}
          ></span>
          {status === true ? "합격" : "불합격"}
        </p>
      );
    },
  },
  {
    accessorKey: "cameraB1",
    header: "Camera B1",
    cell: ({ row }) => {
      const status = row.original.CAMERA_B1;
      return (
        <p
          className={`border-[1.5px] border-border-primary px-3 rounded-md inline-block text-gray-700`}
        >
          <span
            className={`w-2 h-2 rounded-full inline-block mr-1 ${
              status === true ? "bg-brand-500" : "bg-error-500"
            }`}
          ></span>
          {status === true ? "합격" : "불합격"}
        </p>
      );
    },
  },
  {
    accessorKey: "cameraB2",
    header: "Camera B2",
    cell: ({ row }) => {
      const status = row.original.CAMERA_B2;
      return (
        <p
          className={`border-[1.5px] border-border-primary px-3 rounded-md inline-block text-gray-700`}
        >
          <span
            className={`w-2 h-2 rounded-full inline-block mr-1 ${
              status === true ? "bg-brand-500" : "bg-error-500"
            }`}
          ></span>
          {status === true ? "합격" : "불합격"}
        </p>
      );
    },
  },
  {
    accessorKey: "cameraC1",
    header: "Camera C1",
    cell: ({ row }) => {
      const status = row.original.CAMERA_C1;
      return (
        <p
          className={`border-[1.5px] border-border-primary px-3 rounded-md inline-block text-gray-700`}
        >
          <span
            className={`w-2 h-2 rounded-full inline-block mr-1 ${
              status === true ? "bg-brand-500" : "bg-error-500"
            }`}
          ></span>
          {status === true ? "합격" : "불합격"}
        </p>
      );
    },
  },
  {
    accessorKey: "cameraC2",
    header: "Camera C2",
    cell: ({ row }) => {
      const status = row.original.CAMERA_C2;
      return (
        <p
          className={`border-[1.5px] border-border-primary px-3 rounded-md inline-block text-gray-700`}
        >
          <span
            className={`w-2 h-2 rounded-full inline-block mr-1 ${
              status === true ? "bg-brand-500" : "bg-error-500"
            }`}
          ></span>
          {status === true ? "합격" : "불합격"}
        </p>
      );
    },
  },
  {
    accessorKey: "cameraD1",
    header: "Camera D1",
    cell: ({ row }) => {
      const status = row.original.CAMERA_D1;
      return (
        <p
          className={`border-[1.5px] border-border-primary px-3 rounded-md inline-block text-gray-700`}
        >
          <span
            className={`w-2 h-2 rounded-full inline-block mr-1 ${
              status === true ? "bg-brand-500" : "bg-error-500"
            }`}
          ></span>
          {status === true ? "합격" : "불합격"}
        </p>
      );
    },
  },
  {
    accessorKey: "cameraD2",
    header: "Camera D2",
    cell: ({ row }) => {
      const status = row.original.CAMERA_D2;
      return (
        <p
          className={`border-[1.5px] border-border-primary px-3 rounded-md inline-block text-gray-700`}
        >
          <span
            className={`w-2 h-2 rounded-full inline-block mr-1 ${
              status === true ? "bg-brand-500" : "bg-error-500"
            }`}
          ></span>
          {status === true ? "합격" : "불합격"}
        </p>
      );
    },
  },
];
