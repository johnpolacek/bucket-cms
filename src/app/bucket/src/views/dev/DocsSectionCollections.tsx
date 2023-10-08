import DocsSection from "./DocsSection"

function DocsSectionCollections() {
  return (
    <DocsSection id="collections" title="Collections">
      <p>A Collection is a set of related Items. Think of it as a table in a database. Each Collection has a defined schema that is determined by the Fields added by the admin user.</p>
      <p>Examples of collections would be Case Studies, Team Members, FAQs, Product Listings, Job Postings, Customer Testimonials or Portfolio Work Samples.</p>
      <p>Collections in Bucket CMS are structured based on the following interface format:</p>
      <pre className="-mt-3 !opacity-100 !bg-gray-100">
        <code className="language-ts">{`export interface Collection<T = any> {
  name: string;
  fields: Field<T>[];
}`}</code>
      </pre>
      <p>
        This format denotes that each Collection possesses a <code>name</code> and an array of <code>fields</code>. By navigating to the <strong>Collections</strong> tab and selecting{" "}
        <strong>Create Collection</strong>, administrators can introduce various Fields that define the Collection's schema. Once satisfied, saving the Collection ensures that its schema is securely
        stored within the S3 bucket as a JSON file.
      </p>
    </DocsSection>
  )
}

export default DocsSectionCollections
