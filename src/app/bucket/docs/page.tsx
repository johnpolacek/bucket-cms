import DevHome from "../src/views/dev/DevHome"
import { ViewSwitchButton } from "../src/views/ViewSwitchButton"

export default async function Dev() {
  return (
    <>
      <div className="min-h-screen w-full">
        <ViewSwitchButton currentView={"DOCS"} />
        <>
          <DevHome />
        </>
      </div>
    </>
  )
}
