import Header from "../demo/components/ui/header"
import GithubLink from "../demo/components/ui/github-link"
import { BrandImage, PageHeading } from "../bucket/src/views/brand"
import ContactForm from "../demo/components/views/ContactForm"

export default function Contact() {
  return (
    <main>
      <Header>
        <GithubLink />
      </Header>
      <div className="py-12 border-t max-w-[480px] mx-auto text-center">
        <BrandImage />
        <PageHeading>Say Hello</PageHeading>
        <ContactForm />
      </div>
    </main>
  )
}
