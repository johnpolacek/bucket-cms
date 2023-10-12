"use client"

import type { StripeError } from "@stripe/stripe-js"

import * as React from "react"
import { useStripe, useElements, PaymentElement, Elements } from "@stripe/react-stripe-js"
import { Label, Input, Button } from "@/app/bucket/src/ui"
import getStripe from "../utils/get-stripejs"
import { createPaymentIntent } from "../actions/stripe"

function CheckoutForm(): JSX.Element {
  const [paymentType, setPaymentType] = React.useState<string>("")
  const [payment, setPayment] = React.useState<{
    status: "initial" | "processing" | "error"
  }>({ status: "initial" })
  const [errorMessage, setErrorMessage] = React.useState<string>("")

  const stripe = useStripe()
  const elements = useElements()

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

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    try {
      e.preventDefault()
      if (!e.currentTarget.reportValidity()) return
      if (!elements || !stripe) return

      setPayment({ status: "processing" })
      const formData = new FormData(e.currentTarget)
      const cardholderName = formData.get("cardholderName") as string
      const email = formData.get("email") as string

      const { error: submitError } = await elements.submit()

      if (submitError) {
        setPayment({ status: "error" })
        setErrorMessage(submitError.message ?? "An unknown error occurred")
        return
      }

      const { client_secret: clientSecret } = await createPaymentIntent()
      const { error: confirmError } = await stripe!.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/license/result`,
          payment_method_data: {
            billing_details: {
              name: cardholderName,
              email: email,
            },
          },
          receipt_email: email,
        },
      })

      if (confirmError) {
        setPayment({ status: "error" })
        setErrorMessage(confirmError.message ?? "An unknown error occurred")
      }
    } catch (err) {
      const { message } = err as StripeError
      setPayment({ status: "error" })
      setErrorMessage(message ?? "An unknown error occurred")
    }
  }

  return (
    <>
      <form className="w-full sm:w-[360px] flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <Label>Full name</Label>
          <Input type="text" name="cardholderName" required />
        </div>
        <div>
          <Label>Email</Label>
          <Input type="email" name="email" required />
        </div>
        <PaymentElement
          onChange={(e) => {
            setPaymentType(e.value.type)
          }}
        />
        <Button className="h-auto px-8 py-3 text-lg mt-6" type="submit" disabled={!["initial", "succeeded", "error"].includes(payment.status) || !stripe}>
          Pay $100
        </Button>
      </form>
      <PaymentStatus status={payment.status} />
    </>
  )
}

export default function ElementsForm(): JSX.Element {
  return (
    <Elements
      stripe={getStripe()}
      options={{
        appearance: {
          variables: {
            colorIcon: "#6772e5",
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
          },
        },
        currency: "usd",
        mode: "payment",
        amount: 10000,
      }}
    >
      <CheckoutForm />
    </Elements>
  )
}
