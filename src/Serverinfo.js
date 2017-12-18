import React, { Component } from 'react';
import ContentHeader from './ContentHeader';
import Selects from './Select';
import Tab from './Tab';
// import Formats from './Formats';
// import Format from './Format';
import Ajax from './Ajax';//Ajax
import { Select,message,Tabs } from 'antd';
const Option = Select.Option;
const TabPane = Tabs.TabPane;

class Serverlog extends Component {
	constructor(props){
		super(props);
		this.state = ({
			activition:'',
			activitionobj:[],
			top10:'',
			top10obj:[],
			personal:'',
			personalobj:[],
			personallevel:'',
			personallevelobj:[],
			baselevel:'',
			baselevelobj:[],
			leaguepower:'',
			leaguepowerobj:[],
			equiptotal:'',
			equiptotalobj:[]
		})
	}

	componentDidMount(){

	}

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

	//活动
	svractivit = (name,value) => {
		this.setState ({
			[name]:value
		});
		const _this = this;
		if(name === 'activition'){
			Ajax({},"servers.activition.infos").then(function(r){
				console.log(r)
				var data = JSON.parse(r.data.result);
				console.log("servers.activition.infos: ",data);
				if(data){
					var datasvr = [];
					for(var i = 0; i < data.length; i++){
						var svr = data[i];
						var s = i;
						s={};
						s.key = i;
						if(value === svr.unquieid){
							s.server = svr.unquieid;
							var info = svr.infos;
							s.blackknight = <div>starttime: {info.blackknight.starttime}<br/>
											endtime: {info.blackknight.endtime}<br/>
											status: {info.blackknight.status}</div>;
							if(info.server.status !== 0){
								var dayhtml = '';
								for(var x in info.server.days){
									var day = info.server.days[x];
									if(x !== 1 && x !== 7){
										dayhtml+=<div>星期{(x-1)}+day.eventtype</div>;
									}
								}
								s.servers = <div>starttime: {info.server.starttime}<br/>
											endtime: {info.server.endtime}<br/>
											status: {info.server.status}<br/>
											{dayhtml}</div>;
							}else{
								s.servers = '';
							};
							if(info.buff.status !== 0){
								s.buff = <div>starttime: {info.buff.starttime}<br/>
										endtime: {info.buff.endtime}<br/>
										status: {info.buff.status}</div>;
							}else{
								s.buff = '';
							};
							datasvr.push(s);
						}
					}
					_this.setState({
						activitionobj:datasvr
					});
				}
			})
		}else if(name === 'top10'){
			Ajax({uniqueid:value},"servers.ladderinfo.infos").then(function(r){
				console.log(r)
				if(r.data.errorcode === 0){
					var data = JSON.parse(r.data.result);
					console.log("servers.ladderinfo.infos: ",data);
					var datatop10 = [];
					var rpp = data.rolepowerpoint;
	                var rrl = data.rolerolelevel;
	                var rcl = data.rolecitylevel;
	                var lpp = data.leaguepowerpoint;
	                var req = data.roleequipment;
	                for(var i = 0; i < 10; i++){
	                	var pp_rpp = rpp[i].powerpoint;
	                    var sname_rpp = rpp[i].league.shortname;
	                    var name_rpp = rpp[i].name.name;
	                    var sid_rpp = rpp[i].sessionid;

	                    var rl_rrl = rrl[i].rolelevel;
	                    var sname_rrl = rrl[i].league.shortname;
	                    var name_rrl = rrl[i].name.name;
	                    var sid_rrl = rrl[i].sessionid;

	                    var cl_rcl = rcl[i].citylevel
	                    var sname_rcl = rcl[i].league.shortname;
	                    var name_rcl = rcl[i].name.name;
	                    var sid_rcl = rcl[i].sessionid;

	                    var pp_lpp = lpp[i].powerpoint;
	                    var sname_lpp = lpp[i].names.shortname;
	                    var oname_lpp = lpp[i].ownername;

	                    var pa_req = req[i].param1;
	                    var sname_req = req[i].league.shortname;
	                    var name_req = req[i].name.name;
	                    var sid_req = req[i].sessionid;
	                	var s = i;
	                	s = {};
	                	s.key = i;
	                	s.ranking = `${value}服 No.${i+1}`;
	                	s.activitionname = `${pp_rpp}(${sname_rpp})${name_rpp}[${sid_rpp}]`;
	                	s.levelname = `${rl_rrl}级(${sname_rrl})${name_rrl}[${sid_rrl}]`;
	                	s.baselevelname = `${cl_rcl}级(${sname_rcl})${name_rcl}[${sid_rcl}]`;
	                	s.union = `${pp_lpp}(${sname_lpp})${oname_lpp}`;
	                	s.equipment = `${pa_req}(${sname_req})${name_req}[${sid_req}]`;
	                	datatop10.push(s);
	                }
	                return _this.setState ({
		                	top10obj:datatop10
		                });
				}else{
					_this.setState ({
		                top10obj:''
		            });
					return message.info('该服务器不开放！！！');
				}
				
			})
		}else if(name === 'personal'){
			Ajax({uniqueid:value},"servers.ladderinfo.infos").then(function(r){
				console.log(r);
				if(r.data.errorcode === 0){
					var data = JSON.parse(r.data.result);
					console.log("servers.ladderinfo.infos: ",data);
					var datapersonal = [];
					var rpp = data.rolepowerpoint;
					for(var i = 0; i < rpp.length; i++){
						var pp_rpp = rpp[i].powerpoint;
	                    var sid_rpp = rpp[i].sessionid;
	                    var name_rpp = rpp[i].name.name;
	                    var sname_rpp = rpp[i].league.shortname;
	                    var fname_rpp = rpp[i].league.fullname;
	                    var s = i;
	                    s = {};
	                    s.key = i;
	                    s.areasvr = `${value}服 No.${i+1}`;
	                    s.activition = `${pp_rpp}`;
	                    s.sessionid = `${sid_rpp}`;
	                    s.rolename = `${name_rpp}`;
	                    s.leagueshortname = `${sname_rpp}`;
	                    s.leaguename = `${fname_rpp}`;
	                    datapersonal.push(s);
					};
					_this.setState ({
						personalobj:datapersonal
					})
				}else{
					_this.setState ({
		                personalobj:''
		            });
					return message.info('该服务器不开放！！！');
				}
			})
		}else if(name === 'personallevel'){
			Ajax({uniqueid:value},"servers.ladderinfo.infos").then(function(r){
				console.log(r);
				if(r.data.errorcode === 0){
					var data = JSON.parse(r.data.result);
					console.log("servers.ladderinfo.infos: ",data);
					var datapersonallevel = [];
					var rrl = data.rolerolelevel;
					for(var i = 0; i < rrl.length; i++){
						var rl_rrl = rrl[i].rolelevel;
	                    var sid_rrl = rrl[i].sessionid;
	                    var name_rrl = rrl[i].name.name;
	                    var sname_rrl = rrl[i].league.shortname;
	                    var fname_rrl = rrl[i].league.fullname;
	                    var s = i;
	                  	s = {};
	                  	s.key = i;
	                  	s.areasvr = `${value}服 No.${i+1}`;
	                  	s.personallevel = `${rl_rrl}级`;
	                  	s.sessionid = `${sid_rrl}`;
	                  	s.rolename = `${name_rrl}`;
	                  	s.leagueshortname = `${sname_rrl}`;
	                  	s.leaguename = `${fname_rrl}`;
	                  	datapersonallevel.push(s);
					};
					_this.setState ({
						personallevelobj:datapersonallevel
					});
				}else{
					_this.setState ({
						personallevelobj:[]
					});
					return message.info('该服务器不开放！！！');
				}
			})
		}else if(name === 'baselevel'){
			Ajax({uniqueid:value},"servers.ladderinfo.infos").then(function(r){
				console.log(r);
				if(r.data.errorcode === 0){
					var data = JSON.parse(r.data.result);
					console.log("servers.ladderinfo.infos: ",data);
					var databaselevel = [];
					var rcl = data.rolecitylevel;
					for(var i = 0; i < rcl.length; i++){
						var cl_rcl = rcl[i].citylevel;
	                    var rl_rcl = rcl[i].rolelevel;
	                    var sid_rcl = rcl[i].sessionid;
	                    var name_rcl = rcl[i].name.name;
	                    var sname_rcl = rcl[i].league.shortname;
	                    var fname_rcl = rcl[i].league.fullname;
	                    var s = i;
	                  	s = {};
	                  	s.key = i;
	                  	s.areasvr = `${value}服 No.${i+1}`;
	                  	s.baselevel = `${cl_rcl}级`;
	                  	s.rolelevel = `${rl_rcl}级`;
	                  	s.sessionid = `${sid_rcl}`;
	                  	s.rolename = `${name_rcl}`;
	                  	s.leagueshortname = `${sname_rcl}`;
	                  	s.leaguename = `${fname_rcl}`;
	                  	databaselevel.push(s);
					};
					_this.setState ({
						baselevelobj:databaselevel
					});
				}else{
					_this.setState ({
						baselevelobj:[]
					});
					return message.info('该服务器不开放！！！');
				}
			})
		}else if(name === 'leaguepower'){
			Ajax({uniqueid:value},"servers.ladderinfo.infos").then(function(r){
				console.log(r);
				if(r.data.errorcode === 0){
					var data = JSON.parse(r.data.result);
					console.log("servers.ladderinfo.infos: ",data);
					var dataleaguepower = [];
					var lpp = data.leaguepowerpoint;
					for(var i = 0; i < lpp.length; i++){
						var pp_lpp = lpp[i].powerpoint;
	                    var oname_lpp = lpp[i].ownername;
	                    var sname_lpp = lpp[i].names.shortname;
	                    var idname_lpp = lpp[i].names.id;
	                    var fname_lpp = lpp[i].names.fullname;
	                    var s = i;
	                  	s = {};
	                  	s.key = i;
	                  	s.areasvr = `${value}服 No.${i+1}`;
	                  	s.leaguepower = `${pp_lpp}`;
	                  	s.rolename = `${oname_lpp}`;
	                  	s.leagueshortname = `${sname_lpp}`;
	                  	s.id = `${idname_lpp}`;
	                  	s.leaguename = `${fname_lpp}`;
	                  	dataleaguepower.push(s);
					};
					_this.setState ({
						leaguepowerobj:dataleaguepower
					});
				}else{
					_this.setState ({
						leaguepowerobj:''
					});
					return message.info('该服务器不开放！！！');
				}
			})
		}else if(name === 'equiptotal'){
			Ajax({uniqueid:value},"servers.ladderinfo.infos").then(function(r){
				console.log(r);
				if(r.data.errorcode === 0){
					var data = JSON.parse(r.data.result);
					console.log("servers.ladderinfo.infos: ",data);
					var dataequiptotal = [];
					var req = data.roleequipment;
					for(var i = 0; i < req.length; i++){
						var pa_req = req[i].param1;
	                    var sid_req = req[i].sessionid;
	                    var name_req = req[i].name.name;
	                    var sname_req = req[i].league.shortname;
	                    var fname_req = req[i].league.fullname;
	                    var s = i;
	                  	s = {};
	                  	s.key = i;
	                  	s.areasvr = `${value}服 No.${i+1}`;
	                  	s.equiptotal = `${pa_req}`;
	                  	s.sessionid = `${sid_req}`;
	                  	s.rolename = `${name_req}`;
	                  	s.leagueshortname = `${sname_req}`;
	                  	s.leaguename = `${fname_req}`;
	                  	dataequiptotal.push(s);
					};
					_this.setState ({
						equiptotalobj:dataequiptotal
					});
				}else{
					_this.setState ({
						equiptotalobj:[]
					});
					return message.info('该服务器不开放！！！');
				}
			})
		}



	}
	

	render(){
		const columns = [{
			title:'服务器',
			dataIndex:'server',
			key:'server'
		}, {
			title:'黑骑士',
			dataIndex:'blackknight',
			key:'blackknight'
		}, {
			title:'大周长',
			dataIndex:'servers',
			key:'servers'
		}, {
			title:'小周长',
			dataIndex:'buff',
			key:'buff'
		}];
		const columns1 = [{
			title:'排名',
			dataIndex:'ranking',
			key:'ranking'
		}, {
			title:'个人战力&名称',
			dataIndex:'activitionname',
			key:'activitionname'
		}, {
			title:'个人等级&名称',
			dataIndex:'levelname',
			key:'levelname'
		}, {
			title:'基地等级&名称',
			dataIndex:'baselevelname',
			key:'baselevelname'
		}, {
			title:'联盟战力&盟主',
			dataIndex:'union',
			key:'union'
		}, {
			title:'装备积分&名称',
			dataIndex:'equipment',
			key:'equipment'
		}];
		const columns2 = [{
			title:'区服&排名',
			dataIndex:'areasvr',
			key:'areasvr'
		}, {
			title:'个人战力',
			dataIndex:'activition',
			key:'activition'
		}, {
			title:'sessionid',
			dataIndex:'sessionid',
			key:'sessionid'
		},{
			title:'角色名称',
			dataIndex:'rolename',
			key:'rolename'
		},{
			title:'联盟简称',
			dataIndex:'leagueshortname',
			key:'leagueshortname'
		},{
			title:'联盟名称',
			dataIndex:'leaguename',
			key:'leaguename'
		}];
		const columns3 = [{
			title:'区服&排名	',
			dataIndex:'areasvr',
			key:'areasvr'
		}, {
			title:'个人等级',
			dataIndex:'personallevel',
			key:'personallevel'
		}, {
			title:'sessionid',
			dataIndex:'sessionid',
			key:'sessionid'
		}, {
			title:'角色名称',
			dataIndex:'rolename',
			key:'rolename'
		}, {
			title:'联盟简称',
			dataIndex:'leagueshortname',
			key:'leagueshortname'
		}, {
			title:'联盟名称',
			dataIndex:'leaguename',
			key:'leaguename'
		}];
		const columns4 = [{
			title:'区服&排名',
			dataIndex:'areasvr',
			key:'areasvr'
		}, {
			title:'基地等级',
			dataIndex:'baselevel',
			key:'baselevel'
		}, {
			title:'角色等级',
			dataIndex:'rolelevel',
			key:'rolelevel'
		}, {
			title:'sessionid',
			dataIndex:'sessionid',
			key:'sessionid'
		}, {
			title:'角色名称',
			dataIndex:'rolename',
			key:'rolename'
		}, {
			title:'联盟简称',
			dataIndex:'leagueshortname',
			key:'leagueshortname'
		}, {
			title:'联盟名称',
			dataIndex:'leaguename',
			key:'leaguename'
		}];
		const columns5 = [{
			title:'区服&排名',
			dataIndex:'areasvr',
			key:'areasvr'
		}, {
			title:'联盟战力',
			dataIndex:'leaguepower',
			key:'leaguepower'
		}, {
			title:'角色名称',
			dataIndex:'rolename',
			key:'rolename'
		}, {
			title:'联盟简称',
			dataIndex:'leagueshortname',
			key:'leagueshortname'
		}, {
			title:'ID',
			dataIndex:'id',
			key:'id'
		}, {
			title:'联盟名称',
			dataIndex:'leaguename',
			key:'leaguename'
		}];
		const columns6 = [{
			title:'区服&排名',
			dataIndex:'areasvr',
			key:'areasvr'
		}, {
			title:'装备积分',
			dataIndex:'equiptotal',
			key:'equiptotal'
		}, {
			title:'sessionid',
			dataIndex:'sessionid',
			key:'sessionid'
		}, {
			title:'角色名称',
			dataIndex:'rolename',
			key:'rolename'
		}, {
			title:'联盟简称',
			dataIndex:'leagueshortname',
			key:'leagueshortname'
		}, {
			title:'联盟名称',
			dataIndex:'leaguename',
			key:'leaguename'
		}];
		return(
			<div>
				<ContentHeader header='服务器信息' />
				<Tabs onChange={this.callback} type="card">
				    <TabPane tab="活动" key="1">
						<Selects name='服务器:' val='请选择' data={this.server()} onChange={(value) => this.svractivit('activition',value)} />
						<Tab dataSource={this.state.activitionobj} columns={columns} />
				    </TabPane>
				    <TabPane tab="排行榜/top10" key="2">
				    	<Selects name='服务器:' val='请选择' data={this.server()} onChange={(value) => this.svractivit('top10',value)} />
				    	<Tab dataSource={this.state.top10obj} columns={columns1} />
				    </TabPane>
				    <TabPane tab="排行榜/个人战力" key="3">
				    	<Selects name='服务器:' val='请选择' data={this.server()} onChange={(value) => this.svractivit('personal',value)} />
				    	<Tab dataSource={this.state.personalobj} columns={columns2} />
				    </TabPane>
				    <TabPane tab="排行榜/个人等级" key="4">
				    	<Selects name='服务器:' val='请选择' data={this.server()} onChange={(value) => this.svractivit('personallevel',value)} />
				    	<Tab dataSource={this.state.personallevelobj} columns={columns3} />
				    </TabPane>
				    <TabPane tab="排行榜/基地等级" key="5">
				    	<Selects name='服务器:' val='请选择' data={this.server()} onChange={(value) => this.svractivit('baselevel',value)} />
				    	<Tab dataSource={this.state.baselevelobj} columns={columns4} />
				    </TabPane>
				    <TabPane tab="排行榜/联盟战力" key="6">
				    	<Selects name='服务器:' val='请选择' data={this.server()} onChange={(value) => this.svractivit('leaguepower',value)} />
				    	<Tab dataSource={this.state.leaguepowerobj} columns={columns5} />
				    </TabPane>
				    <TabPane tab="排行榜/装备积分" key="7">
				    	<Selects name='服务器:' val='请选择' data={this.server()} onChange={(value) => this.svractivit('equiptotal',value)} />
				    	<Tab dataSource={this.state.equiptotalobj} columns={columns6} />
				    </TabPane>
				</Tabs>
			</div>
		)
	}
}

export default Serverlog;