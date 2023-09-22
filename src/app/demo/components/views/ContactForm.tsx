"use client"
import { useState } from "react"
import { Button, Input, Label, Textarea } from "../../../bucket/src/ui"

function ContactForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/bucket/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      })

      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      // Handle success (e.g. show a success message, redirect, etc.)
    } catch (error) {
      // Handle error (e.g. show an error message)
      console.error("There was an error:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 text-left py-8">
        <div className="sm:col-span-2">
          <Label htmlFor="name">What’s your name?</Label>
          <div>
            <Input required type="text" name="name" id="name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="email">Email please</Label>
          <div>
            <Input required type="email" name="email" id="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="message">What’s up?</Label>
          <div className="border">
            <Textarea required name="message" id="message" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end">
        <Button className="h-auto text-xl py-3 px-8" type="submit">
          Send to Bucket
        </Button>
      </div>
    </form>
  )
}

export default ContactForm
