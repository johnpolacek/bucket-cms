import TransitionWrapper from "../bucket/src/views/admin/TransitionWrapper"
import PricingView from "../demo/components/views/Pricing"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Bucket CMS | Pricing",
}

export default function Pricing() {
  return (
    <main>
      <div className="py-12 px-8 border-t mx-auto text-center">
        <TransitionWrapper>
          <PricingView />
        </TransitionWrapper>
      </div>
    </main>
  )
}
