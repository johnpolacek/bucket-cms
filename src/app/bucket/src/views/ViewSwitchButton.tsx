import { Button } from "../ui"
import { View } from "./Home"

type ViewSwitchButtonProps = {
  currentView: View
  onSwitch: () => void
}

const ViewSwitchButton: React.FC<ViewSwitchButtonProps> = ({ currentView, onSwitch }) => {
  return (
    <Button onClick={onSwitch} variant="outline" className="absolute top-12 right-2 sm:right-4 flex items-center bg-white hover:bg-white opacity-80 hover:opacity-100 scale-90 sm:scale-100">
      {currentView === "ADMIN" ? (
        <>
          <span className="hidden sm:inline pr-1">Go to </span>
          <span> Docs</span>
          <span className="opacity-60 text-3xl font-thin relative ml-px left-1 -top-[2px]">»</span>
        </>
      ) : (
        <>
          <span className="opacity-60 text-3xl font-thin relative ml-px right-1 -top-[2px]">«</span>
          <span className="hidden sm:block pr-1">Go to </span>
          <span>Admin</span>
        </>
      )}
    </Button>
  )
}

export { ViewSwitchButton }
