import request from '@/utils/request'

export function loadStatus () {
  return request({
    url: '/wallet/status',
    method: 'POST',
    params: {}
  })
}
