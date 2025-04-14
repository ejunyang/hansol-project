import React from "react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-350px)] w-full">
      <img
        className="w-16 h-16"
        src={
          process.env.NODE_ENV === "production"
            ? "./images/loading.svg"
            : "/images/loading.svg"
        }
        alt="Loading"
      />
    </div>
  );
}
