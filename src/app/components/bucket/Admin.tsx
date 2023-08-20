import React, { useState } from "react"
import Welcome from "./views/Welcome"
import CreateCollection from "./views/CreateCollection"

function Admin() {
  const [isCreatingCollection, setIsCreatingCollection] = useState(false)

  return <main className="flex flex-col items-center bg-gray-100 py-12">{isCreatingCollection ? <CreateCollection /> : <Welcome onCreateCollection={() => setIsCreatingCollection(true)} />}</main>
}

export default Admin
