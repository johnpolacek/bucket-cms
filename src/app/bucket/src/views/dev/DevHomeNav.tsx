import React from "react"
import { CollectionFetch } from "../../types"

function DevHomeNav({ collections, activeSection }: { collections: CollectionFetch[]; activeSection: string }) {
  return (
    <nav className="py-8 pl-12 pr-16 border-r">
      <ul className="flex flex-col gap-8">
        <li>
          <h3 className="font-sembold pb-4">Overview</h3>
          <ul className="flex flex-col gap-3 text-sm">
            <li>
              <a className={activeSection === "introduction" ? "text-blue-600" : "text-black opacity-70"} href="#introduction">
                Introduction
              </a>
            </li>
            <li>
              <a className={activeSection === "admin" ? "text-blue-600" : "text-black opacity-70"} href="#admin">
                Admin
              </a>
            </li>
            <li>
              <a className={activeSection === "collections" ? "text-blue-600" : "text-black opacity-70"} href="#collections">
                Collections
              </a>
            </li>
            <li>
              <a className={activeSection === "fields" ? "text-blue-600" : "text-black opacity-70"} href="#fields">
                Fields
              </a>
            </li>
          </ul>
        </li>
        <li>
          <h3 className="font-sembold pb-4">Your Collections</h3>
          <ul className="flex flex-col gap-3 text-sm">
            {collections.map((collection) => (
              <li>
                <a className={activeSection === collection.name ? "text-blue-600" : "text-black opacity-70"} href={"#" + collection.name}>
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
