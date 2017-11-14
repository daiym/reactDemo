import React, { Component } from 'react';
import Input from './Input';
import Button from './Button';
//import Home from './Home';//Home
// import Ajax from './Ajax';
import axios from 'axios';
import CryptoJS from 'crypto-js';//md5

class Login extends Component {
	constructor(props){
		super(props);
		this.state = {
			username:'',
			password:''
		}
	}
	usernameonchange = (e) => {
		this.setState ({
			username: e.target.value
		})
		// console.log(this.state.username)
	}
	passwordonchange = (e) => {
		this.setState ({
			password: e.target.value
		})
		// console.log(this.state.password)
	}
	randomNonce = () => {
		var len = 24;
		var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
		var maxPos = chars.length;
		var str = '';
		var i ;
		for (i = 0; i < len; i++)
			str += chars.charAt(Math.floor(Math.random() * maxPos));
		return str;
	}
	loginAjax = () => {
		var _this = this;
		axios({
			url: '/gmservice',
	        method: 'post',
	        headers: {         
	          'Content-Type': 'text/plain;charset=UTF-8'
	        },
	        data:JSON.stringify({
	        	args:{},
	        	cmd:'login.challenge'
	        })
		}).then(function(r){
			console.log('username: ' , _this.state.username)
	        var challenge = r.data.result;
	        var pwdkey = CryptoJS.MD5(_this.state.username + _this.state.password).toString();
	        var response = CryptoJS.HmacMD5(challenge, pwdkey).toString();
		    var nonce = _this.randomNonce();
		    if(challenge && pwdkey && response && nonce){
		    	axios({
		    		url: '/gmservice',
			        method: 'post',
			        headers: {         
			          'Content-Type': 'text/plain;charset=UTF-8'
			        },
			        data:JSON.stringify({
			        	args:JSON.stringify({
			        		challenge : challenge,
							username : _this.state.username,
							response : response,
							nonce : nonce
			        	}),
			        	cmd:'login.login',
			        })
		    	}).then(function(r){
		    		if(r.data.errorcode == 0){
		    			var res = JSON.parse(r.data.result);
		    			console.log('login.login: ',res)
		    			var signkey = CryptoJS.HmacMD5(nonce + res.nonce,pwdkey).toString();
		    			localStorage.name = _this.state.username;
		    			localStorage['token@'+ localStorage.name] = res.token;
		    			localStorage['signkey@' + localStorage.name] = signkey;
		    			console.log(_this.props)
		    			_this.props.history.push('/');
		    		}

		    	})
		    }
	    })
		// Ajax({},'login.challenge').then(function(r){
		// 	console.log('username: ' , _this.state.username)
		//     // console.log('login.challenge: ',r.data.result);
		//     var challenge = r.data.result;
		//     var pwdkey = CryptoJS.MD5(_this.state.username + _this.state.password).toString();
		//     var response = CryptoJS.HmacMD5(challenge, pwdkey).toString();
		//     var nonce = _this.randomNonce();
		//     if(challenge && pwdkey && response && nonce){
		//     	Ajax({
		//     		challenge : challenge,
		// 			username : _this.state.username,
		// 			response : response,
		// 			nonce : nonce
		//     	},"login.login").then(function(r){
		//     		// console.log(r);
		    		// if(r.data.errorcode == 0){
		    		// 	var res = JSON.parse(r.data.result);
		    		// 	console.log('login.login: ',res)
		    		// 	var signkey = CryptoJS.HmacMD5(nonce + res.nonce,pwdkey).toString();
		    		// 	localStorage.name = _this.state.username;
		    		// 	localStorage['token@'+ localStorage.name] = res.token;
		    		// 	localStorage['signkey@' + localStorage.name] = signkey;
		    		// 	console.log(_this.props)
		    		// 	_this.props.history.push('/Home');
		    		// }
		//     	})
		//     }
		// })

	}
	



	// onClickHandle = () => {
	// 	this.props.history.push('/Home');
	// 	axios.post('/gmservice', {
	// 		    method: 'post',
	// 		    url: '/gmservice',
	// 		    data: JSON.stringify({
	// 		    	sign:md5(cmd + token + JSON.stringify(args) + ss, signkey).toString(),
	// 		    	cmd:'servers.infos',
	// 		    	token:token,
	// 		    	args:JSON.stringify(args),
	// 		    	time:ss
	// 		    }),
	// 		    responseType:'json',
	// 		    contentType:'text/plain;charset=UTF-8',

	// 	}).then(function (response) {
	// 			httpresult(response)
	// 		    console.log(response);
	// 	})
	// }
	render() {
		return (
			<div className='App'>
				<Input name='账号:' val='账号' onChange={this.usernameonchange}/>
				<Input name='密码:' val='密码' onChange={this.passwordonchange}/>
				<Button name='登录'  onClick={this.loginAjax}/>
			</div>
		)
	}
}

export default Login;