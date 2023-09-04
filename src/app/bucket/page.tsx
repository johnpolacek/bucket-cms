import fs from "fs"
import path from "path"
import { Bucket } from "."

type ComponentMetadata = {
  componentName: string
  supportedCollections: string[]
  requiredFields: { name: string; typeName: string }[]
}

export default async function Home() {
  console.log("fetchInstalledComponentsMetadata")

  const fetchInstalledComponentsMetadata = (): ComponentMetadata[] => {
    const componentsDirectory = path.join(process.cwd(), "src/app/bucket/src/components")
    const componentDirs = fs.readdirSync(componentsDirectory)

    const metadatas: ComponentMetadata[] = []
    for (const dir of componentDirs) {
      const metadataPath = path.join(componentsDirectory, dir, "metadata.json")
      if (fs.existsSync(metadataPath)) {
        const rawData = fs.readFileSync(metadataPath, "utf-8")
        const metadata = JSON.parse(rawData)
        metadatas.push(metadata)
      }
    }
    console.log({ metadatas })
    return metadatas
  }
  fetchInstalledComponentsMetadata()

  return (
    <main>
      <Bucket />
    </main>
  )
}
