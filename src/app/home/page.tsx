"use client"

import { useEffect, useRef } from "react"

import HomePageChat from "@/components/chat/HomePageChat"


const PortfolioNavigator = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef}>
      <HomePageChat />
    </div>
  )
}

export default PortfolioNavigator
