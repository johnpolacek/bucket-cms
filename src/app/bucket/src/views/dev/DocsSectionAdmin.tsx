import React from "react"
import DocsSection from "./DocsSection"

function DocsSectionAdmin() {
  return (
    <DocsSection id="admin" title="Admin">
      <p>
        In Bucket CMS's admin interface, users have the ability to create and define Collections, establish data structures through Fields, and manage individual Items and their associated static
        assets. All data and file assets are stored securely on{" "}
        <a className="text-blue-600" href="https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/">
          Amazon S3
        </a>
        .
      </p>
      <h5 className="font-bold -mb-3">Managing Collections, Items and Assets</h5>
      <p>
        Within the Admin Interface, users can effortlessly design and structure their content through Collections. By navigating to the <strong>Collections tab</strong> and selecting{" "}
        <strong>Create Collection</strong>, administrators have the capability to introduce various Fields that define the Collection's schema. Once satisfied, saving the Collection ensures that its
        schema is securely stored within the S3 bucket as a JSON file.
      </p>
      <p>
        After defining Collections, the Admin Interface provides a streamlined process to manage individual Items and associated static assets. By selecting a specific Collection, users can easily{" "}
        <strong>Add Item</strong>, ensuring that the data aligns with the Collection's schema. For richer content experiences, assets like images or documents can be associated with Items by selecting{" "}
        <strong>Upload Asset</strong> and confirming the desired file for upload. This asset is then stored in the S3 bucket and linked appropriately. Additionally, the interface offers options to
        edit or delete existing Items and their related assets, granting administrators complete control over their content.
      </p>
    </DocsSection>
  )
}

export default DocsSectionAdmin
