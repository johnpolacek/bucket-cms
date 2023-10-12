"use server"

import type { Stripe } from "stripe"
import { stripe } from "../stripe/node-stripe"
import { redirect } from "next/navigation"
import { headers } from "next/headers"

export async function createCheckoutSession(): Promise<void> {
  const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create({
    mode: "payment",
    submit_type: "pay",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          product_data: {
            name: "Bucket CMS Commercial Project License",
          },
          unit_amount: 10000,
        },
      },
    ],
    success_url: `${headers().get("origin")}/license/result?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${headers().get("origin")}/license`,
  })

  redirect(checkoutSession.url as string)
}

export async function createPaymentIntent(): Promise<{ client_secret: string }> {
  const paymentIntent: Stripe.PaymentIntent = await stripe.paymentIntents.create({
    amount: 10000,
    automatic_payment_methods: { enabled: true },
    currency: "usd",
  })

  return { client_secret: paymentIntent.client_secret as string }
}
