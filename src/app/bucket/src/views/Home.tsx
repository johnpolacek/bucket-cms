import AdminHome from "./admin/AdminHome"
import DevHome from "./dev/DevHome"
import BucketProvider from "./providers/BucketProvider"

export type View = "ADMIN" | "DOCS"

function Home({ view }: { view?: View }) {
  return (
    <main className={`flex flex-col grow items-center relative w-full h-full`}>
      <BucketProvider>
        <>
          {view === "ADMIN" && (
            <div className="min-h-screen w-full">
              <AdminHome />
            </div>
          )}
          {view === "DOCS" && <DevHome />}
        </>
      </BucketProvider>
    </main>
  )
}

export default Home
