import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import { DEVHOST, PROHOST } from '@/config/index'
import { Message } from 'element-ui'

const baseUrl = process.env.NODE_ENV === 'development' ? DEVHOST : PROHOST
class HttpRequest {
  public queue: any
  public constructor() {
    this.queue = {}
  }
  getInsideConfig() {
    const config = {
      baseURL: baseUrl,
      headers: {}
    }
    return config
  }
  destroy(url: string) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // hide loading
    }
  }
  interceptors(instance: any, url?: string) {
    // 请求拦截
    instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        // 添加全局的loading...
        if (!Object.keys(this.queue).length) {
        }
        if (url) {
          this.queue[url] = true
        }
        return config
      },
      (error: any) => {
        return Promise.reject(error)
      }
    )
    // 响应拦截
    instance.interceptors.response.use(
      (res: AxiosResponse) => {
        if (url) {
          this.destroy(url)
        }
        const { data, status } = res
        if (data.type == 'application/octet-stream') {
          return Object.assign(
            {},
            {
              data,
              status
            },
            { header: res.headers }
          )
        } else {
          return { data, status }
        }
        return { data, status }
      },
      (error: any) => {
        if (url) {
          this.destroy(url)
        }
        if (error && error.request) {
          const status = error.request.status
          switch (status) {
            case 401:
              Message({
                message: '接口配置未经授权！',
                type: 'error',
                duration: 3000
              })
              break
            case 404:
              Message({
                message: '服务端接口未找到！',
                type: 'error',
                duration: 3000
              })
              break
            case 415:
              Message({
                message: 'HTTP协议不匹配，请确认！',
                type: 'error',
                duration: 3000
              })
              break
            case 500:
              Message({
                message: '服务器未启动！',
                type: 'error',
                duration: 3000
              })
              break
            default:
              Message({ message: '未知错误！', type: 'error', duration: 3000 })
              break
          }
        }
        return Promise.reject(error)
      }
    )
  }
  async request(options: AxiosRequestConfig) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    await this.interceptors(instance, options.url)
    return instance(options)
  }
}

const serve = new HttpRequest()

export const post = (url: string, params?: any) => {
  return serve.request({
    url,
    params,
    method: 'POST'
  })
}

export const get = (url: string, params?: any) => {
  return serve.request({
    url,
    params,
    method: 'GET'
  })
}

export const download = (url: string, filename: string, params?: any) => {
  return serve
    .request({
      url,
      params,
      method: 'POST',
      responseType: 'blob'
    })
    .then(res => {
      const content = res.data
      const blob = new Blob([content])
      if ('download' in document.createElement('a')) {
        const elink = document.createElement('a')
        elink.download = filename
        elink.style.display = 'none'
        elink.href = URL.createObjectURL(blob)
        document.body.appendChild(elink)
        elink.click()
        URL.revokeObjectURL(elink.href)
        document.body.removeChild(elink)
      } else {
        navigator.msSaveBlob(blob, filename)
      }
    })
    .catch(r => {
      console.error(r)
      Message({
        message: '下载失败',
        type: 'error'
      })
    })
}
