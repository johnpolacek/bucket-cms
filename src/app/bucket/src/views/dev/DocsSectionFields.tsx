import React, { useEffect } from "react"
import DocsSection from "./DocsSection"
import Prism from "prismjs"
import "prismjs/components/prism-typescript"

function DocsSectionFields() {
  useEffect(() => {
    Prism.highlightAll()
  }, [])

  return (
    <DocsSection id="fields" title="Fields">
      <p>
        Fields are the foundational elements that define the structure and data type within a Collection. They are analogous to columns in a database table, dictating what kind of data an Item within
        a Collection can hold.
      </p>
      <p>
        Common examples of fields might include Text, RichText, Number, Date, Image, Selection and more. For instance, within a "Team Members" Collection, fields might be defined as "Name", "Role",
        "Profile Image", and "Bio".
      </p>
      <p>Fields in Bucket CMS are structured based on the following interface format:</p>
      <pre className="!opacity-100 !bg-gray-100 -mt-3">
        <code className="language-ts">{`export interface Field<T = any> {
  name: string
  typeName: keyof FieldType<T>
}`}</code>
      </pre>
      <p>
        This format indicates that each Field has a <code>type</code> (like Text or Image), a descriptive <code>label</code>, and optional <code>attributes</code> to further specify its properties.
        When creating or editing a Collection in the Admin Interface, users can add or modify Fields to shape the Collection's schema according to their content needs.
      </p>
    </DocsSection>
  )
}

export default DocsSectionFields
