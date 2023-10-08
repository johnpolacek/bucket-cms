import React from "react"
import { CollectionFieldsData } from "../../types"
import DevHomeNavItem from "./DevHomeNavItem"

function DevHomeNav({ collections, activeSection }: { collections: CollectionFieldsData[]; activeSection: string }) {
  return (
    <nav className="hidden sm:block py-8 pl-10 pr-16 border-r max-w-[320px] bg-gray-50">
      <ul className="flex flex-col gap-8 min-h-[80vh]">
        <li>
          <h3 className="font-semibold text-xs uppercase opacity-50 pb-4">Quick Start</h3>
          <ul className="flex flex-col gap-3 text-sm">
            <DevHomeNavItem section="introduction" activeSection={activeSection} label="Introduction" />
            <DevHomeNavItem section="install" activeSection={activeSection} label="Install" />
          </ul>
        </li>
        <li>
          <h3 className="font-semibold pb-4 text-xs uppercase opacity-50">Overview</h3>
          <ul className="flex flex-col gap-3 text-sm">
            <DevHomeNavItem section="admin" activeSection={activeSection} label="Admin" />
            <DevHomeNavItem section="collections" activeSection={activeSection} label="Collections" />
            <DevHomeNavItem section="fields" activeSection={activeSection} label="Fields" />
            <DevHomeNavItem section="field-types" activeSection={activeSection} label="Field Types" />
            <DevHomeNavItem section="items" activeSection={activeSection} label="Items" />
          </ul>
        </li>
        <li>
          <h3 className="font-semibold pb-4 text-xs uppercase opacity-50">Your Collections</h3>
          <ul className="flex flex-col gap-3 text-sm">
            <DevHomeNavItem section="fetching-data" activeSection={activeSection} label="Fetching Data" />
            {collections.map((collection) => (
              <DevHomeNavItem key={collection.name} section={collection.name} activeSection={activeSection} label={collection.name} />
            ))}
          </ul>
        </li>
      </ul>
    </nav>
  )
}

export default DevHomeNav
