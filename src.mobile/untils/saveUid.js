import Cookies from 'js-cookie'

const uuidKey = 'uuid-m'

export function getUuid() {
  return Cookies.get(uuidKey)
}

export function setUuid(uuid) {
  return Cookies.set(uuidKey, uuid)
}

export function removeUuid() {
  return Cookies.remove(uuidKey)
}
