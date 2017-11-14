import React, { Component } from 'react';
import ContentHeader from './ContentHeader';
import Selects from './Select';
import Tab from './Tab';
import Inputvalue from './Inputvalue';
import Button from './Button';
import DateTime from './DateTime';
import Formats from './Formats';
import Format from './Format';
import Ajax from './Ajax';//Ajax
import { Select,message, } from 'antd';
const Option = Select.Option;

class Newerlog extends Component {
	constructor(props){
		super(props);
		this.state = ({
			server:'',
			time:'',
			dayid:'',
			numberid:'',
			number:[],
			building:[],
			task:[],
			ii:'',
			day:''
		});
	};

	componentDidMount(){
		var t = new Date();
		var time = t.getTime()
		this.setState ({
			time:time
		});
	};

	//下拉
	svr = (value) => {
		this.setState ({
			server:value
		});
		const _this = this;
		Ajax({uniqueid:value},"counter.logger.last").then(function(r){
			var data = JSON.parse(r.data.result);
			_this.data(data);
			var id;
			for(var i in data){
				id = data[i].dayid
			}
			_this.setState ({
				dayid:id,
				day:id,
				ii:i
			});
		});
	};

	//time
	times = (date, dateString) => {
		if(date != null){
			console.log(date, dateString);
			var a = (date._d).getTime();
			this.setState ({
				time:a
			});
			//当前时间
			var d = new Date();
			var str = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
			var dd = new Date(str).getTime();
			//日历时间
			var s = (new Date(dateString).getTime()) - 28800000;
			// console.log(Format(str),Format(s))
			if(dd > s){
				var b = (dd - s)/86400000;
				this.setState ({
					numberid:b
				});
			};
		};
	};

	//服务器
	server = () => {
		var s = JSON.parse(localStorage['server@'+ localStorage.name]);
		return s.map((item,index) => {
					var uniqueid = JSON.stringify(item.uniqueid)
					return <Option key={index} value={uniqueid}>{uniqueid + '服务器'}</Option>;
				});
	};

	//默认日历当天时间
	datatime = () => {
		var c = this.state.ii;
		console.log(c)
		return c;
		
	};

	//ajax
	postajax = (dayid) => {
		const id = this.state.server;
		// const dayid = this.state.dayid --;
		console.log(id,dayid);		
		var _this = this;
		Ajax({uniqueid:id,dayid:dayid},"counter.logger.dayid").then(function(r){
			console.log(r.data.result);
			var data = r.data.result;
				_this.data(data)
		})
	}

	date = (strtime) => {
		var date = new Date(strtime.replace(/-/g, '/'));
		var time = date.getTime();
		return time;
	}

	info = () => {
		message.info('报错！！！');
	};

	qian = () => {
		var dayid = --this.state.dayid;
		this.postajax(dayid);
	};

	hou = () => {
		var dayid = ++this.state.dayid;
		if(dayid > this.state.day){
			--this.state.dayid;
			this.info();
		}else{
			this.postajax(dayid);
		}
		// var strtime = this.state.ii;
		// var date = new Date(strtime.replace(/-/g, '/'));
		// var time = date.getTime();
		// var datatime = Formats(time - 86400000);
		// this.setState ({
		// 	ii:datatime
		// });

	}

	//数据
	data = (str) => {
		var Sourceone = [];
		var Sourcetwo = [];
		var Sourcethree = [];
		var building = [];
		var task = [];
		if(typeof(str) == "string"){
			var str = JSON.parse(str);
		}
		console.log(str)
		for(var i in str){
			var a = str[i].data.roles;
			Sourceone = [{
				key:i,
				name:'总人数',
				cz:a
			}];
			console.log(i)
			this.setState ({
				ii:i
			})
			var counter = str[i].counter;
			for(var x = 0; x < counter.length; x++){
				if(counter[x].key.type == 1){
					building.push(counter[x]);
				}else if(counter[x].key.type == 2){
					task.push(counter[x]);
				}
				
			};
			var building = building.sort(function(a,b){ return a.key.param1 - b.key.param1 });
			var task = task.sort(function(a,b){ return a.key.param1 - b.key.param1 });
			for(var index = 0; index < building.length; index++){
				var data = building[index];
				var a = index + 1;
				a = {};
				a.key = index;
				a.building = data.key.param1;
				a.name = data.key.param1;
				a.value = data.value;
				Sourcetwo.push(a);
			};
			
			for(var index = 0; index < task.length; index++){
				var data = task[index];
				var a = index + 1;
				a = {};
				a.key = index;
				a.task = data.key.param1;
				a.name = data.key.param1;
				a.value = data.value;
				Sourcethree.push(a);
			};
		};
		this.setState ({
			number:Sourceone,
			building:Sourcetwo,
			task:Sourcethree
		});

	}
	// d = () => {
	
	// }

	render() {
	const colone = [{
		title: '名称',
		dataIndex: 'name',
		key: 'name',
	},{
		title: '操作',
		dataIndex: 'cz',
		key: 'cz',
	}]
	const coltwo =[{
		title: '建筑',
		dataIndex: 'building',
		key: 'building',
	},{
		title: '名称',
		dataIndex: 'name',
		key: 'name',
	},{
		title: 'value',
		dataIndex: 'value',
		key: 'value',
	}]

	const columns = [{
		  title: '任务',
		  dataIndex: 'task',
		  key: 'task',
		}, {
		  title: '名称',
		  dataIndex: 'name',
		  key: 'name',
		}, {
		  title: 'value',
		  dataIndex: 'value',
		  key: 'value',
	}];	
	
		return (
			<div>
				<ContentHeader header='新手统计表' />
				<Selects name='服务器:' val='请选择' data={this.server()} onChange={this.svr} />
				<Inputvalue name='日期:' val='日期' value={this.state.ii}/>
				<Button name='前一天' onClick={this.qian} />
				<Button name='后一天' onClick={this.hou} />
				<Tab dataSource={this.state.number} columns={colone} />
				<Tab dataSource={this.state.building} columns={coltwo} />
				<Tab dataSource={this.state.task} columns={columns} />
			</div>
		)
	}
}

export default Newerlog;