import { Bucket } from "../bucket"
import Header from "../demo/components/ui/header"
import Footer from "../demo/components/ui/footer"
import GithubLink from "../demo/components/ui/github-link"

export default async function Docs() {
  return (
    <main>
      <Header>
        <GithubLink />
      </Header>
      <div className="w-full border opacity-50"></div>
      <div className="min-h-screen">
        <Bucket view="DEV" hideViewSwitch={true} />
      </div>
      <Footer />
    </main>
  )
}
