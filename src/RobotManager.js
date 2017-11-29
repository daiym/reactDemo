import React, { Component } from 'react';
import ContentHeader from './ContentHeader';
import Tab from './Tab';
import Formats from './Formats';
import Format from './Format';
import Ajax from './Ajax';//Ajax
import Selects from './Select';
import Inputs from './Input';
import But from './But';
import DateTime from './DateTime';
import { Select,Button,message } from 'antd';
const Option = Select.Option;

class RobotManager extends Component {
	constructor(props){
		super(props);
		this.state = ({
			svr:'',
			count:'',
			levelmin:'',
			levelmax:'',
			rolelevel:'',
			resource:'',
			units:'',
			tab1:[],
			tab2:[]
		})
	};

	componentDidMount (){
		var _this = this;
		Ajax({},"server.robot.config.get").then(function(r){
			var data = JSON.parse(r.data.result);
			console.log(data);
			var a = [];
			function managerlevel(min,max){
                if(min==0 && max==0){
                    return "";
                }else{
                    return `${min} - ${max}`;
                }
            };
			for(var i in data){
				var datas = JSON.parse(data[i]);
				if(datas){
					var level = managerlevel(datas.levelmin,datas.levelmax)
					var s = {};
					s.key = i;
					s.svr = i;
					s.count = datas.count
					s.level = level;
					s.rolelevel = datas.rolelevel;
					s.resmax = datas.resmax;
					s.unitsmax = datas.unitsmax;
					s.cz = <div>
							<Button type="primary" onClick={() => _this.detailget(i)} >详情</Button>
						</div>
					a.push(s);
				}
			};
			_this.setState ({
				tab1:a
			});
		})
	};

	//详情
	detailget = (svrid) => {
		Ajax({svrid : svrid},"server.robot.detail.get").then((r) => {
			var data = JSON.parse(r.data.result);
			console.log(data);
		})
	}

	//下拉
	xiala = (name,value) => {
		this.setState ({
			[name]:value
		});
	};

	//value
	value = (name,e) => {
		this.setState ({
			[name]:e.target.value
		})
	};

	//服务器
	server = () => {
		var s = JSON.parse(localStorage['server@'+ localStorage.name]);
		return s.map((item,index) => {
					var uniqueid = JSON.stringify(item.uniqueid)
					return <Option key={index} value={uniqueid}>{uniqueid + '服务器'}</Option>;
				})
	};

	render(){
		const colunm1 = [{
			title:'服务器',
			dataIndex:'svr',
			key:'svr'
		}, {
			title:'count',
			dataIndex:'count',
			key:'count'
		}, {
			title:'level',
			dataIndex:'level',
			key:'level'
		}, {
			title:'rolelevel',
			dataIndex:'rolelevel',
			key:'rolelevel'
		}, {
			title:'resmax',
			dataIndex:'resmax',
			key:'resmax'
		}, {
			title:'unitsmax',
			dataIndex:'unitsmax',
			key:'unitsmax'
		}, {
			title:'操作',
			dataIndex:'cz',
			key:'cz'
		}];
		const colunm2 = [{
			title:'序号',
			dataIndex:'index',
			key:'index'
		}, {
			title:'服务器',
			dataIndex:'svr',
			key:'svr'
		}, {
			title:'sessionid',
			dataIndex:'sessionid',
			key:'sessionid'
		}, {
			title:'name',
			dataIndex:'name',
			key:'name'
		}, {
			title:'联盟',
			dataIndex:'league',
			key:'league'
		}, {
			title:'level',
			dataIndex:'level',
			key:'level'
		}, {
			title:'rolelevel',
			dataIndex:'rolelevel',
			key:'rolelevel'
		}, {
			title:'坐标',
			dataIndex:'pos',
			key:'pos'
		}, {
			title:'操作',
			dataIndex:'cz',
			key:'cz'
		}];
		return (
			<div>
				<ContentHeader header='机器人' />
				<Tab columns={colunm1} dataSource={this.state.tab1} />
				<Selects name='svr:' val='请选择' data={this.server()} onChange={ (value) => this.xiala('svr',value)}/>
				<Inputs name='count:' val='count' onChange={(e) => this.value('count',e)} />
				<Inputs name='levelmin:' val='levelmin' onChange={(e) => this.value('levelmin',e)} />
				<Inputs name='levelmax:' val='levelmax' onChange={(e) => this.value('levelmax',e)} />
				<Inputs name='rolelevel:' val='rolelevel' onChange={(e) => this.value('rolelevel',e)} />
				<Inputs name='resource:' val='resource' onChange={(e) => this.value('resource',e)} />
				<Inputs name='units:' val='units' onChange={(e) => this.value('units',e)} />
				<But name='开启' />
				<Tab columns={colunm2} />
			</div>
		)
	}
};

export default RobotManager;