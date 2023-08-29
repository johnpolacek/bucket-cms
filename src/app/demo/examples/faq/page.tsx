import { readCollectionItems } from "@/app/api/bucket/s3/util"

async function getData() {
  const items = await readCollectionItems("FAQs")
  console.log("faq page getData", items)
  return items
}

interface FAQItem {
  itemId: string
  itemName: string
  data: {
    Question: { value: string }
    Answer: { value: string }
  }
}

export default async function FAQDemo() {
  const data: FAQItem[] = await getData()

  console.log("FAQDemo data", data)

  return (
    <main className="py-16 w-full max-w-[1200px] mx-auto gap-x-8">
      <h1 className="text-4xl pb-8">Frequently Asked Questions</h1>
      <div className="grid grid-cols-3">
        {data?.map((item: FAQItem) => {
          return (
            <div>
              <div className="font-semibold pb-2">{item.data.Question.value}</div>
              <div className="prose prose-p:pb-4 " dangerouslySetInnerHTML={{ __html: item.data.Answer.value }} />
            </div>
          )
        })}
      </div>
    </main>
  )
}
