import React from "react"
import DocsSection from "./DocsSection"

function DocsSectionItems() {
  return (
    <DocsSection id="items" title="Items">
      <p>
        On Bucket CMS, Items represent the individual content entries within a Collection. If you think of a Collection as a table, then Items are the rows within that table, each adhering to the
        structure defined by the Collection's Fields.
      </p>
      <p>
        Every Item is crafted based on the Field Types specified in its parent Collection. This ensures that the data entered for an Item is both consistent and predictable. For instance, within a
        "Team Members" Collection, an Item might represent a single team member, with data fields like "Name", "Role", "Profile Image", and "Bio" populated based on the Collection's schema and its
        FieldTypes.
      </p>
      <p>
        A significant feature of Items in Bucket CMS is the assurance of data integrity and type safety. Each Item undergoes validation against its Collection's schema before being saved. This process
        ensures that the data entered matches the expected type and structure, minimizing the risk of errors or data inconsistencies.
      </p>
    </DocsSection>
  )
}

export default DocsSectionItems
