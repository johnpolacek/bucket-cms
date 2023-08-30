import React from "react"
import DocsSection from "./DocsSection"

function DocsSectionFields() {
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
      <pre className="-mt-3">
        <code>{`export interface Field<T = any> {
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
