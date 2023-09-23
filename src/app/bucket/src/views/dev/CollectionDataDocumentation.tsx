"use client"
import React, { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table"
import { CollectionFieldsData } from "../../types"
import CollectionDataClient from "./CollectionDataClient"
import CollectionDataNode from "./CollectionDataNode"
import { generateTypeScriptInterface } from "../../util"
import Prism from "prismjs"
import "prismjs/components/prism-typescript"

function CollectionDataDocumentation({ collection }: { collection: CollectionFieldsData }) {
  const [refresh, setRefresh] = useState(0)

  useEffect(() => {
    Prism.highlightAll()
  }, [refresh])

  return (
    <Tabs defaultValue="schema" className="w-full" onValueChange={() => setRefresh(refresh + 1)}>
      <TabsList className="gap-2 mb-4">
        <TabsTrigger value="schema">Schema</TabsTrigger>
        <TabsTrigger value="typescript">Typescript</TabsTrigger>
        <TabsTrigger value="node">Node</TabsTrigger>
        <TabsTrigger value="api">API Routes</TabsTrigger>
      </TabsList>
      <TabsContent value="schema">
        <div className="border rounded-xl bg-white max-w-[480px] not-prose text-left mb-6">
          <Table>
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead className="p-4">Field</TableHead>
                <TableHead className="py-4">Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {collection.fields.map((field) => (
                <TableRow key={field.name}>
                  <TableCell className="font-medium p-4">{field.name}</TableCell>
                  <TableCell className="font-mono">{field.typeName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </TabsContent>
      <TabsContent value="typescript">
        <pre className="!opacity-100 rounded !bg-gray-50 text-left p-2 !text-sm max-w-[640px]">
          <code className="language-ts">{generateTypeScriptInterface(collection)}</code>
        </pre>
      </TabsContent>
      <TabsContent value="node">
        <CollectionDataNode collection={collection} />
      </TabsContent>
      <TabsContent value="api">
        <CollectionDataClient collection={collection} />
      </TabsContent>
    </Tabs>
  )
}

export default CollectionDataDocumentation
