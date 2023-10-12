import type { Metadata } from "next"
import ElementsForm from "./components/ElementsForm"
import { PageHeading } from "../bucket/src/views/brand"

export const metadata: Metadata = {
  title: "Bucket CMS Commercial Project License",
}

export default function LicensePage({ searchParams }: { searchParams?: { payment_intent_client_secret?: string } }): JSX.Element {
  return (
    <div className="flex flex-col gap-2 items-center pt-4 pb-16">
      <PageHeading>Bucket CMS Commercial Project License</PageHeading>
      <p className="mt-4">Commercial licenses are available per project at a reduced price during its limited-time public beta.</p>
      <p>
        Bucket CMS is free forever to use on non-commercial projects.{" "}
        <a href="https://github.com/johnpolacek/bucket-cms/blob/main/LICENSE.md" className="text-blue-500">
          View License
        </a>
      </p>

      <div className="border rounded-xl mt-8 p-8">
        <ElementsForm />
      </div>
    </div>
  )
}
