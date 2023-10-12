import { PageHeading } from "../bucket/src/views/brand"
import TransitionWrapper from "../bucket/src/views/admin/TransitionWrapper"
import RefundForm from "../demo/components/views/RefundForm"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Bucket CMS | Refund Policy",
}

export default function Refund() {
  return (
    <main>
      <div className="py-12 flex justify-center ">
        <TransitionWrapper>
          <div className="prose max-w-[720px] px-4 pb-16">
            <PageHeading>Refund Policy</PageHeading>
            <p className="text-sm italic -mt-8">Effective Date: October 12, 2023</p>

            <p className="text-gray-600 mb-4">At Bucket CMS, we believe in the quality of our product and want to ensure our customers are fully satisfied.</p>
            <p className="text-gray-600 mb-4">
              If you're not completely satisfied with your purchase, we offer a <span className="font-semibold">full refund</span> within <span className="font-semibold">30 days</span> of your
              purchase date.
            </p>
            <p className="text-gray-600 mb-4">
              All payments are processed via <span className="font-semibold">Stripe</span>. To initiate a refund, please contact our support team with your payment details.
            </p>
            <RefundForm />
          </div>
        </TransitionWrapper>
      </div>
    </main>
  )
}
