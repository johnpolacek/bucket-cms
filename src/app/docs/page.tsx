import { Bucket } from "../bucket"
import Footer from "../demo/components/ui/footer"

export default async function Docs() {
  return (
    <main>
      <div className="w-full border opacity-50"></div>
      <div className="min-h-screen">
        <Bucket view="DEV" hideViewSwitch={true} />
      </div>
      <Footer />
    </main>
  )
}
