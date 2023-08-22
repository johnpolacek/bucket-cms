import React from "react"
import { Button } from "../../ui/Button"

function CollectionManage({ collectionName, onFinish }: { collectionName: string; onFinish: () => void }) {
  return (
    <>
      <div className="flex justify-end">
        <Button className="-mt-16" variant="outline" onClick={onFinish}>
          <span className="text-2xl -mt-[2px] pr-2 text-gray-500 font-thin scale-x-125">‹</span> Back to Admin
        </Button>
      </div>
      <h3 className="text-center font-semibold text-xl">Manage {collectionName}</h3>
    </>
  )
}

export default CollectionManage
