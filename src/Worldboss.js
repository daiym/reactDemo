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

class Worldboss extends Component {
	constructor(props){
		super(props);
		this.state = ({
			svrs:'',
			beg:'',
			end:'',
			close:'',
			tab1:[],
			tab2:[]
		})
	};

	componentDidMount(){
		var _this = this;
		//列表
		Ajax({},"servers.world.boss.infos").then(function(r){
			var data = JSON.parse(r.data.result);
			console.log(data);
		});
		//服务器
		Ajax({},"servers.world.boss.servers").then(function(r){
			var data = JSON.parse(r.data.result);
			console.log(data);
		});
		var t = new Date();
		var time = t.getTime()
		_this.setState ({
			beg:time,
			end:time,
			close:time
		});
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

	render(){
		const colunm = [{
			title:'key',
			dataIndex:'keys',
			key:'keys'
		}, {
			title:'beg',
			dataIndex:'beg',
			key:'beg'
		}, {
			title:'end',
			dataIndex:'end',
			key:'end'
		}, {
			title:'close',
			dataIndex:'close',
			key:'close'
		}, {
			title:'svrs',
			dataIndex:'svrs',
			key:'svrs'
		}, {
			title:'enable',
			dataIndex:'enable',
			key:'enable'
		}, {
			title:'opened',
			dataIndex:'opened',
			key:'opened'
		}, {
			title:'reward',
			dataIndex:'reward',
			key:'reward'
		}, {
			title:'done',
			dataIndex:'done',
			key:'done'
		}, {
			title:'操作',
			dataIndex:'cz',
			key:'cz'
		}];
		const colunm1 = [{
			title:'svr',
			dataIndex:'svr',
			key:'svr'
		}, {
			title:'key',
			dataIndex:'keys',
			key:'keys'
		}, {
			title:'beg',
			dataIndex:'beg',
			key:'beg'
		}, {
			title:'end',
			dataIndex:'end',
			key:'end'
		}, {
			title:'close',
			dataIndex:'close',
			key:'close'
		}, {
			title:'opend',
			dataIndex:'opend',
			key:'opend'
		}, {
			title:'reward',
			dataIndex:'reward',
			key:'reward'
		}, {
			title:'posx',
			dataIndex:'posx',
			key:'posx'
		}, {
			title:'posy',
			dataIndex:'posy',
			key:'posy'
		}, {
			title:'showx',
			dataIndex:'showx',
			key:'showx'
		}, {
			title:'showy',
			dataIndex:'showy',
			key:'showy'
		}];
		return(
			<div>
				<ContentHeader header='Worldboss' />
				<Tab columns={colunm} />
				<ContentHeader header='服务器' />
				<Tab columns={colunm1} />
				<Multiselect name='svr:' val='请选择' data={this.server()} onChange={(e) => this.value('svrs',e) } />
				<DateTime name='活动开始时间' defaulttime={this.datatime()} onChange={(date,dateString) => this.datetime('beg',date,dateString)} />
				<DateTime name='活动结束时间' defaulttime={this.datatime()} onChange={(date,dateString) => this.datetime('end',date,dateString)} />
				<DateTime name='关闭活动时间' defaulttime={this.datatime()} onChange={(date,dateString) => this.datetime('close',date,dateString)} />
				<But name='开启' />
			</div>
		)
	}
};

export default Worldboss