
import request from "../untils/request";
/**
  * @description 登录
  */
export function M_LOGIN(query) {
    return request({
        url: '/web/login',
        method: 'POST',
        data: query
    })
}

