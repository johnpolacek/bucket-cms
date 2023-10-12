import type { Stripe } from "stripe"
import Link from "next/link"
import { PageHeading } from "@/app/bucket/src/views/brand"
import { stripe } from "../stripe/node-stripe"

export default async function ResultPage({ searchParams }: { searchParams: { payment_intent: string } }): Promise<JSX.Element> {
  if (!searchParams.payment_intent) throw new Error("Please provide a valid payment_intent (`pi_...`)")

  const paymentIntent: Stripe.PaymentIntent = await stripe.paymentIntents.retrieve(searchParams.payment_intent)

  return (
    <div className="flex flex-col items-center gap-4 sm:pt-16">
      {paymentIntent.status === "succeeded" ? (
        <>
          <PageHeading>Payment Successful</PageHeading>
          <p className="opacity-70">Your license has been registered. Thank you!</p>
          <p className="opacity-70">You can start using Bucket CMS on your commercial project.</p>
          <Link className="rounded-lg px-4 py-2 bg-blue-600 text-white text-xl my-4" href="/bucket/docs">
            Go to Docs
          </Link>
        </>
      ) : (
        <>
          <PageHeading>Payment Failed</PageHeading>
          <p className="opacity-70">Your payment didn’t go through but do not fear!</p>
          <Link className="rounded-lg px-4 py-2 bg-blue-600 text-white text-xl my-4" href="/contact">
            Contact Us
          </Link>
        </>
      )}
    </div>
  )
}
