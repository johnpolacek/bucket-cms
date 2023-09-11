export const ALLOWED_IMAGE_MIME_TYPES = [
  // Images
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/bmp",
  "image/tiff",
  "image/svg+xml",
]

export const ALLOWED_MIME_TYPES = [
  // Images
  ...ALLOWED_IMAGE_MIME_TYPES,

  // Videos
  "video/mp4",
  "video/mpeg",
  "video/ogg",
  "video/webm",
  "video/3gpp",
  "video/3gpp2",

  // Audio
  "audio/mpeg",
  "audio/wav",
  "audio/webm",
  "audio/3gpp",
  "audio/3gpp2",
  "audio/aac",
  "audio/ogg",
  "audio/flac",

  // Adobe
  "application/pdf",
  "application/illustrator",
  "application/vnd.adobe.photoshop",

  // Microsoft Office
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.ms-excel",
  "application/vnd.ms-powerpoint",

  // OpenOffice
  "application/vnd.oasis.opendocument.text",
  "application/vnd.oasis.opendocument.spreadsheet",
  "application/vnd.oasis.opendocument.presentation",

  // Text
  "text/plain",
  "text/csv",
  "text/rtf",
  "text/html",
  "text/xml",

  // Archives
  "application/zip",
  "application/x-rar-compressed",
  "application/x-7z-compressed",
  "application/x-tar",
  "application/x-bzip2",

  // Code
  "application/javascript",
  "application/json",
  "application/xml",
  "text/css",
  "text/javascript",
  "application/x-httpd-php",
  "application/x-python-code",
  "application/java-archive",
  "application/x-ruby",

  // Other
  "application/octet-stream",
]
