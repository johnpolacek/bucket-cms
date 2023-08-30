import React from "react"
import DocsSection from "./DocsSection"

function DocsSectionFieldTypes() {
  return (
    <DocsSection id="field-types" title="Field Types">
      <p>
        In Bucket CMS, Field Types shape the content structure within a Collection. They determine the kind of content that can be added to a Field, ensuring consistency and predictability in data
        entry. More than just defining user interaction, Field Types ensure that content adheres to predefined specifications with the incorporation of type safety using the{" "}
        <a className="text-blue-600" href="https://zod.dev/">
          zod library
        </a>
        . Each Field Type is associated with a precise schema:
      </p>
      <pre className="-mt-3">
        <code>{`export interface FieldType<T> {
  schema: z.ZodType<T, any, any>;
  renderAdmin: ({ data, setData, Component }: FieldTypeProps<T>) => ReactElement;
  validate: (data: T) => { isValid: boolean; errorMessage?: string };
}`}</code>
      </pre>
      <p>
        This ensures that the data for each Field Type, whether it's Text, RichText, or other types, conforms to a specific structure. When admins input data, zod’s validation mechanisms validate the
        data against its associated schema. This allows Bucket CMS to maintain data integrity as it stores items data as flat JSON files on S3.
      </p>
      <h5 className="font-mono text-lg font-bold -mb-3 pt-4">Text</h5>
      <p>
        The <strong>Text</strong> Field Type allows users to input plain text content.
      </p>
      <h5 className="font-mono text-lg font-bold -mb-3 pt-4">RichText</h5>
      <p>
        The <strong>RichText</strong> Field Type provides a richer content editing experience, enabling users to format their text with options like bold, italics, links, and lists. It's ideal for
        longer content sections, such as articles, product descriptions, or detailed instructions.
      </p>
    </DocsSection>
  )
}

export default DocsSectionFieldTypes
