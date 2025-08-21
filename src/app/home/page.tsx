"use client"

import { useEffect, useRef } from "react"

import HomePageChat from "@/components/chat/HomePageChat"


const PortfolioNavigator = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      className="flex w-full h-screen justify-center items-center overflow-hidden relative pt-20"
      ref={containerRef}
    >
      <HomePageChat />
    </div>
  )
}

export default PortfolioNavigator
