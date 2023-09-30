import React, { useEffect, useState } from "react"
import { useAIConfigValidation } from "../../hooks"
import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui"
import DocsSectionBuildChat from "./DocsSectionBuildChat"
import { CollectionFieldsData } from "../../types"

function DocsSectionBuild({ collection }: { collection: CollectionFieldsData }) {
  const { configValidation, loading } = useAIConfigValidation()

  return (
    <div className="w-full relative">
      {!loading && (
        <>
          <div
            className={`absolute -top-4 right-0 py-1 px-2 inline-flex gap-2 rounded-lg text-xs uppercase tracking-wide font-mono items-center font-semibold ${
              configValidation?.isAIConfigured ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
            }`}
          >
            {configValidation?.isAIConfigured ? <CheckCircledIcon /> : <CrossCircledIcon />}
            <span>OpenAI</span>
          </div>
          {configValidation?.isAIConfigured && (
            <Tabs defaultValue="view" className="w-full text-center pt-4">
              <TabsList className="h-auto">
                <TabsTrigger className="text-lg" value="view">
                  <span className="font-mono scale-75 opacity-50 mr-px">{`<`}</span> {collection.name.replace(/\b\w/g, (match) => match.toUpperCase()).replace(/\s+/g, "")}View{" "}
                  <span className="font-mono scale-75 opacity-50">{`/>`}</span>
                </TabsTrigger>
                <TabsTrigger className="text-lg" value="form">
                  <span className="font-mono scale-75 opacity-50 mr-px">{`<`}</span> {collection.name.replace(/\b\w/g, (match) => match.toUpperCase()).replace(/\s+/g, "")}Form{" "}
                  <span className="font-mono scale-75 opacity-50">{`/>`}</span>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="view">
                <DocsSectionBuildChat collection={collection} type="view" />
              </TabsContent>
              <TabsContent value="form">
                <DocsSectionBuildChat collection={collection} type="form" />
              </TabsContent>
            </Tabs>
          )}
          {configValidation?.isAIConfigured ?? <div className="py-12">Add an Open AI Key to your project’s environment variables to begin using AI to create components.</div>}
        </>
      )}
    </div>
  )
}

export default DocsSectionBuild
