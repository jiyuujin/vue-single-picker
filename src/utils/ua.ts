export const isIe11 = (): boolean => {
  const ua = navigator.userAgent.toLowerCase()
  if (ua.indexOf('trident') != -1) {
    return true
  }
  return false
}
