import React from "react"

function DocsSection({ title, id, children }: { title: string; id?: string; children: React.ReactNode }) {
  return (
    <section id={id}>
      <h3 className="font-semibold text-2xl py-4">{title}</h3>
      <div className="prose max-w-[720px]">{children}</div>
    </section>
  )
}

export default DocsSection
