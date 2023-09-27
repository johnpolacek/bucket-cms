"use client"
import { useState, FormEvent } from "react"

const ContactForm = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    const response = await fetch("/api/bucket/item/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        collectionName: "Contact",
        itemName: name,
        data: [
          {
            Name: {
              value: name,
            },
          },
          {
            Email: {
              value: email,
            },
          },
          {
            Message: {
              value: message,
            },
          },
        ],
      }),
    })

    const data = await response.json()
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" name="name" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" required />
      <input type="email" name="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" required />
      <textarea name="message" placeholder="Your Message" value={message} onChange={(e) => setMessage(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" required />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400">
        Submit
      </button>
    </form>
  )
}

export default ContactForm
