import Cookies from 'js-cookie'

const userKey = 'userinfo-m'

export function getUserInfom() {
  return Cookies.get(userKey)
}

export function setUserInfom(userInfo) {
  return Cookies.set(userKey, userInfo)
}

export function removeUserInfom() {
  return Cookies.remove(userKey)
}
