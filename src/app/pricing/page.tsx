import TransitionWrapper from "../bucket/src/views/admin/TransitionWrapper"
import PricingView from "../demo/components/views/Pricing"

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
