import Header from "../demo/components/ui/header"
import GithubLink from "../demo/components/ui/github-link"
import { BrandImage, PageHeading } from "../bucket/src/views/brand"
import ContactForm from "../demo/components/views/ContactForm"
import TransitionWrapper from "../bucket/src/views/admin/TransitionWrapper"

export default function Contact() {
  return (
    <main>
      <Header>
        <GithubLink />
      </Header>
      <div className="py-12 border-t max-w-[480px] mx-auto text-center">
        <TransitionWrapper>
          <BrandImage />
          <PageHeading>Say Hello</PageHeading>
          <ContactForm />
        </TransitionWrapper>
      </div>
    </main>
  )
}
