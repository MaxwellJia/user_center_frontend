import {extend} from 'umi-request'
import {message} from "antd";
import {stringify} from "querystring";
import {history} from "@@/core/history";


const request = extend({
  withCredentials: true, // 关键：让请求自动带上 Cookie
  credentials:'include',
  prefix: process.env.NODE_ENV === 'production' ? 'https://usercenter-ahfugpghdgcga6hy.australiaeast-01.azurewebsites.net' : undefined,
  // requestType: form,
});



request.interceptors.request.use((url,options):any =>{

  console.log(`do request url = ${url}`)
  return{
    url,
    options: {
      ...options,
      headers: {},
    },
  };
  });


request.interceptors.response.use(async (response,options): Promise<any> => {
  const res = await response.clone().json();
  if (res.code === 0){
    return res.data;
  }

  if(res.code === 40100){
    message.error('Please log in first');
    history.replace({
      pathname: '/user/login',
      search:stringify({
        redirect: location.pathname,
      }),
    });
  }else {
    message.error(res.description);
  }
  return res.data;
});
export default request;
