import React from "react"
import { cn } from "../../ui/utils"

interface NavItemProps {
  section: string
  activeSection: string
  label: string
}

const DevHomeNavItem: React.FC<NavItemProps> = ({ section, activeSection, label }) => {
  return (
    <li>
      <a
        className={cn("px-2 py-2 bg-gray-50 hover:bg-gray-200 rounded transition-all duration-500 ease-in-out", activeSection === section ? "text-blue-600 font-semibold" : "text-black opacity-70")}
        href={"#" + section}
      >
        {label}
      </a>
    </li>
  )
}

export default DevHomeNavItem
