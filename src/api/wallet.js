import request from '@/utils/request'

export function loadStatus () {
  return request({
    url: '/wallet/status',
    method: 'POST',
    params: {}
  })
}

export function loadAccountInfo (data) {
  return request({
    url: '/wallet/eth',
    method: 'POST',
    data
  })
}

export function loadMiningRescord (data) {
  return request({
    url: '/wallet/eth/record',
    method: 'POST',
    data
  })
}
