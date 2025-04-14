import React from "react";
import { Button } from "../ui/button";

type StatusType = {
  status: boolean | undefined;
};

export default function StatusButton({ status }: StatusType) {
  const isLoading = status === undefined;

  const StatusSrc = () => {
    if (isLoading) {
      return process.env.NODE_ENV === "production"
        ? "./icons/loading.svg"
        : "/icons/loading.svg";
    } else if (status === true) {
      return process.env.NODE_ENV === "production"
        ? "./icons/Check.svg"
        : "/icons/Check.svg";
    } else {
      return process.env.NODE_ENV === "production"
        ? "./icons/Error.svg"
        : "/icons/Error.svg";
    }
  };

  return (
    <Button
      variant={status === true || isLoading ? "detect" : "destructive"}
      size={"default"}
      className="hover:cursor-default"
    >
      <img src={StatusSrc()} width={24} height={24} alt={`${status} 상태`} />
    </Button>
  );
}
