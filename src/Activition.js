import React, { Component } from 'react';
import ContentHeader from './ContentHeader';
import Tab from './Tab';
import Formats from './Formats';
import Format from './Format';
import Ajax from './Ajax';//Ajax

class Activition extends Component {
	constructor(props){
		super(props);
		this.state = ({
			tab1:[]
		})
	};
	
	componentDidMount(){
		var _this = this;
		Ajax({},"servers.activition.infos").then(function(r){
			var data = JSON.parse(r.data.result);
			console.log(data);
			data = data.sort(function(a,b){return a.unquieid - b.unquieid});
			if(data.length != 0){
				var dataobj = [];
				data.map((item,index) => {
					var info = item.infos;
					var obj = {};
					obj.key = index;
					obj.svr = item.unquieid;
					if(info){
						obj.blackknight = <div>starttime: {info.blackknight.starttime}<br/>
											endtime: {info.blackknight.endtime}<br/>
											status: {info.blackknight.status}</div>;
											
						if(info.buff.status != 0){
							obj.buff = <div>starttime: {info.buff.starttime}<br/>
										endtime: {info.buff.endtime}<br/>
										status: {info.buff.status}</div>;
						}else{
							obj.buff = '';
						};
						if(info.server.status != 0){
							var dayhtml='';
							for(var x in info.server.days){
	                            var day = info.server.days[x];
	                            if(x!=1 && x!=7){
	                                dayhtml+= `星期${(x-1)}${day.eventtype} `;
	                            }
	                        };
	                        obj.server = <div>starttime: {info.server.starttime}<br/>
											endtime: {info.server.endtime}<br/>
											status: {info.server.status}<br/>
											{dayhtml}</div>;
						}else{
							obj.server = '';
						}
					};
					dataobj.push(obj);
				});
				_this.setState ({
					tab1:dataobj
				});
			}
		})
	};

	render(){
		const colunm1 = [{
			title:'服务器',
			dataIndex:'svr',
			key:'svr'
		}, {
			title:'黑骑士',
			dataIndex:'blackknight',
			key:'blackknight'
		}, {
			title:'大周长',
			dataIndex:'server',
			key:'server'
		}, {
			title:'小周长',
			dataIndex:'buff',
			key:'buff'
		}];
		return(
			<div>
				<Tab columns={colunm1} dataSource={this.state.tab1} />
			</div>
		)
	}
};

export default Activition;