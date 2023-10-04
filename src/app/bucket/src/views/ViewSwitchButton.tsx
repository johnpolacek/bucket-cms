"use client"
import { Button } from "../ui"
import { View } from "./Home"
import Link from "next/link"

type ViewSwitchButtonProps = {
  currentView: View
}

export const ViewSwitchButton: React.FC<ViewSwitchButtonProps> = ({ currentView }) => {
  return (
    <Link
      href={currentView === "ADMIN" ? "/bucket/docs" : "/bucket/admin"}
      className="absolute border-2 border-gray-200 text-sm px-3 shadow rounded-lg top-4 right-2 sm:right-4 flex items-center scale-90 sm:scale-100 bg-white hover:bg-white opacity-80 hover:opacity-100 transition-all"
    >
      {currentView === "ADMIN" ? (
        <>
          <span className="hidden sm:inline pr-1">Go to </span>
          <span> Docs</span>
          <span className="opacity-60 text-3xl font-thin relative ml-px left-1 -top-[2px]">»</span>
        </>
      ) : (
        <>
          <span className="opacity-60 text-3xl font-thin relative ml-px right-1 -top-[2px]">«</span>
          <span className="hidden sm:block pr-1">Go to </span>
          <span>Admin</span>
        </>
      )}
    </Link>
  )
}
