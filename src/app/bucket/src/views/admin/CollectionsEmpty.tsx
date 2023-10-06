"use client"
import { Button } from "../../ui"
import Link from "next/link"

function CollectionsEmpty() {
  return (
    <div className="flex flex-col items-center gap-8 pt-16">
      <div className="opacity-70">Looks like you don’t have any Collections</div>
      <div className="flex justify-center">
        <Link href="./admin/collection/new">
          <Button className="text-lg py-3 h-auto text-white bg-blue-600 hover:bg-blue-600 hover:scale-105 transition-all" size="lg">
            + Create New Collection
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default CollectionsEmpty
