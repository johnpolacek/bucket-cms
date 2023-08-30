"use client"
import React, { useEffect, useState } from "react"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table"
import { CollectionFetch } from "../../types"
import CollectionDataFetch from "./CollectionDataFetch"

function CollectionData({ collection }: { collection: CollectionFetch }) {
  return (
    <section id={collection.name}>
      <h3 className="text-xl pl-1 py-4 tracking-wide font-semibold">{collection.name}</h3>
      <div className="border rounded-xl bg-white max-w-[600px] not-prose mb-6">
        <Table>
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
      </div>
      <CollectionDataFetch collection={collection} />
    </section>
  )
}

export default CollectionData
