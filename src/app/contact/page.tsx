import Footer from "../demo/components/ui/footer"
import { BrandImage, PageHeading } from "../bucket/src/views/brand"
import ContactForm from "../demo/components/views/ContactForm"
import TransitionWrapper from "../bucket/src/views/admin/TransitionWrapper"

export default function Contact() {
  return (
    <main>
      <div className="py-12 px-8 border-t max-w-[480px] mx-auto text-center">
        <TransitionWrapper>
          <BrandImage />
          <PageHeading>Say Hello</PageHeading>
          <ContactForm />
        </TransitionWrapper>
      </div>
    </main>
  )
}
