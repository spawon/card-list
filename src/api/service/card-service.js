import axios from './axios'

const RESOURCE_NAME = '/'

export function getAll () {
  return axios.get(`${RESOURCE_NAME}`)
}
