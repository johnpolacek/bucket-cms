"use client"
import React from "react"
import { Transition } from "@headlessui/react"

function TransitionWrapper({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <Transition className={className} appear={true} show={true} enter="transition-all duration-150" enterFrom="opacity-0 translate-y-4" enterTo="opacity-100 translate-y-0">
      {children}
    </Transition>
  )
}

export default TransitionWrapper
