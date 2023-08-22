import { BaseComponent } from "../types"
import { Image, RichText } from "./base"

// Define the component registry object
const componentRegistry: Record<string, BaseComponent<any>> = {
  Image,
  RichText,
  // Add other components to the registry here...
}

export default componentRegistry
