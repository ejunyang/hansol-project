"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DetectImage from "../components/DetectImage";
import DetectHistory from "./DetectHistory";
import { useActiveTabStore } from "@/store/useActiveTabStore";

export default function TabMenu() {
  const { activeTab, setActiveTab } = useActiveTabStore();

  const menuData = [
    { value: "detectImage", label: "판독 이미지" },
    { value: "originImage", label: "원본 이미지" },
    { value: "detectHistory", label: "판독 이력" },
  ];

  return (
    <Tabs
      value={activeTab}
      onValueChange={(tab) => setActiveTab(tab)}
      defaultValue="detectImage"
      className="w-full mt-5 h-full"
    >
      <TabsList>
        {menuData.map((data) => (
          <TabsTrigger key={data.value} value={data.value}>
            {data.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {menuData.map((data) => (
        <TabsContent key={data.value} value={data.value}>
          {data.value === "detectHistory" ? <DetectHistory /> : <DetectImage />}
        </TabsContent>
      ))}
    </Tabs>
  );
}
