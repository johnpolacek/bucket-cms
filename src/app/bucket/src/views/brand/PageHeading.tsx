import React from "react"

const PageHeading = ({ children }: { children: React.ReactNode }) => {
  return <h2 className="text-4xl font-bold text-blue-600 pt-6 pb-2">{children}</h2>
}

export { PageHeading }
