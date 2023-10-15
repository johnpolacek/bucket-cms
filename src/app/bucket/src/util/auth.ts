import { NextResponse } from "next/server"
import { getSessionUser } from "../../../api/bucket/auth/get-session-user"

export async function checkPublicReadAccess(collectionName?: string) {
  const BLOCK_API_PUBLIC_READ = process.env.BLOCK_API_PUBLIC_READ || ""
  const NODE_ENV = process.env.NODE_ENV || ""
  const USE_SANDBOX = process.env.USE_SANDBOX || ""

  const isPublicReadAllowed = (collectionName?: string) => {
    if (collectionName) {
      return BLOCK_API_PUBLIC_READ !== "*" && !BLOCK_API_PUBLIC_READ.split(",").includes(collectionName)
    } else {
      return BLOCK_API_PUBLIC_READ === ""
    }
  }

  if (isPublicReadAllowed(collectionName)) {
    return { error: false, response: null }
  } else {
    const sessionUser = await getSessionUser()
    const isAuthorized = (NODE_ENV === "development" && USE_SANDBOX !== "true") || sessionUser

    if (!isAuthorized) {
      return { error: true, response: NextResponse.json({ error: `Not Authorized` }, { status: 401 }) }
    } else {
      return { error: false, response: null }
    }
  }
}

export async function checkPublicUploadAccess() {
  const ALLOW_API_PUBLIC_UPLOAD = process.env.ALLOW_API_PUBLIC_UPLOAD || ""
  const NODE_ENV = process.env.NODE_ENV || ""

  if (ALLOW_API_PUBLIC_UPLOAD === "true") {
    return { error: false, response: null }
  } else {
    const sessionUser = await getSessionUser()
    const isAuthorized = NODE_ENV === "development" || sessionUser

    if (isAuthorized) {
      return { error: false, response: null }
    } else {
      return { error: true, response: NextResponse.json({ error: `Not Authorized` }, { status: 401 }) }
    }
  }
}

export async function checkPublicWriteAccess(collectionName: string) {
  const ALLOW_API_PUBLIC_WRITE = process.env.ALLOW_API_PUBLIC_WRITE || ""
  const NODE_ENV = process.env.NODE_ENV || ""

  if (ALLOW_API_PUBLIC_WRITE.split(",").includes(collectionName)) {
    return { error: false, response: null }
  } else {
    const sessionUser = await getSessionUser()
    const isAuthorized = NODE_ENV === "development" || sessionUser

    if (isAuthorized) {
      return { error: false, response: null }
    } else {
      return { error: true, response: NextResponse.json({ error: `Not Authorized` }, { status: 401 }) }
    }
  }
}

export async function checkPrivateWriteAccess() {
  const sessionUser = await getSessionUser()
  if ((process.env.NODE_ENV !== "development" || process.env.USE_SANDBOX === "true") && !sessionUser) {
    return { error: true, response: NextResponse.json({ error: `Not Authorized` }, { status: 401 }) }
  } else {
    return { error: false, response: null }
  }
}
