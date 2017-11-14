import React, { Component } from 'react';
import ContentHeader from './ContentHeader';
import Input from './Input';
import Button from './Button';
import Checkbox from './Checkbox';
import Selects from './Multiselect';
import Ajax from './Ajax';//Ajax
// import { remove } from './deleteArray';
import { Select,message, } from 'antd';
const Option = Select.Option;

class Specifiesreward extends Component {
	constructor(props){
		super(props);
		this.state = ({
			server:[],
			plat:[],
			referred:''
		});
	} 
	//服务器
	server = () => {
		var s = JSON.parse(localStorage['server@'+ localStorage.name]);
		return s.map((item,index) => {
					var uniqueid = JSON.stringify(item.uniqueid)
					return <Option key={index} value={uniqueid}>{uniqueid + '服务器'}</Option>;
				});
	};

	
	//下拉
	svr = (value) => {
		this.setState ({
			server:value
		});
		// const _this = this;
		// Ajax({uniqueid:value},"counter.logger.last").then(function(r){
		// 	var data = JSON.parse(r.data.result);
		// 	_this.data(data);
		// 	var id;
		// 	for(var i in data){
		// 		id = data[i].dayid
		// 	}
		// 	_this.setState ({
		// 		dayid:id,
		// 		day:id,
		// 		ii:i
		// 	});
		// });
	};

	buildrewardAjax =() => {
		var svr = this.state.server;
		var plat = this.state.plat;
		if(svr.length == 0){
			message.info('服务器不能为空!')
		};
		if(plat.length == 0){
			message.info('plat不能为空!')
		};
		if(svr.length !== 0 && plat.length !== 0){
			const _this = this;
			Ajax({servers:_this.state.server , plats:_this.state.plat},"servers.temp.activition.building").then(function(r){
				console.log(r);
				
			})
		}
	};

	powerrewardAjax = () => {
		var svr = this.state.server;
		var plat = this.state.plat;
		if(svr.length == 0){
			message.info('服务器不能为空!')
		};
		if(plat.length == 0){
			message.info('plat不能为空!')
		};
		if(svr.length !== 0 && plat.length !== 0){
			const _this = this;
			Ajax({servers:_this.state.server , plats:_this.state.plat},"servers.temp.activition.powerpoint").then(function(r){
				console.log(r);
				
			})
		}
	};

	league10Ajax = () => {
		var svr = this.state.server;
		var plat = this.state.plat;
		var league = this.state.referred;
		if(svr.length == 0){
			return message.info('服务器不能为空!')
		};
		if(svr.length > 1 && svr.length != 0){
			return message.info('只能选择一个服务器!')
		};
		if(plat.length == 0){
			return message.info('plat不能为空!')
		};
		if(league == ""){
			return message.info('league不能为空!')
		};
		const _this = this;
		Ajax({unqiueid:svr , plats:plat , leaguename:league},"servers.temp.activition.league10").then(function(r){
			console.log(r);
		})
	}

	league20Ajax = () => {
		var svr = this.state.server;
		var plat = this.state.plat;
		var league = this.state.referred;
		if(svr.length == 0){
			return message.info('服务器不能为空!')
		};
		if(plat.length == 0){
			return message.info('plat不能为空!')
		};
		if(league == ""){
			return message.info('league不能为空!')
		};
		const _this = this;
		Ajax({unqiueid:svr , plats:plat , leaguename:league},"servers.temp.activition.league20").then(function(r){
			console.log(r);
		})
	}



	value = (e) => {
		this.setState ({
			referred:e.target.value
		})
	}


	//chencked
	check = (e,val) => {
		var s = this.state.plat;
		if(e.target.checked){
			s.push(val);
		}else{
			this.state.plat = s.filter(function(el){
								return el !== val;
							});
		}
	}

	render() {
		return (
			<div>
				<ContentHeader header='特殊奖励' />
				<Selects name='服务器:' val='请选择' data={this.server()} onChange={this.svr} />
				<Checkbox val='longyuan' onChange={ (e) => this.check(e,'longyuan')} />
				<Checkbox val='oasis' onChange={ (e) => this.check(e,'oasis')} />
				<Checkbox val='korean' onChange={ (e) => this.check(e,'korean')} />
				<Checkbox val='inner' onChange={ (e) => this.check(e,'inner')} />
				<Button name='建筑奖励' onClick={this.buildrewardAjax} />
				<Button name='战力奖励' onClick={this.powerrewardAjax} />
				<Input name='联盟简称:' val='联盟简称' onChange={this.value} />
				<Button name='联盟前10奖励' onClick={this.league10Ajax} />
				<Button name='联盟前20奖励' onClick={this.league20Ajax} />
			</div>
		)
	}
}

export default Specifiesreward;