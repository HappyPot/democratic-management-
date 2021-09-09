export function validateTelephone(rule, value, callback) {
  let val = new RegExp('/^1[34578]\d{9}$/').test(value)
  if (value && !val) {
    callback(new Error(rule.message || '请输入正确手机号码'))
  } else {
    callback()
  }
}