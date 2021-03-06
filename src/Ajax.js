import axios from 'axios';
import CryptoJS from 'crypto-js';

function postAxios(args, cmd) {
  const token = localStorage['token@' + localStorage.name];
  const signkey = localStorage['signkey@' + localStorage.name];
  const time = '' + parseInt(new Date().getTime() / 1000);
  if(token == undefined || signkey == undefined){
    return window.location.href = '/login';
  };
  return axios({
    url: '/gmservice',
    method: 'post',
    headers: {
      'Content-Type': 'text/plain;charset=UTF-8'
    },
    data: JSON.stringify({
      args: JSON.stringify(args),
      sign: CryptoJS.HmacMD5(cmd + token + JSON.stringify(args) + time, signkey).toString(),
      cmd: cmd,
      time: time,
      token: token
    })
  }).then(function (data) {
    if (data.data.errorcode == 6) {
      return window.location.href = '/login';
    }else if(data.data.errorcode == 0){
      return data;
    // }
    }else if(data.data.errorcode != 0){
      console.log('data.data.errorcode: ',data.data.errorcode,'data.data.message: ',data.data.message);
    }

    
  })
}

export default postAxios;