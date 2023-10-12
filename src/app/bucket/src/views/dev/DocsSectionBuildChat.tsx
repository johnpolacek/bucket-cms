import React, { useState } from "react"
import { PaperPlaneIcon } from "@radix-ui/react-icons"
import { Button, CodeBlock, Textarea, Loader } from "../../ui"
import { CollectionFieldsData } from "../../types"
import { useStreamingDataFromPrompt } from "../../hooks/useStreamingDataFromPrompt"
import { generateTypeScriptDataInterface, generateSamplePostDataItems } from "../../util"
import Prism from "prismjs"
import "prismjs/components/prism-typescript"

function DocsSectionBuildChat({ collection, type }: { collection: CollectionFieldsData; type: "view" | "form" }) {
  const [prompt, setPrompt] = useState(`Create a well designed React Component to ${type === "view" ? "view" : "enter and submit"} ${collection.name} data in TypeScript styled with Tailwind.`)
  const [componentData, setComponentData] = useState<string>("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  const formattedCollectionName = collection.name.replace(/\b\w/g, (match) => match.toUpperCase()).replace(/\s+/g, "")
  const formattedComponentName = formattedCollectionName + type.replace(/\b\w/g, (match) => match.toUpperCase()).replace(/\s+/g, "")

  const functionalComponentExample = `const ${formattedComponentName}: React.FC = () => {}`

  const formInstructions = `The api endpoint is "/api/bucket/item/create" and the parameters should be: \n\n ${generateSamplePostDataItems(
    collection
  )} \n\n Do not use axios, use fetch. The response will be: \n\n {"success":true,"itemId": "${collection.name.toLowerCase().split(" ").join("-")}-id-slug"}`

  const enrichedPrompt =
    prompt +
    ` Respond only in code that can be pasted directly into a TSX file. Do not include comments in the code. Only allow imports from react unless previously stated differently. Do not import CSS (use Tailwind only). Type the functional component as ${functionalComponentExample} - this is the TypeScript interface for ${formattedCollectionName} data: \n\n${generateTypeScriptDataInterface(
      { ...collection, name: formattedCollectionName }
    )}${type === "form" ? formInstructions : ""}`

  function generateComponent() {
    setComponentData("")
    setIsGenerating(true)

    useStreamingDataFromPrompt({
      prompt: enrichedPrompt,
      onData: (data) => {
        try {
          if (data) {
            const jsx = data.replace("```tsx", "").replace("```jsx", "").replace("```", "")
            setComponentData(jsx)
          }
        } catch (error) {
          console.error("Parsing error:", error)
        }
      },
      onDone: (data) => {
        setIsGenerating(false)
        try {
          const jsx = data.replace("```tsx", "").replace("```jsx", "").replace("```", "")
          setComponentData(jsx)
          Prism.highlightAll()
        } catch (e) {
          console.error("Parsing error:", e)
          if (retryCount < 3) {
            setRetryCount(retryCount + 1)
            generateComponent()
          }
        }
      },
    })
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    generateComponent()
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="h-24 pb-1">
          <Textarea
            value={prompt}
            onChange={(e) => {
              setPrompt(e.target.value)
            }}
            className="w-full h-full leading-relaxed text-base text-gray-800 focus-visible:ring-gray-300"
          />
        </div>
        <div className="flex justify-center">
          <Button disabled={isGenerating} type="submit" className="disabled:opacity-100 disabled:bg-gray-300 relative flex gap-2 h-auto text-lg pl-8 pr-6">
            {isGenerating ? (
              <>
                <span className="opacity-0">Generating...</span>
                <div className="h-full w-full absolute top-0 left-0 flex items-center justify-center scale-125">
                  <Loader />
                </div>
              </>
            ) : (
              <>
                Generate Component <PaperPlaneIcon className="relative left-1 scale-110" />
              </>
            )}
          </Button>
        </div>
      </form>
      {componentData && <CodeBlock copy={!isGenerating} code={componentData} />}
    </>
  )
}

export default DocsSectionBuildChat
