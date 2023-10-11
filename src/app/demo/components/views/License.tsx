import { PageHeading } from "@/app/bucket/src/views/brand"
import LicensePurchaseForm from "./LicensePurchaseForm"

function License() {
  return (
    <div className="flex flex-col gap-2 items-center pt-4 pb-16">
      <PageHeading>Bucket CMS License</PageHeading>
      <p className="mt-4">
        Bucket CMS is free forever to use on non-commercial projects.{" "}
        <a href="https://github.com/johnpolacek/bucket-cms/blob/main/LICENSE.md" className="text-blue-500">
          View License
        </a>
      </p>
      <p className="pb-12">Commercial licenses are currently available per project at a reduced price during this limited-time public beta.</p>
      <LicensePurchaseForm />
    </div>
  )
}

export default License
