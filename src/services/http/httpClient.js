import axios from 'axios';

const bodySendData = ['put', 'post', 'patch'];
const querySendData = ['get', 'delete'];

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export function httpInstanceConfig({
                                     method,
                                     url,
                                     params,
                                     headers,
                                     excludedHeaders,
                                   }) {
  return {
    data: bodySendData.includes(method) ? params : null,
    headers: {
      ...headers,
      // todo: add Authorization header if needed
    },
    method,
    params: querySendData.includes(method) ? params : null,
    transformRequest: [
      (data, oldHeaders) => {
        excludedHeaders?.forEach((item) => {
          if (oldHeaders) {
            delete oldHeaders[item];
            if (typeof oldHeaders.common === 'object') {
              delete oldHeaders.common[item];
            }
          }
        });
        return data;
      },
    ],
    url,
  };
}

export function getData({
                          url,
                          params,
                          headers = {},
                          excludedHeaders,
                        }) {
  const config = httpInstanceConfig({
    method: 'get',
    url,
    params,
    headers,
    excludedHeaders,
  });
  return axios.get(url, config);
}

export function postData({
                           url,
                           params,
                           headers = {},
                           excludedHeaders,
                         }) {
  const config = httpInstanceConfig({
    method: 'post',
    url,
    params,
    headers,
    excludedHeaders,
  });
  return axios.post(url, params, config);
}

export function putData({
                          url,
                          params,
                          headers = {},
                          excludedHeaders,
                        }) {
  const config = httpInstanceConfig({
    method: 'put',
    url,
    params,
    headers,
    excludedHeaders,
  });
  return axios(config);
}

export function deleteData({
                             url,
                             params,
                             headers = {},
                             excludedHeaders,
                           }) {
  const config = httpInstanceConfig({
    method: 'delete',
    url,
    params,
    headers,
    excludedHeaders,
  });
  return axios(config);
}
