import axios from 'axios';
import urls from './url';
import { message } from 'antd';

export const external = (urlKey, postData = {}) => {
  const method = urls[urlKey].method;
  const url = '/api' + urls[urlKey].url;

  return new Promise((resolve, reject) => {
    if (method === 'get') {
      axios.get(url, {
        params: postData
      })
        .then((response) => {
          resolve(response.data)
        })
        .catch((response) => {
          message.error('请求出错了: ' + error.message)
        })
    } else {
      axios({
        method: method,
        url: url,
        data: postData,
      })
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          message.error('请求出错了: ' + error.message)
        })
    }

  })
}