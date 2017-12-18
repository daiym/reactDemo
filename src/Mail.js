import React, { Component } from 'react';
import ContentHeader from './ContentHeader';
import Selects from './Select';
import Input from './Input';
import Inputvalue from './Inputvalue';
import Tab from './Tab';
import Textareavalue from './Textareavalue';
import Button from './Button';
import { Select } from 'antd';
import Ajax from './Ajax';//Ajax
import Alert from './Alert';//Alert
const Option = Select.Option;

class Mail extends Component {
	constructor(props){
		super(props);
		this.state = {
			server:'',
			sessionid:'',
			mailType:'',
			isOpen: true,
			obj:[],
			title1:'',
			title2:'',
			content:'',
			table:[],
			mailname:'',
			time:''
		}
	}

	handleChange = (value) => {
		var s = JSON.parse(localStorage['server@'+ localStorage.name]);
		var online = '';
		for (var i = 0; i < s.length; i++) {
			if (s[i].uniqueid === value) {
				online = s[i].online
			}
		}
		this.setState({
			isOpen: online,
			server:value
		})
		if(online){
			this.getAjax(value)
		}
	}

	timechange = (value) => {
		this.setState ({
			time:value
		})
	}

	sessionidvalue = (e) => {
		this.setState ({
			sessionid:e.target.value
		})
	}

	getAjax = (server) => {
		const _this = this;
		Ajax({
			id:server
		},'rolemail.datas').then(function(r){
			console.log(r)
			var res = JSON.parse(r.data.result);
			console.log('rolemail.datas: ',res);
			if(res){
				_this.setState ({
					obj:res
				})
			}
		})
	}

	mailtype = () => {
		var x = this.state.obj;
		return x.map((item,index) => {
					var dataid = JSON.stringify(item.dataid);
					return <Option key={index} value={dataid}>{ item.mailname }</Option>;
				})
	}

	afterTime = () => {
		var x = [{value:300,text:'延迟5分钟'},{value:900,text:'延迟15分钟'},{value:1800,text:'延迟30分钟'},{value:3600,text:'延迟60分钟'}];
		return x.map((item,index) => {
			var value = JSON.stringify(item.value);
			return <Option key={index} value={value}>{ item.text }</Option>;
		})
	}

	mailtypeChange = (value) => {
		var x = this.state.obj;
		for(var i = 0; i < x.length; i++){
			if(value === x[i].dataid){
				this.setState ({
					mailType:value,
					mailname:x[i].mailname
				})
			}
		}
		// this.setState ({
		// 	mailType:value
		// })

		if(value !== ''){
			this.inputtitle1(value,'title1',0)
			this.inputtitle1(value,'title2',1)
			this.inputtitle1(value,'content',2)
			this.inputtitle1(value,null,null)
		}
	}

	inputtitle1 = (value,key,number) => {
		var x = this.state.obj;
		for(var i = 0; i < x.length; i++){
			if(value === x[i].dataid){
				if(key !== '' &&  typeof(number) === 'number'){
					this.setState ({
						[key]:x[i].texts[number]
					})
				}else{
					
					var item = [];
					var tab = x[i].items;
					var a = 0;
					for(var index in tab){
						var s = tab[index];
						s = {};
						s.key = a++; 
						s.name = index;
						s.count = tab[index];
						item.push(s);
					}
					this.setState ({
						table:item
					})
				}
				
			}
		}
	}

	send = () => {
		var mail = {};
		var _args = [];
		mail = {
			args:_args,
			id:this.state.server,
			sessionid:this.state.sessionid,
			dataid:this.state.mailType,
			mailname:this.state.mailname,
			delay:this.state.time
		}
		Ajax(mail,'rolemail.post').then(function(r){
			var res = JSON.parse(r.data.result)
			console.log('rolemail.post: ',res);
		})	
	}
	
	server = () => {
		var s = JSON.parse(localStorage['server@'+ localStorage.name]);
		return s.map((item,index) => {
					var uniqueid = JSON.stringify(item.uniqueid)
					return <Option key={index} value={uniqueid}>{uniqueid + '服务器'}</Option>;
				})
	}

	render() {
		const columns = [{
		  title: '名称',
		  dataIndex: 'name',
		  key: 'name',
		}, {
		  title: '数量',
		  dataIndex: 'count',
		  key: 'count',
		}];
		return (
			<div>
				{!this.state.isOpen && <Alert data='该服务器没开启'/>}
				<ContentHeader header='用户信息' />
				<Selects name='服务器:' val='请选择' data={this.server()} onChange={this.handleChange} />
				<Input name='用户sessionid:' val='sessionid' onChange={this.sessionidvalue}/>
				<ContentHeader header='邮件' />
				<Selects name='邮件类型:' val='请选择' data={this.mailtype()} onChange={this.mailtypeChange}/>
				<Inputvalue name='主标题:' val='主标题' value={this.state.title1}/>
				<Inputvalue name='副标题:' val='副标题' value={this.state.title2}/>
				<Textareavalue name='邮件内容:' val='邮件内容' value={this.state.content}/>
				<ContentHeader header='附件' />
				<Tab dataSource={this.state.table} columns={columns} />
				<Selects name='发送延迟:' val='请选择' data={this.afterTime()} onChange={this.timechange}/>
				<Button name='发送' onClick={this.send}/>
			</div>
		)
	}
}

export default Mail;