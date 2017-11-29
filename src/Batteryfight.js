import React, { Component } from 'react';
import ContentHeader from './ContentHeader';
import Tab from './Tab';
import Formats from './Formats';
import Format from './Format';
import Ajax from './Ajax';//Ajax
import Multiselect from './Multiselect';
import Inputs from './Input';
import But from './But';
import DateTime from './DateTime';
import { Select,Button,message } from 'antd';
const Option = Select.Option;

class batteryfight extends Component {
	constructor(props){
		super(props);
		this.state = ({
			svrs:'',
			beg:'',
			end:'',
			close:'',
			tab1:[],
			tab2:[],
			tab3:[],
			tab4:[]
		})
	};

	componentDidMount(){
		var _this = this;
		Ajax({},"servers.batteryfight.info").then(function(r){
			var data = JSON.parse(r.data.result);
			console.log(data);
			var data = data.sort((a,b) => {return b.key - a.key});
			var a = [];
			data.map((item,index) => {
				var svrs = '';
				for(var i = 0; i < item.infos.svrs.length; i++){
					svrs += item.infos.svrs[i]+','
				};
				var s = {};
				s.key = index;
				s.keys = item.key;
				s.beg = Format(item.infos.begintime);
				s.end = Format(item.infos.endtime);
				s.close = Format(item.infos.closetime);
				s.enable = ''+item.infos.enable;
				s.reward = ''+item.infos.reward;
				s.svrs = svrs;
				s.status = item.status;
				s.cz = <div>
						<Button type="primary" onClick={() => _this.resetajax(item.key)} >禁用</Button>
						<Button type="primary" onClick={() => _this.rewardajax(item.key)} >发放奖励</Button>
						<Button type="primary" onClick={() => _this.ladderroleajax(item.key)} >个人排行榜</Button>
						<Button type="primary" onClick={() => _this.ladderserver(item.key)} >服务排行榜</Button>
					</div>;
				a.push(s);
			});
			_this.setState ({
				tab1:a
			});
		});
		Ajax({},"servers.batteryfight.servers").then(function(r){
			var data = JSON.parse(r.data.result);
			console.log(data);
			var a =[];
			for(var i in data){
				try{
					var datas = JSON.parse(data[i]);
					if(datas){
						var s = {};
						s.key = i;
						s.svr = i;
						s.keys = datas.key;
						s.beg = Format(datas.begintime);
						s.end = Format(datas.endtime);
						s.close = Format(datas.closetime);
						s.toserver = datas.toserver;
						s.border = datas.border;
						a.push(s);
					};
				}catch(e){
					message.info(`${i}服务器${data[i]}`);
				};
			};
			var t = new Date();
			var time = t.getTime()
			_this.setState ({
				tab4:a,
				beg:time,
				end:time,
				close:time
			});
		})
	};

	//下拉
	value = (name,value) => {
		this.setState ({
			[name]:value
		});
	};

	//服务器
	server = () => {
		var s = JSON.parse(localStorage['server@'+ localStorage.name]);
		return s.map((item,index) => {
					var uniqueid = JSON.stringify(item.uniqueid)
					return <Option key={index} value={uniqueid}>{uniqueid + '服务器'}</Option>;
				})
	};

	//默认日历当天时间
	datatime = () => {
		var s = new Date();
		var c = Formats(s);	
		return c;
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

	//禁用
	resetajax = (key) => {
		Ajax({key:key},"servers.batteryfight.reset").then(function(r){
			var data = JSON.parse(r.data.result);
			console.log(data);
		});
	};

	//开放奖励
	rewardajax = (key) => {
		Ajax({key:key},"servers.batteryfight.reward").then(function(r){
			var data = JSON.parse(r.data.result);
			console.log(data);
		});
	};

	//个人排行榜
	ladderroleajax = (key) => {
		var _this = this;
		Ajax({key:key},"servers.batteryfight.ladder.role").then(function(r){
			var data = JSON.parse(r.data.result);
			console.log(data);
			var a = [];
			data.map((item,index) => {
				var str = JSON.parse(item.info);
				var s = {};
				s.key = index;
				s.sessionid = item.sessionid;
				s.name = str.name.name;
				s.score = item.score;
				s.svrid = item.svrid;
				s.updtime = Format(item.updtime);
				s.citylevel = str.citylevel;
				s.leagueid = str.league.id;
				s.leaguename = str.league.shortname;
				s.leaguelevel = str.leaguelevel;
				s.officer = str.officer;
				s.protecting = str.protecting;
				a.push(a);
			});
			_this.setState ({
				tab2:a
			});
		});
	};

	//服务器排行榜
	ladderserver = (key) => {
		var _this = this;
		Ajax({key:key},"servers.batteryfight.ladder.server").then(function(r){
			var data = JSON.parse(r.data.result);
			console.log(data);
			var a = [];
			data.map((item,index) => {
				var s = {};
				s.key = index;
				s.svrid = item.svrid;
				s.tosvr = item.tosvr;
				s.border = item.border;
				s.score = item.score;
				s.updtime = item.updtime;
				a.push(s);
			});
			_this.setState ({
				tab3:a
			});
		});
	};

	//开启
	openajax = () => {
		var _this = this;
		Ajax({begintime:_this.state.beg, 
			endtime:_this.state.end,
			closetime:_this.state.close,
			svrs:_this.state.svrs},"servers.batteryfight.open").then(function(r){
				var data = JSON.parse(r.data.result);
				console.log(data);
			});
	};

	render(){
		const colunm1 = [{
			title:'keys',
			dataIndex:'keys',
			key:'keys'
		}, {
			title:'活动开始时间',
			dataIndex:'beg',
			key:'beg'
		}, {
			title:'活动结束时间',
			dataIndex:'end',
			key:'end'
		}, {
			title:'关闭活动时间',
			dataIndex:'close',
			key:'close'
		}, {
			title:'enable',
			dataIndex:'enable',
			key:'enable'
		}, {
			title:'reward',
			dataIndex:'reward',
			key:'reward'
		}, {
			title:'svrs',
			dataIndex:'svrs',
			key:'svrs'
		}, {
			title:'status',
			dataIndex:'status',
			key:'status'
		}, {
			title:'操作',
			dataIndex:'cz',
			key:'cz'
		}];
		const colunm2 = [{
			title:'sessionid',
			dataIndex:'sessionid',
			key:'sessionid'
		}, {
			title:'name',
			dataIndex:'name',
			key:'name'
		}, {
			title:'score',
			dataIndex:'score',
			key:'score'
		}, {
			title:'svrid',
			dataIndex:'svrid',
			key:'svrid'
		}, {
			title:'updtime',
			dataIndex:'updtime',
			key:'updtime'
		}, {
			title:'citylevel',
			dataIndex:'citylevel',
			key:'citylevel'
		}, {
			title:'leagueid',
			dataIndex:'leagueid',
			key:'leagueid'
		}, {
			title:'leaguename',
			dataIndex:'leaguename',
			key:'leaguename'
		}, {
			title:'leaguelevel',
			dataIndex:'leaguelevel',
			key:'leaguelevel'
		}, {
			title:'officer',
			dataIndex:'officer',
			key:'officer'
		}, {
			title:'protecting',
			dataIndex:'protecting',
			key:'protecting'
		}];
		const colunm3 = [{
			title:'svrid',
			dataIndex:'svrid',
			key:'svrid'
		}, {
			title:'tosvr',
			dataIndex:'tosvr',
			key:'tosvr'
		}, {
			title:'border',
			dataIndex:'border',
			key:'border'
		}, {
			title:'score',
			dataIndex:'score',
			key:'score'
		}, {
			title:'updtime',
			dataIndex:'updtime',
			key:'updtime'
		}];
		const colunm4 = [{
			title:'服务器',
			dataIndex:'svr',
			key:'svr'
		}, {
			title:'keys',
			dataIndex:'keys',
			key:'keys'
		}, {
			title:'活动开始时间',
			dataIndex:'beg',
			key:'beg'
		}, {
			title:'活动结束时间',
			dataIndex:'end',
			key:'end'
		}, {
			title:'关闭活动时间',
			dataIndex:'close',
			key:'close'
		}, {
			title:'toserver',
			dataIndex:'toserver',
			key:'toserver'
		}, {
			title:'border',
			dataIndex:'border',
			key:'border'
		}];
		return (
			<div>
				<ContentHeader header='边境堡垒' />
				<Tab columns={colunm1} dataSource={this.state.tab1} />
				<ContentHeader header='个人排行榜' />
				<Tab columns={colunm2} dataSource={this.state.tab2} />
				<ContentHeader header='服务器排行榜' />
				<Tab columns={colunm3} dataSource={this.state.tab3} />
				<ContentHeader header='服务器' />
				<Tab columns={colunm4} dataSource={this.state.tab4} />
				<Multiselect name='svr:' val='请选择' data={this.server()} onChange={(e) => this.value('svrs',e) } />
				<DateTime name='活动开始时间' defaulttime={this.datatime()} onChange={(date,dateString) => this.datetime('beg',date,dateString)} />
				<DateTime name='活动结束时间' defaulttime={this.datatime()} onChange={(date,dateString) => this.datetime('beg',date,dateString)} />
				<DateTime name='关闭活动时间' defaulttime={this.datatime()} onChange={(date,dateString) => this.datetime('beg',date,dateString)} />
				<But name='开启' onClick={this.openajax} />
			</div>
		)
	}
};

export default batteryfight;