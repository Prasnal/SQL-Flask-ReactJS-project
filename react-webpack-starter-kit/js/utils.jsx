import * as config from './config.js'

export function makeBackendURL(url){
  return window.HOST + ":" + window.BACKEND_PORT + url
}
