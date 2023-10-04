import AdminHome from "../src/views/admin/AdminHome"
import { ViewSwitchButton } from "../src/views/ViewSwitchButton"

export default async function Admin() {
  return (
    <>
      <div className="min-h-screen w-full">
        <ViewSwitchButton currentView={"ADMIN"} />
        <>
          <AdminHome />
        </>
      </div>
    </>
  )
}
