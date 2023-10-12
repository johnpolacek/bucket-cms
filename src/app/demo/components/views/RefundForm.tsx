"use client"
import { useState } from "react"
import { Button, Input, Label, Textarea } from "../../../bucket/src/ui"

function RefundForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
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
      setSuccess(true) // Set success to true on successful form submission
    } catch (error) {
      console.error("There was an error:", error)
    } finally {
      setLoading(false) // Set loading to false once form submission is complete
    }
  }

  return (
    <form className="p-8 rounded-lg border shadow bg-white" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 text-left pb-8">
        <div className="sm:col-span-2">
          <Label className="text-base opacity-60" htmlFor="name">
            Purchaser’s Name
          </Label>
          <div>
            <Input required type="text" name="name" id="name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
        </div>
        <div className="sm:col-span-2">
          <Label className="text-base opacity-60" htmlFor="email">
            Purchaser’s Email
          </Label>
          <div>
            <Input required type="email" name="email" id="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
        </div>
        <div className="sm:col-span-2">
          <Label className="text-base opacity-60" htmlFor="message">
            Payment Information <span className="text-sm">(project name, date of purchase, reason for refund)</span>
          </Label>
          <div className="border">
            <Textarea required name="message" id="message" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center">
        {loading ? (
          <Button className="h-auto text-xl py-3 px-8" type="button" disabled>
            Sending...
          </Button>
        ) : (
          <Button className="h-auto text-xl py-3 px-8" type="submit">
            Request Refund
          </Button>
        )}
      </div>

      {success && <div className="mt-4 text-green-500">Your message has been sent successfully!</div>}
    </form>
  )
}

export default RefundForm
