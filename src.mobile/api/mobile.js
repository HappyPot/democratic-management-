
import request from "../untils/request";
/**
  * @description 登录
  */
export function LOGIN(query) {
    return request({
        url: '/web/login',
        method: 'POST',
        data: query
    })
}

