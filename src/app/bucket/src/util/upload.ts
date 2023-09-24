export async function uploadImageAndGetURL(file: File): Promise<string> {
  try {
    const formData = new FormData()
    formData.append("image", file)

    const response = await fetch("/api/bucket/upload/image", {
      method: "POST",
      body: formData,
    })

    if (response.ok) {
      const responseData = await response.json()
      return responseData.url
    } else {
      const errorData = await response.json()
      throw new Error(errorData.error || "Failed to upload image.")
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function uploadFileAndGetURL(file: File): Promise<string> {
  try {
    const formData = new FormData()
    formData.append("file", file)

    const response = await fetch("/api/bucket/upload/file", {
      method: "POST",
      body: formData,
    })

    if (response.ok) {
      const responseData = await response.json()
      return responseData.url
    } else {
      const errorData = await response.json()
      throw new Error(errorData.error || "Failed to upload file.")
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}
