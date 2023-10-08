import React from "react"

function DocsSection({ title, id, children }: { title?: string; id?: string; children: React.ReactNode }) {
  return (
    <section id={id}>
      {title && <h3 className="font-semibold text-2xl py-4">{title}</h3>}

      <div className="prose max-w-[720px] prose-pre:bg-[#eee] prose-pre:text-black prose-pre:opacity-70">{children}</div>
    </section>
  )
}

export default DocsSection
