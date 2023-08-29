"use client"
import React, { useEffect, useState } from "react"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table"
import { CollectionFetch } from "../../types"
import CollectionDataFetch from "./CollectionDataFetch"

function CollectionData({ collection }: { collection: CollectionFetch }) {
  return (
    <div className="max-w-[1200px] mx-auto">
      <h3 className="text-2xl pl-1 mb-2 tracking-wide font-semibold">{collection.name}</h3>
      <Table className="border rounded-lg bg-white">
        <TableHeader>
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
      <CollectionDataFetch collection={collection} />
    </div>
  )
}

export default CollectionData
