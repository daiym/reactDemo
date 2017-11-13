import React, { Component } from 'react';
import ContentHeader from './ContentHeader';
import Selects from './Select';
import Selectss from './Multiselect';
import Tab from './Tab';
import But from './But';
import DateTime from './DateTime';
import Formats from './Formats';
import Format from './Format';
import Ajax from './Ajax';//Ajax
import gamedata from './gamedata';
import { Select,message,Button } from 'antd';
const Option = Select.Option;

class TempActivition extends Component {
	constructor(props){
		super(props);
		this.state = ({
			dataone:[],
			ch:'',
			type:'',
			typename:'',
			objhtml:[],
			begintime:'',
			endtime:'',
			datatwo:[],
			plat:'',
			svr:[],
			dataid:''
		})
	}

	componentDidMount(){
		this.postajax();
		this.serverajax();
		var t = new Date();
		var time = t.getTime()
		this.setState ({
			begintime:time,
			endtime:time
		});
	};

	//默认日历当天时间
	datatime = () => {
		var s = new Date();
		var c = Formats(s);	
		return c;
	}

	//beg  13位	
	beg = (date, dateString) => {
		if(date != null){
			console.log(date, dateString);
			var a = (date._d).getTime();
			this.setState ({
				begintime:a
			});
		};
	};

	//end  13位	
	end = (date, dateString) => {
		if(date != null){
			console.log(date, dateString);
			var a = (date._d).getTime();
			this.setState ({
				endtime:a
			});
		};
	};

	//活动类型
	type = () => {
		var arr = [];
	    var html = [];
	    var data = gamedata.tempactivation;
	    for(var i=0;i<data.length;i++){
	       var type = data[i].type;
	       arr.push(type);
	       var uniqueArr = arr.filter(function(element, index, self){
	       		return self.indexOf(element) === index;
	       });
	    }
	    for(var x=0;x<uniqueArr.length;x++){
	        var unique=uniqueArr[x];
	        const s = <Option key={x} value={unique}>{unique}</Option>;
	        html.push(s);
	    }
	    return html;
	}

	//活动名称
	typename = (type) => {
		var html = [];
		var data = gamedata.tempactivation;
		for(var i = 0; i < data.length; i++){
			if(type == data[i].type){
				var name = data[i].name;
				const s = <Option key={i} value={data[i].dataid}>{name}</Option>;
				html.push(s);
			}
		}
			this.setState ({
				objhtml:html
			});
	}

	//下拉
	typesvr = (name,value) => {
		this.setState ({
			[name]:value
		});
		if(name == 'type'){
			this.typename(value)
		};
	}
	
	jinyongAjax = (key) => {
		Ajax({key:key},"servers.operate.activition.close").then(function(r){
			var data = JSON.parse(r.data.result);
			console.log(data);
		})
	};

	jiangliAjax = (key) => {
		Ajax({key:key},"servers.operate.activition.reward").then(function(r){
			var data = JSON.parse(r.data.result);
			console.log(data);
		})
	};

	//服务器
	server = () => {
		var s = JSON.parse(localStorage['server@'+ localStorage.name]);
		return s.map((item,index) => {
					var uniqueid = JSON.stringify(item.uniqueid)
					return <Option key={index} value={uniqueid}>{uniqueid + '服务器'}</Option>;
				});
	};

	//plat
	platid = () => {
		var data = [{name:'longyuan'},{name:'inner'}];
		return data.map(function(item,index){
			return <Option key={index} value={item.name}>{item.name}</Option>;
		})
	}

	postajax = () => {
		const _this = this;
		Ajax({},"servers.operate.activition.events").then(function(r){
			var data = JSON.parse(r.data.result);
			console.log(data);
			var ss = [];
			for(var i = 0; i < data.length; i++){
				var tem = data[i];
				var dataone = i;
				let keys = tem.key;
				dataone = {};
				dataone.key = i;
				dataone.index = i;
				dataone.begtime = Format(tem.begintime);
				dataone.endtime = Format(tem.endtime);
				dataone.dataid = tem.dataid;
				dataone.enable = ''+tem.enable;
				dataone.server = tem.svrs;
				dataone.keys = tem.key;
				dataone.plat = tem.platid;
				dataone.cz = <div><Button type="primary" onClick={() => _this.jinyongAjax(keys)} >禁用</Button><Button type="primary" onClick={() => _this.jiangliAjax(keys)} >发送奖励</Button></div>
				ss.push(dataone);
			}
			_this.setState ({
				dataone:ss
			})
		})
	}

	openajax = () => {
		Ajax({platid:this.state.plat , 
			dataid:this.state.dataid , 
			begin:this.state.begintime ,
			end:this.state.endtime , 
			servers:this.state.svr},"servers.operate.activition.open").then(function(r){
				var data = JSON.parse(r.data.result);
				console.log(data);
			})
	}

	serverajax = () => {
		const _this = this;
		Ajax({},"servers.operate.activition.servers").then(function(r){
			var data = JSON.parse(r.data.result);
			console.log(data);
			var ss = [];
			for(var i in data){
				var t = JSON.parse(data[i]);
				for(var index = 0; index < t.length; index++){
					var servers=t[index];
					// console.log(servers)
					// if(){
						var datatwo = i;
						datatwo = {};
						datatwo.key = index;
						datatwo.server = i;
						datatwo.platid = servers.platid;
						datatwo.keys = servers.key; 
						datatwo.status = servers.status;
						datatwo.beg = Format(servers.begin);
						datatwo.end = Format(servers.end);
						datatwo.dataid = servers.dataid;
						ss.push(datatwo);
				}
			}
			_this.setState ({
				datatwo:ss
			})
		})
	}

	render(){
		const col = [{
			title:'服务器',
			dataIndex:'server',
			key:'server'
		},{
			title:'platid',
			dataIndex:'platid',
			key:'platid'
		},{
			title:'key',
			dataIndex:'keys',
			key:'keys'
		},{
			title:'status',
			dataIndex:'status',
			key:'status'
		},{
			title:'beg',
			dataIndex:'beg',
			key:'beg'
		},{
			title:'end',
			dataIndex:'end',
			key:'end'
		},{
			title:'dataid',
			dataIndex:'dataid',
			key:'dataid'
		}]

		const columns = [{
		  title: '序号',
		  dataIndex: 'index',
		  key: 'index',
		}, {
		  title: '开始时间',
		  dataIndex: 'begtime',
		  key: 'begtime',
		}, {
		  title: '结束时间',
		  dataIndex: 'endtime',
		  key: 'endtime',
		}, {
			title:'dataid',
			dataIndex:'dataid',
			key:'dataid',
		}, {
			title:'enable',
			dataIndex:'enable',
			key:'enable',
		}, {
			title:'server',
			dataIndex:'server',
			key:'server',
		}, {
			title:'key',
			dataIndex:'keys',
			key:'keys',
		}, {
			title:'plat',
			dataIndex:'plat',
			key:'plat',
		}, {
			title:'操作',
			dataIndex:'cz',
			key:'cz',
		}];
		return (
			<div>
				<ContentHeader header='Temp Activition' />
				<Tab dataSource={this.state.dataone} columns={columns} />
				<Selects name='plat:' val='请选择' data={this.platid()} onChange={(value) => this.typesvr('plat',value)} />
				<Selectss name='服务器:' val='请选择' data={this.server()} onChange={(value) => this.typesvr('svr',value)} />
				<Selects name='活动类型:' val='请选择' data={this.type()}  onChange={(value) => this.typesvr('type',value)} />
				<Selects name='活动名称:' val='请选择' data={this.state.objhtml} onChange={(value) => this.typesvr('dataid',value)} />
				<DateTime name='开始时间' defaulttime={this.datatime()} onChange={this.beg} />
				<DateTime name='结束时间' defaulttime={this.datatime()} onChange={this.end} />
				<But name='开启' onClick={this.openajax} />
				<Tab dataSource={this.state.datatwo} columns={col} />
			</div>
		)
	}
}


export default TempActivition;