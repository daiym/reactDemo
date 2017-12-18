import React, { Component } from 'react';
import ContentHeader from './ContentHeader';
import Input from './Input';
import Textareavalue from './Textareavalue';
import Button from './Button';
import Tab from './Tab';
import Time from './Time';
import gamedata from './gamedata';
import Ajax from './Ajax';//Ajax
import Selects from './Select';
import Multiselect from './Multiselect';
import { Select } from 'antd';
const Option = Select.Option;


class Announce extends Component {
	constructor(props){
		super(props);
		this.state = ({
			server:[],
			lang:'',
			textarea:'',
			table:[],
			time:'',
			interval:'',
			count:'',
			platid:'',
			send:{}
		})
	}

	componentDidMount(){
		Ajax({},'system.annouce.info').then(function(r){
			console.log('system.annouce.info: ',JSON.parse(r.data.result));
			// var s = JSON.parse(r.data.result);
			// for(var i in s){
			// 	var item = s[i];
			// 	console.log(JSON.parse(item.data))
			// }
		})
	}

	//日历13位毫秒
	onChange = (value, dateString) => {
		console.log('Selected Time: ', value);		
  		console.log('Formatted Selected Time: ', dateString);
  		var a = (value._d).getTime();
		this.setState ({
			time:a
		})
	}

	//语言
	lang = () => {
		var maillang = gamedata.lang;
		var list = Object.keys(maillang);
		var s = list.map(index => maillang[index]);
		// var a = 0;
		return s.map((item,index) => {
					return <Option key={index} value={item.value}>{ item.info + (item.value)}</Option>;
				})
	}

	//服务器
	server = () => {
		var s = JSON.parse(localStorage['server@'+ localStorage.name]);
		return s.map((item,index) => {
					var uniqueid = JSON.stringify(item.uniqueid)
					return <Option key={index} value={uniqueid}>{uniqueid + '服务器'}</Option>;
				})
	}

	//下拉server
	serverselect = (value) => {
		this.setState ({
			server:value
		})
		console.log(value);
	}

	//下拉lang
	langselect = (value) => {
		this.setState ({
			lang:value
		})
		var s = this.state.table;
		if(s.length > 0){
			for(var i = 0; i < s.length; i++){
				if(value === s[i].lang){
					this.setState ({
						textarea:s[i].content
					})
					break;
				}else{
					this.setState ({
						textarea:''
					})
				}
			}
		}
	}

	//文本框
	textvalue = (name,e) => {
		this.setState ({
			[name]:e.target.value
		})
	}

	//删除
	deleteitem = (id) => {
		this.setState ({
			table:this.state.table.filter(item => item.key !== id )
		})
	}

	//tab
	table = () => {
		var a = this.state.table;
		var i = a.length;
		i = {};
		i.key = a.length;
		for(var x = 0; x < a.length; x++){
			if(a[x].lang === this.state.lang){
				this.setState ({
					table:a.splice(x,1)
				})
				// this.state. = ;
				i.key = x + 0.1
			}	
		}
		
		i.server = this.state.server;
		i.lang = this.state.lang;
		i.content = this.state.textarea;
		i.operation = <Button name='删除' onClick={ () => this.deleteitem(i.key)}/>
		a.push(i);
		this.setState ({
			table:a
		})
	}

	//send
	send = () => {
		const a = {};
		a.allserver = false;
		a.begintime = this.state.time;
		a.count = this.state.count;
		a.duration = this.state.interval;
		a.endtime = 0;
		a.platid = this.state.platid;
		a.serverids = this.state.server;
		a.langs= {};
		var s = this.state.table;
		for(var i = 0; i < s.length; i++){
			var c = a.langs;
			var data = s[i].lang;
			console.log(data)
			var con = s[i].content;
			c[data] = con;
		}
		this.setState ({
			send:a
		})
	}

	//ajax
	// postajax = () => {
	// 	Ajax({
			
	// 	})
	// }

	render() {
		// const dataSource = [{
		// 	  key: '1',
		// 	  name: '胡彦斌',
		// 	  age: 32,
		// 	  address: '西湖区湖底公园1号'
		// 	}, {
		// 	  key: '2',
		// 	  name: '胡彦祖',
		// 	  age: 42,
		// 	  address: '西湖区湖底公园1号'
		// 	}, {
		// 	  key: '3',
		// 	  name: '胡彦祖',
		// 	  age: 42,
		// 	  address: '西湖区湖底公园1号'
		// }];
		const columns = [{
			title: 'lang',
			dataIndex: 'lang',
			key: 'lang',
		},{
			title: 'content',
			dataIndex: 'content',
			key: 'content',
		},{
			title: '操作',
			dataIndex: 'operation',
			key: 'operation',
		}]

		const col = [{
			  title: 'id',
			  dataIndex: 'id',
			  key: 'id',
			}, {
			  title: 'content',
			  dataIndex: 'content',
			  key: 'content',
			}, {
				title:'类别',
				dataIndex:'type',
				key:'type',
			},{
				title:'平台id',
				dataIndex:'platid',
				key:'platid',
			},{
				title:'name',
				dataIndex:'name',
				key:'name',
			},{
				title:'创建日期',
				dataIndex:'createtime',
				key:'createtime',
			},{
				title:'开始时间',
				dataIndex:'begintime',
				key:'begintime',
			},{
				title:'时间间隔',
				dataIndex:'duration',
				key:'duration',
			},{
				title:'count',
				dataIndex:'count',
				key:'count',
			}, {
			  title: '操作',
			  dataIndex: 'operation',
			  key: 'operation',
		}];	
		return (
			<div>
				<ContentHeader header='通知公告' />
				<Input name='平台id:' val='平台id' onChange={(e) => this.textvalue('platid',e)}/>
				<Multiselect name='服务器:' val='请选择' data={this.server()} onChange={this.serverselect}/>
				<Selects name='语言:' val='请选择' data={this.lang()} onChange={this.langselect}/>
				<Textareavalue name='公告内容:' val='公告内容' value={this.state.textarea} onChange={(e) => this.textvalue('textarea',e)}/>
				<Button name='保存' onClick={this.table}/>
				<Tab dataSource={this.state.table} columns={columns} />
				<Time name='开始时间:' onChange={this.onChange}/>
				<Input name='间隔:' val='间隔' onChange={(e) => this.textvalue('interval',e)}/>
				<Input name='count:' val='count' onChange={(e) => this.textvalue('count',e)}/>
				<Button name='确定' onClick={this.send}/>
				<ContentHeader header='Delete Notice' />
				<Tab  columns={col} />
			</div>
		)
	}
}

export default Announce;


