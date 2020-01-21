import request from '@/utils/request'

export const fetchUserInfo = (query) => {
  return request({
    url: '/user/userInfo',
    method: 'get',
    params: query
  })
}

export const userLogin = (params) => {
  return request({
    method: 'post',
    url: '/user/login',
    data: params
  })
}

export const userRegister = (params) => {
  return request({
    method: 'post',
    url: '/user/register',
    data: params
  })
}

export const userLoginout = () => {
  return request({
    method: 'post',
    url: '/user/loginout'
  })
}
