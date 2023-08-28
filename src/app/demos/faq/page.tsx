async function getData() {
  const res = await fetch("http:localhost:3000/api/bucket/items/read?collectionName=FAQs")

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data")
  }

  return res.json()
}

export default async function FAQDemo() {
  const data = await getData()

  return (
    <main className="py-16 w-full max-w-[1200px] mx-auto gap-x-8">
      <h1 className="text-4xl pb-8">Frequently Asked Questions</h1>
      <div className="grid grid-cols-3">
        {data.items.map((item) => {
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
