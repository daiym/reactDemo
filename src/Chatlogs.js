import React, { Component } from 'react';
import ContentHeader from './ContentHeader';
import Selects from './Select';
import DateTime from './DateTime';
import Formats from './Formats';
import Format from './Format';
import Ajax from './Ajax';//Ajax
import But from './But';
import Inputs from './Input';
import Tab from './Tab';
import { Select,message,Tabs,Input } from 'antd';
const Option = Select.Option;
const TabPane = Tabs.TabPane;
const { TextArea } = Input;

class Chatlogs extends Component {
	constructor(props){
		super(props);
		this.state = ({
			worldchat:'',
			worldchatbegtime:'',
			worldchatendtime:'',
			worldchattext:'',
			leaguechat:'',
			leaguechatbegtime:'',
			leaguechatendtime:'',
			leaguechatinput:'',
			leaguechattext:'',
			privatechat:'',
			privatechatbegtime:'',
			privatechatendtime:'',
			privatechatinput:'',
			privatechattext:'',
			privatechattab:'',
			p2pchat:'',
			p2pchatbegtime:'',
			p2pchatendtime:'',
			p2pchatinput1:'',
			p2pchatinput2:'',
			p2pchattext:'',			
		})
	}

	componentDidMount(){
		var t = new Date();
		var time = t.getTime()
		this.setState ({
			worldchatbegtime:time,
			worldchatendtime:time,
			leaguechatbegtime:time,
			leaguechatendtime:time,
			privatechatbegtime:time,
			privatechatendtime:time,
			p2pchatbegtime:time,
			p2pchatendtime:time
		});
	};

	callback = (key) => {
		console.log(key);
	}

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
		var s = new Date();
		var c = Formats(s);	
		return c;
	};

	//下拉
	typesvr = (name,value) => {
		this.setState ({
			[name]:value
		});
	};

	//time
	datetime = (name,date,dateString) => {
		if(date != null){
			console.log(date, dateString ,date._d);
			var a = (date._d).getTime();
			this.setState ({
				[name]:a
			});
		};
	};

	//value
	value = (name,e) => {
		this.setState ({
			[name]:e.target.value
		})
	};

	//世界聊天ajax
	logshout = () => {
		if(this.state.worldchat == ''){
			return message.info('服务器不能为空！！！');
		};
		var _this = this;
		Ajax({uniqueid:this.state.worldchat,begintime:this.state.worldchatbegtime,endtime:this.state.worldchatendtime},"servers.log.shout").then(function(r){
			if(r.data.errorcode == 0){
				var data = JSON.parse(r.data.result);
				console.log(data);
				if(data.length !== 0){
					_this.chatfn('worldchat',data)
				}
			};
		});
	};

	//联盟聊天ajax
	logsgroup = () => {
		if(this.state.leaguechat == ''){
			return message.info('服务器不能为空！！！');
		}else if(this.state.leaguechatinput == ''){
			return message.info('联盟id不能为空！！！');
		};
		var _this = this;
		Ajax({uniqueid:this.state.leaguechat,leagueid:this.state.leaguechatinput,begintime:this.state.leaguechatbegtime,endtime:this.state.leaguechatendtime},"servers.log.group").then(function(r){
			if(r.data.errorcode == 0){
				var data = JSON.parse(r.data.result);
				console.log(data);
				if(data.length !== 0){
					_this.chatfn('leaguechat',data)
				}
			};
		});
	};

	//私聊记录查询
	logsp2pdsts = () => {
		if(this.state.privatechat == ''){
			return message.info('服务器不能为空！！！');
		}else if(this.state.privatechatinput == ''){
			return message.info('sessionid不能为空！！！');
		};
		var _this = this;
		Ajax({uniqueid:this.state.privatechat,sessionid:this.state.privatechatinput,begintime:this.state.privatechatbegtime,endtime:this.state.privatechatendtime},"servers.log.p2pdsts").then(function(r){
			if(r.data.errorcode == 0){
				var data = JSON.parse(r.data.result);
				console.log(data);
				if(data.length != 0){
					var ss = [];
					for(var i = 0; i < data.length; i++){
						var fullname = data[i].fullname;
		                var leagueid = data[i].leagueid;
		                var name = data[i].name;
		                var sessionid = data[i].sessionid;
		                var shortname = data[i].shortname;
		                var datass = i;
		                datass = {};
		                datass.key = i;
		                datass.index = i+1;
		                datass.fullname = fullname;
		                datass.leagueid = leagueid;
		                datass.name = name;
		                datass.sessionid = sessionid;
		                datass.showname = shortname;
		                ss.push(datass);
					};
					_this.setState ({
						privatechattab:ss
					})
				}
			};
		});
	};

	//点对点聊天
	logsp2p = () => {
		if(this.state.p2pchat == ''){
			return message.info('服务器不能为空！！！');
		}else if(this.state.p2pchatinput1 == ''){
			return message.info('sessionid1不能为空！！！');
		}else if(this.state.p2pchatinput2 == ''){
			return message.info('sessionid2不能为空！！！');
		};
		var _this = this;
		Ajax({uniqueid:this.state.p2pchat,sessionid1:this.state.p2pchatinput1,sessionid12:this.state.p2pchatinput2,begintime:this.state.p2pchatbegtime,endtime:this.state.p2pchatendtime},"servers.log.p2p").then(function(r){
			if(r.data.errorcode == 0){
				var data = JSON.parse(r.data.result);
				console.log(data);
				if(data.length !== 0){
					_this.chatfn('p2pchat',data)
				}
			};
		});
	};

	//解析数据
	chatfn = (value,data) => {
		var logs = [];
		for(var i = 0; i < data.length; i++){
			var logObj = JSON.parse(data[i]);
			if(logObj.type == "shout"){
	            var msg = logObj[logObj.type].league.id != 0 ?
	                "(" + logObj[logObj.type].league.shortname +  ")" + logObj[logObj.type].name + " (" + logObj[logObj.type].id +" )" + " : " + logObj[logObj.type].msg :
	                logObj[logObj.type].name + " (" + logObj[logObj.type].id +" )" + " : " + logObj[logObj.type].msg;
	        } else if(logObj.type == "group"){
	            var msg = logObj["group"].name + " (" + logObj["group"].id +" )" + " : " + logObj["group"].msg;
	        } else if(logObj.type == "p2p") {
	            var msg = logObj[logObj.type].fromleague.id != 0 ?
	                "(" + logObj[logObj.type].fromleague.shortname + ")" + logObj[logObj.type].from + " : " + logObj[logObj.type].msg :
	                logObj[logObj.type].from + " : " + logObj[logObj.type].msg;
	        };
	        msg = msg + " " + Format(logObj.time) + "\r\n";
        	logs.push(msg);
		}
		if(value == 'worldchat'){
			this.setState ({
				worldchattext:logs
			});
		}else if(value == 'leaguechat'){
			this.setState ({
				leaguechattext:logs
			});
		}else if(value == 'privatechat'){
			this.setState ({
				privatechattext:logs
			});
		}else if(value == 'p2pchat'){
			this.setState ({
				p2pchattext:logs
			});
		};
	};

	render(){
		const columns = [{
			title: '序号',
		  	dataIndex: 'index',
		  	key: 'index',
		}, {
			title: 'fullname',
		  	dataIndex: 'fullname',
		  	key: 'fullname',
		}, {
			title: 'leagueid',
		  	dataIndex: 'leagueid',
		  	key: 'leagueid',
		}, {
			title: 'name',
		  	dataIndex: 'name',
		  	key: 'name',
		}, {
			title: 'sessionid',
		  	dataIndex: 'sessionid',
		  	key: 'sessionid',
		}, {
			title: 'showname',
		  	dataIndex: 'showname',
		  	key: 'showname',
		}];
		return (
			<div>
				<ContentHeader header='聊天记录' />
				<Tabs onChange={this.callback} type="card">
				    <TabPane tab="世界聊天" key="1">
				    	<Selects name='服务器:' val='请选择' data={this.server()} onChange={(value) => this.typesvr('worldchat',value)} />
				    	<DateTime name='开始时间' defaulttime={this.datatime()} onChange={(date,dateString) => this.datetime('worldchatbegtime',date,dateString)} />
						<DateTime name='结束时间' defaulttime={this.datatime()} onChange={(date,dateString) => this.datetime('worldchatendtime',date,dateString)}/>
						<But name='查询' onClick={this.logshout} />
						<TextArea style={{ minHeight:485 , maxWidth: 800}} placeholder='聊天记录' value={this.state.worldchattext} />
				    </TabPane>
				    <TabPane tab="联盟聊天" key="2">
				    	<Selects name='服务器:' val='请选择' data={this.server()} onChange={(value) => this.typesvr('leaguechat',value)} />
				    	<Inputs name='联盟id:' val='联盟id' onChange={(e) => this.value('leaguechatinput',e)} />
				    	<DateTime name='开始时间' defaulttime={this.datatime()} onChange={(date,dateString) => this.datetime('leaguechatbegtime',date,dateString)} />
						<DateTime name='结束时间' defaulttime={this.datatime()} onChange={(date,dateString) => this.datetime('leaguechatendtime',date,dateString)} />
						<But name='查询' onClick={this.logsgroup} />
						<TextArea style={{ minHeight:445 , maxWidth: 800}} placeholder='聊天记录' value={this.state.leaguechattext} />
				    </TabPane>
				    <TabPane tab="私聊记录查询" key="3">
				    	<Selects name='服务器:' val='请选择' data={this.server()} onChange={(value) => this.typesvr('privatechat',value)} />
				    	<Inputs name='sessionid:' val='sessionid' onChange={(e) => this.value('privatechatinput',e)} />
				    	<DateTime name='开始时间' defaulttime={this.datatime()} onChange={(date,dateString) => this.datetime('privatechatbegtime',date,dateString)} />
						<DateTime name='结束时间' defaulttime={this.datatime()} onChange={(date,dateString) => this.datetime('privatechatendtime',date,dateString)} />
						<But name='查询' onClick={this.logsp2pdsts} />
						<Tab dataSource={this.state.privatechattab} columns={columns} />
				    </TabPane>
				    <TabPane tab="点对点聊天" key="4">
				    	<Selects name='服务器:' val='请选择' data={this.server()} onChange={(value) => this.typesvr('p2pchat',value)} />
				    	<Inputs name='sessionid:' val='sessionid1' onChange={(e) => this.value('p2pchatinput1',e)} />
				    	<Inputs name='sessionid:' val='sessionid2' onChange={(e) => this.value('p2pchatinput2',e)} />
				    	<DateTime name='开始时间' defaulttime={this.datatime()} onChange={(date,dateString) => this.datetime('p2pchatbegtime',date,dateString)} />
						<DateTime name='结束时间' defaulttime={this.datatime()} onChange={(date,dateString) => this.datetime('p2pchatendtime',date,dateString)} />
						<But name='查询' onClick={this.logsp2p} />
						<TextArea style={{ minHeight:405 , maxWidth: 800}} placeholder='聊天记录' value={this.state.p2pchattext} />
				    </TabPane>
				</Tabs>
			</div>
		)
	}
}

export default Chatlogs;