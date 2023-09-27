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
import TransitionWrapper from "../admin/TransitionWrapper"

function CollectionDataDocumentation({ collection }: { collection: CollectionFieldsData }) {
  const [refresh, setRefresh] = useState(0)

  useEffect(() => {
    Prism.highlightAll()
  }, [refresh])

  return (
    <Tabs defaultValue="schema" className="w-full" onValueChange={() => setRefresh(refresh + 1)}>
      <TabsList className="gap-2 mb-4 p-0 bg-white h-auto border-b w-full justify-start">
        <TabsTrigger className="text-lg px-6 py-2 !shadow-none !rounded-none border-b-2 border-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-400" value="schema">
          Schema
        </TabsTrigger>
        <TabsTrigger className="text-lg px-6 py-2 !shadow-none !rounded-none border-b-2 border-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-400" value="api">
          API
        </TabsTrigger>
      </TabsList>
      <TabsContent value="schema">
        <TransitionWrapper>
          <div className="border rounded-xl bg-white max-w-[720px] w-full not-prose text-left my-6">
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
          <div>
            <pre className="!opacity-100 rounded !bg-white text-left !px-0 !text-sm max-w-[640px]">
              <code className="language-ts">{generateTypeScriptInterface(collection)}</code>
            </pre>
          </div>
        </TransitionWrapper>
      </TabsContent>
      <TabsContent value="api">
        <TransitionWrapper>
          <CollectionDataClient collection={collection} />
        </TransitionWrapper>
      </TabsContent>
    </Tabs>
  )
}

export default CollectionDataDocumentation
