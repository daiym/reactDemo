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

class globalcraft extends Component {
	constructor(props){
		super(props);
		this.state = ({
			tab1:[],
			tab2:[],
			tab3:[],
			beg:'',
			svrs:'',
			day:'',
			closeday:''
		})
	}

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

	//value
	value = (name,e) => {
		this.setState ({
			[name]:e.target.value
		})
	};

	selects = (name,value) => {
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

	//列表ajax
	componentDidMount = () => {
		var _this = this;
		Ajax({},"servers.globalcraft.info").then(function(r){
			var data = JSON.parse(r.data.result);
			console.log(data)
			if(data.length != 0){
				var data = data.sort(function(a,b){return b.key - a.key});
				var at=[];
            	var bf=[];
            	for(var x = 0; x<data.length; x++){
	               if(data[x].define.enable==true){
	                at.push(data[x]);
	               } else{
	                bf.push(data[x]);
	               }
	            };
	            var data = at.concat(bf);
	            var a = [];
	            
	            data.map((item,index) => {
	            	var svrs = '';
	            	for(var i = 0; i < item.define.svrs.length; i++){
	            		svrs += item.define.svrs[i]+','
	            	}
	            	var s = {};
	            	s.key = index;
	            	s.index = index;
	            	s.begintime = Format(item.begintime);
	            	s.endtime = Format(item.endtime);
	            	s.days = item.define.days;
	            	s.closedays = item.define.closedays;
	            	s.enable = ''+item.define.enable;
	            	s.reward = ''+item.define.reward;
	            	s.svrs = svrs;
	            	s.keys = item.key;
	            	s.status = item.status;
	            	s.cz = <div><Button type="primary" onClick={() => _this.ladderajax(item.key)} >排行榜</Button>
	            				<Button type="primary" onClick={() => _this.resetajax(item.key)} >禁用</Button>
	            				<Button type="primary" onClick={() => _this.rewardajax(item.key)} >发放奖励</Button>
	            			</div>;
	            	a.push(s);
	            })
	            var t = new Date();
				var time = t.getTime()
	            _this.setState ({
	            	tab1:a,
	            	beg:time
	            });
			};
		});

		Ajax({},"servers.globalcraft.servers").then(function(r){
			var data = JSON.parse(r.data.result);
			console.log(data);
			if(data){
				var a = [];
				for(var i in data){
					try{
						var r = JSON.parse(data[i]);
						var s = {};
						s.key = i;
						s.svr = <div className='colorred'>{i}</div>;
						s.keys = <div className='colorred'>{r.key}</div>;
						s.begtime = <div className='colorred'>{Format(r.begintime)}</div>;
						s.days = <div className='colorred'>{r.days}</div>;
						s.closedays = <div className='colorred'>{r.closedays}</div>;
						a.push(s);
					}catch(e){
						message.info(`${i}服务器${data[i]}`);
					}
				};
				_this.setState ({
					tab3:a
				});
			};
		});
	};

	//排行榜
	ladderajax = (key) => {
		var _this = this;
		Ajax({key:key},"servers.globalcraft.ladder").then(function(r){
			var data = JSON.parse(r.data.result);
			console.log(data)
			if(data.length != 0){
				var a = [];
				data.map((item,index) => {
					var info=JSON.parse(item.info);
					var s = {};
					s.key = index;
					s.index = index+1;
					s.sessionid = item.sessionid;
					s.name = info.rn.name;
					s.grade = info.rn.grade;
					s.leaguenama = `(${info.ln.shortname})${info.ln.fullname}`;
					s.citylevel = info.citylevel;
					s.score = item.score;
					s.svrid = item.svrid;
					a.push(s);
				});
				_this.setState ({
					tab2:a
				});
			};
		});
	};

	//开启
	openajax = () => {
		var _this = this;
		Ajax({begintime:_this.state.beg, days:_this.state.day, closedays:_this.state.closeday, svrs:_this.state.svrs},"servers.globalcraft.open").then(function(r){
			var data = JSON.parse(r.data.result);
			console.log(data)
		});
	};

	//禁用
	resetajax = (key) => {
		Ajax({key:key},"servers.globalcraft.reset").then(function(r){
			var data = JSON.parse(r.data.result);
			console.log(data)
		});
	};

	//发放奖励
	rewardajax = (key) => {
		Ajax({key:key},"servers.globalcraft.reward").then(function(r){
			var data = JSON.parse(r.data.result);
			console.log(data)
		});
	};

	


	render(){
		const colunm1 = [{
			title:'序号',
			dataIndex:'index',
			key:'index'
		}, {
			title:'开始时间',
			dataIndex:'begintime',
			key:'begintime'
		}, {
			title:'结束时间',
			dataIndex:'endtime',
			key:'endtime'
		}, {
			title:'天数',
			dataIndex:'days',
			key:'days'
		}, {
			title:'关闭天数',
			dataIndex:'closedays',
			key:'closedays'
		}, {
			title:'enable',
			dataIndex:'enable',
			key:'enable'
		}, {
			title:'reward',
			dataIndex:'reward',
			key:'reward'
		}, {
			title:'服务器',
			dataIndex:'svrs',
			key:'svrs'
		}, {
			title:'key',
			dataIndex:'keys',
			key:'keys'
		}, {
			title:'状态',
			dataIndex:'status',
			key:'status'
		}, {
			title:'操作',
			dataIndex:'cz',
			key:'cz'
		}];
		const colunm2 = [{
			title:'名次',
			dataIndex:'index',
			key:'index'
		}, {
			title:'sessionid',
			dataIndex:'sessionid',
			key:'sessionid'
		}, {
			title:'name',
			dataIndex:'name',
			key:'name'
		}, {
			title:'grade',
			dataIndex:'grade',
			key:'grade'
		}, {
			title:'联盟名称',
			dataIndex:'leaguenama',
			key:'leaguenama'
		}, {
			title:'citylevel',
			dataIndex:'citylevel',
			key:'citylevel'
		}, {
			title:'score',
			dataIndex:'score',
			key:'score'
		}, {
			title:'svrid',
			dataIndex:'svrid',
			key:'svrid'
		}];
		const colunm3 = [{
			title:'服务器',
			dataIndex:'svr',
			key:'svr'
		}, {
			title:'key',
			dataIndex:'keys',
			key:'keys'
		}, {
			title:'开始时间',
			dataIndex:'begtime',
			key:'begtime'
		}, {
			title:'持续天数',
			dataIndex:'days',
			key:'days'
		}, {
			title:'关闭天数',
			dataIndex:'closedays',
			key:'closedays'
		}];
		return (
			<div>
				<ContentHeader header='跨服军备竞赛' />
				<Tab columns={colunm1} dataSource={this.state.tab1} />
				<ContentHeader header='排行榜' />
				<Tab columns={colunm2} dataSource={this.state.tab2} />
				<Multiselect name='svr:' val='请选择' data={this.server()} onChange={(e) => this.value('svrs',e) } />
				<DateTime name='开始时间' defaulttime={this.datatime()} onChange={(date,dateString) => this.datetime('beg',date,dateString)} />
				<Inputs name='持续天数:' val='持续天数' onChange={(value) => this.selects('day',value)} />
				<Inputs name='关闭天数:' val='关闭天数' onChange={(value) => this.selects('closeday',value)} />
				<But name='开启' onClick={this.openajax} />
				<ContentHeader header='服务器信息' />
				<Tab columns={colunm3} dataSource={this.state.tab3} />
			</div>
		)
	}
}

export default globalcraft;