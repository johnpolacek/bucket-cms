"use client"
import React, { useState } from "react"
import { useStripe, useElements, PaymentElement, Elements } from "@stripe/react-stripe-js"
import { StripeError } from "@stripe/stripe-js"
import getStripe from "../stripe/get-stripejs"
import { Button } from "../ui/button"
import { createPaymentIntent } from "../stripe/actions"

const LicensePurchase = () => {
  const [errorMessage, setErrorMessage] = useState("")
  const [payment, setPayment] = React.useState<{
    status: "initial" | "processing" | "error"
  }>({ status: "initial" })

  const PaymentStatus = ({ status }: { status: string }) => {
    switch (status) {
      case "processing":
      case "requires_payment_method":
      case "requires_confirmation":
        return <h2>Processing...</h2>

      case "requires_action":
        return <h2>Authenticating...</h2>

      case "succeeded":
        return <h2>Payment Succeeded 🥳</h2>

      case "error":
        return (
          <>
            <h2>Error 😭</h2>
            <p className="error-message">{errorMessage}</p>
          </>
        )

      default:
        return null
    }
  }

  const LicensePurchaseForm = () => {
    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
      try {
        e.preventDefault()
        if (!e.currentTarget.reportValidity()) return
        if (!elements || !stripe) return

        // Capture the form data
        const formData = {
          cardholderName: e.currentTarget.cardholderName.value,
          projectName: e.currentTarget.projectName.value,
          company: e.currentTarget.company.value,
          email: e.currentTarget.email.value,
        }
        console.log("Form Data:", formData)

        setPayment({ status: "processing" })
        console.log("begin payment")
        const { error: submitError } = await elements.submit()
        console.log("elements submitted")
        if (submitError) {
          setPayment({ status: "error" })
          setErrorMessage(submitError.message ?? "An unknown error occurred")
          console.log("submit error", submitError)
          return
        }

        console.log("create payment intent")
        const { client_secret: clientSecret } = await createPaymentIntent()
        console.log("post create payment intent")
        console.log("confirmPayment", {
          elements,
          clientSecret,
          confirmParams: {
            return_url: `${window.location.origin}/donate-with-elements/result`,
            payment_method_data: {
              billing_details: {
                name: formData.cardholderName,
                email: formData.email,
              },
            },
          },
        })

        const { error: confirmError } = await stripe!.confirmPayment({
          elements,
          clientSecret,
          confirmParams: {
            return_url: `${window.location.origin}/license/result`,
            payment_method_data: {
              billing_details: {
                name: formData.cardholderName,
                email: formData.email,
              },
            },
            payment_method: "card",
          },
        })

        if (confirmError) {
          setPayment({ status: "error" })
          setErrorMessage(confirmError.message ?? "An unknown error occurred")
          console.log("confirmError", confirmError ?? "An unknown error occurred")
        }
      } catch (err) {
        const { message } = err as StripeError

        setPayment({ status: "error" })
        setErrorMessage(message ?? "An unknown error occurred")
        console.log("stripe error", message ?? "An unknown error occurred")
      }
    }

    return (
      <form className="bg-white p-8 border rounded-lg shadow-md w-full max-w-[480px] mx-4 text-left" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-1" htmlFor="projectName">
            Your Full Name
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="cardholderName"
            type="text"
            name="cardholderName"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-1" htmlFor="projectName">
            Project Name
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="projectName"
            type="text"
            name="projectName"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-1" htmlFor="company">
            Company
          </label>
          <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="company" type="text" name="company" required />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-1" htmlFor="email">
            Email
          </label>
          <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" name="email" required />
        </div>

        <PaymentElement
          onChange={(e) => {
            console.log("payment type", e.value.type)
          }}
        />

        <Button type="submit" className="mt-8 h-auto text-lg px-8">
          Pay $100
        </Button>
      </form>
    )
  }

  return (
    <Elements
      stripe={getStripe()}
      options={{
        appearance: {
          variables: {
            colorIcon: "#6772e5",
            fontFamily: "sans-serif",
          },
        },
        currency: "usd",
        mode: "payment",
        amount: 100,
      }}
    >
      <LicensePurchaseForm />
    </Elements>
  )
}

export default LicensePurchase
