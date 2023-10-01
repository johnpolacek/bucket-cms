interface FAQItem {
  itemId: string
  itemName: string
  data: {
    Question: { value: string }
    Answer: { value: string }
  }
}

const data: FAQItem[] = [
  {
    itemId: "1",
    itemName: "Item 1",
    data: {
      Question: { value: "What is Bucket CMS?" },
      Answer: {
        value:
          "Bucket CMS is a content management system designed to simplify content management for developers and content creators, utilizing a flat file system on Amazon S3 specifically for Next.js sites. This setup eliminates the need for complex server setups and databases, making content retrieval faster and ensuring consistent delivery speeds.",
      },
    },
  },
  {
    itemId: "2",
    itemName: "Item 2",
    data: {
      Question: { value: "What are Collections in Bucket CMS?" },
      Answer: {
        value:
          "Collections in Bucket CMS are sets of related Items, similar to a table in a database. Each Collection has a defined schema determined by Fields added by the admin user. Examples of collections include Case Studies, Team Members, FAQs, Product Listings, Job Postings, Customer Testimonials, or Portfolio Work Samples.",
      },
    },
  },
  {
    itemId: "3",
    itemName: "Item 3",
    data: {
      Question: { value: "How are Fields used in Bucket CMS?" },
      Answer: {
        value:
          "Fields are foundational elements that define the structure and data type within a Collection, similar to columns in a database table. They dictate what kind of data an Item within a Collection can hold. Common field types include Text, RichText, Number, Date, Image, and Selection.",
      },
    },
  },
  {
    itemId: "4",
    itemName: "Item 4",
    data: {
      Question: { value: "How are Items managed in Bucket CMS?" },
      Answer: {
        value:
          "Items represent individual content entries within a Collection. Within the Admin Interface, users can manage individual Items and their associated static assets by selecting a specific Collection and using the Add Item or Upload Asset options. Items are validated against the Collection's schema before being saved to ensure data integrity and type safety.",
      },
    },
  },
  {
    itemId: "5",
    itemName: "Item 5",
    data: {
      Question: { value: "What is the significance of Amazon S3 in Bucket CMS?" },
      Answer: {
        value:
          "Amazon S3 is used as a flat file system for storing all content in Bucket CMS. It simplifies the traditional CMS architecture, eliminates the need for databases, and facilitates faster content retrieval. S3’s scalability, security features, and global reach enhance the performance and security of Bucket CMS.",
      },
    },
  },
  {
    itemId: "6",
    itemName: "Item 6",
    data: {
      Question: { value: "How is data fetched from Bucket CMS?" },
      Answer: {
        value:
          "Data in Bucket CMS can be fetched through three primary approaches: Server-Side Node Functions, Client-Side API Routes, and Loading from S3 URL. These methods integrate with the AWS SDK and Next.js utilities for server-side and client-side operations, allowing flexible data retrieval based on the application’s architecture and use cases.",
      },
    },
  },
  {
    itemId: "7",
    itemName: "Item 7",
    data: {
      Question: { value: "How does Bucket CMS ensure data integrity?" },
      Answer: {
        value:
          "Data integrity in Bucket CMS is ensured through schema validation using the zod library. Each Item undergoes validation against its Collection's schema before being saved, ensuring that the data entered matches the expected type and structure, thereby minimizing the risk of errors or data inconsistencies.",
      },
    },
  },
  {
    itemId: "9",
    itemName: "Item 9",
    data: {
      Question: { value: "How are assets managed in Bucket CMS?" },
      Answer: {
        value:
          "Assets like images or documents can be associated with Items in Bucket CMS. Users can select the Upload Asset option and confirm the desired file for upload. The asset is then stored in the S3 bucket and linked appropriately. The interface also offers options to edit or delete existing Items and their related assets.",
      },
    },
  },
  {
    itemId: "10",
    itemName: "Item 10",
    data: {
      Question: { value: "How does versioning work in Bucket CMS?" },
      Answer: {
        value:
          "With built-in versioning in Amazon S3, all changes in Bucket CMS are tracked, providing a mechanism for data recovery if needed. This feature allows for tracking revisions and reverting to previous versions of content, which can be crucial in managing updates and maintaining data integrity.",
      },
    },
  },
  {
    itemId: "12",
    itemName: "Item 12",
    data: {
      Question: { value: "Can I migrate my data from Bucket CMS to another system?" },
      Answer: {
        value:
          "Yes, since all data in Bucket CMS is saved directly to your Amazon S3 bucket, you have full freedom to access, modify, and manage your content. This means you can back up, migrate, or manipulate your data as you see fit, regardless of the platform you choose to move to in the future.",
      },
    },
  },
]

export const FAQ = () => {
  return (
    <div className="w-full mx-auto p-12">
      <h1 className="text-4xl font-light pb-8 opacity-70">Frequently Asked Questions</h1>
      <div className="grid grid-cols-3 gap-x-16">
        {data?.map((item: FAQItem) => {
          return (
            <div className="pb-8">
              <div className="font-bold text-lg pb-2 text-blue-600">{item.data.Question.value}</div>
              <div className="prose prose-p:pb-4" dangerouslySetInnerHTML={{ __html: item.data.Answer.value }} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
