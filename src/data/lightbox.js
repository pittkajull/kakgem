let openHandler = null

export function setOpenHandler(handler) {
  openHandler = handler
}

export function openPhoto(src, alt = '') {
  if (openHandler) openHandler(src, alt)
}
