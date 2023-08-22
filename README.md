# Bucket CMS

Sometimes you don’t want a CMS, you just need a bucket. Bucket CMS is the lightest lightweight CMS around – ready for you to drop into your Next.js project. 

---

### Creating a New Component Type and Adding to the Registry

#### 1. Create a New Component File
- Navigate to the `components` directory.
- Create a new file for your component. For this example, the file could be named `Video.tsx`.

#### 2. Define the Component Data Type using Zod
In the new component file:
- Import necessary libraries and types.
- Define the data structure for your component using Zod. This will specify the kind of data your component expects.
- Ensure the video URL is either from Vimeo or YouTube.

```typescript
import { z } from "zod"

const VideoComponentData = z.object({
  url: z.string().refine(url => url.includes("youtube.com") || url.includes("vimeo.com"), {
    message: "URL must be from YouTube or Vimeo",
  }),
  caption: z.optional(z.string()),
})
```

#### 3. Overview of Component Definition
Begin to outline your component, defining its type, validation method, and default data. Leave placeholders for `render` and `renderAdmin` methods.

```typescript
import { BaseComponent } from "../types"

type VideoComponentDataType = z.infer<typeof VideoComponentData>

const Video: BaseComponent<VideoComponentDataType> = {
  type: "Video",
  render: (data) => {
    // Placeholder for the render method
  },
  renderAdmin: (data, setData) => {
    // Placeholder for the renderAdmin method
  },
  validate: (data) => {
    const validationResult = VideoComponentData.safeParse(data)
    return validationResult.success
  },
  defaultData: {
    url: "",
    caption: "",
  },
}
```

#### 4. Rendering for the Admin Interface
Define the `renderAdmin` method. This determines how the component is displayed in the admin panel.

```typescript
renderAdmin: (data, setData) => {
  return (
    <div>
      <label>
        Video URL (YouTube/Vimeo only):
        <input 
          type="url" 
          value={data.url} 
          onChange={(e) => setData({ url: e.target.value })}
        />
      </label>
      <label>
        Caption (optional):
        <input 
          type="text" 
          value={data.caption} 
          onChange={(e) => setData({ caption: e.target.value })}
        />
      </label>
    </div>
  )
}
```

#### 5. Rendering the Component
Define the `render` method. This determines how the component is displayed on the site.

```typescript
render: (data) => {
  const isYouTube = data.url.includes("youtube.com")
  const embedUrl = isYouTube
    ? data.url.replace("watch?v=", "embed/")
    : data.url.replace("vimeo.com", "player.vimeo.com/video")

  return (
    <div>
      <iframe 
        src={embedUrl} 
        title={data.caption} 
        width="560" 
        height="315" 
        frameBorder="0" 
        allowFullScreen
      ></iframe>
      {data.caption && <p>{data.caption}</p>}
    </div>
  )
}
```

#### 6. Complete Component Definition
Now that `renderAdmin` and `render` methods are defined, your component definition is complete.

#### 7. Add Component to the Registry
- Open the `registry.ts` file in the `components` directory.
- Import the component you just created.
- Add the new component to the `componentRegistry` object.

```typescript
import Video from "./Video"

const componentRegistry: Record<string, BaseComponent<any>> = {
  // ... other components
  Video,
}
```

