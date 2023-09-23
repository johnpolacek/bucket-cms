import React from "react"
import { CollectionFieldsData } from "../../types"

function DevHomeNav({ collections, activeSection }: { collections: CollectionFieldsData[]; activeSection: string }) {
  return (
    <nav className="hidden sm:block py-8 pl-10 pr-16 border-r max-w-[320px] bg-gray-50">
      <h2 className="text-xs uppercase font-bold tracking-widest pb-6">Bucket CMS Docs</h2>
      <ul className="flex flex-col gap-8">
        <li>
          <h3 className="font-semibold pb-4 text-xs uppercase opacity-50">Overview</h3>
          <ul className="flex flex-col gap-3 text-sm pl-2">
            <li>
              <a className={activeSection === "introduction" ? "text-blue-600 font-semibold" : "text-black opacity-70"} href="#introduction">
                Introduction
              </a>
            </li>
            <li>
              <a className={activeSection === "admin" ? "text-blue-600 font-semibold" : "text-black opacity-70"} href="#admin">
                Admin
              </a>
            </li>
            <li>
              <a className={activeSection === "collections" ? "text-blue-600 font-semibold" : "text-black opacity-70"} href="#collections">
                Collections
              </a>
            </li>
            <li>
              <a className={activeSection === "fields" ? "text-blue-600 font-semibold" : "text-black opacity-70"} href="#fields">
                Fields
              </a>
            </li>
            <li>
              <a className={activeSection === "field-types" ? "text-blue-600 font-semibold" : "text-black opacity-70"} href="#field-types">
                Field Types
              </a>
            </li>
            <li>
              <a className={activeSection === "items" ? "text-blue-600 font-semibold" : "text-black opacity-70"} href="#items">
                Items
              </a>
            </li>
          </ul>
        </li>
        <li>
          <h3 className="font-semibold pb-4 text-xs uppercase opacity-50">Your Collections</h3>
          <ul className="flex flex-col gap-3 text-sm pl-2">
            <li>
              <a className={activeSection === "fetching-data" ? "text-blue-600 font-semibold" : "text-black opacity-70"} href="#fetching-data">
                Fetching Data
              </a>
            </li>
            {collections.map((collection) => (
              <li key={collection.name}>
                <a className={activeSection === collection.name ? "text-blue-600 font-semibold" : "text-black opacity-70"} href={"#" + collection.name}>
                  {collection.name}
                </a>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </nav>
  )
}

export default DevHomeNav
