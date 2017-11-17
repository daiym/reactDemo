import React, { Component } from 'react';
import ContentHeader from './ContentHeader';
import Tab from './Tab';
import But from './But';
import Ajax from './Ajax';//Ajax
import Input from './Input';
import Selects from './Select';
import { Select,message,Button } from 'antd';
const Option = Select.Option;


class Marcharmy extends Component {
	constructor(props){
		super(props);
		this.state = ({
			svr:'',
			sessionid:'',
			id:'',
			tab:[]
		})
	}

	//服务器
	server = () => {
		var s = JSON.parse(localStorage['server@'+ localStorage.name]);
		return s.map((item,index) => {
					var uniqueid = JSON.stringify(item.uniqueid)
					return <Option key={index} value={uniqueid}>{uniqueid + '服务器'}</Option>;
				});
	};

	//input
	value = (name,e) => {
        this.setState ({
            [name]:e.target.value
        })
    };

    //下拉
	typesvr = (value) => {
		this.setState ({
			svr:value
		});
	};

	units = (data) => {
		var str = "";
        for(var id in data){
            str += id+ ": " + data[id] + <br/>
        }
        return str;
	};

	wounded = (data) => {
		var str = "";
        for(var id in data){
            if(data[id])
                str += id + ": " + data[id] + <br/>
        }
        return str;
	};

	massids = (data) => {
		var str = "";
	    if(data.length > 0){
	        for(var i = 0; i < data.length; ++i){
	            str += data[i] + <br/>;
	        }
	    }
	    return str;
	};

	reses = (data) => {
		var str = "";
        if(data){
            for(var resid in data){
                str += "res" +resid + ": " + data[resid] + <br/>;
            }
        }
        return str;
	};

	items = (data) => {
		var str = "";
        for(var id in data){
            if(data[id])
                str += id + ": " + data[id] + <br/>;
        }
        return str;
	};

	//查询出征查询
	getOutArmyajax= () => {
		var _this = this;
		Ajax({sessionid:this.state.sessionid , id:this.state.svr},"role.marcharmy.getoutarmy").then(function(r){
			// if(r.data.errorcode == 0){
                var data = JSON.parse(r.data.result);
                console.log(data);
                var datas = [];
                for(var id in data){
                	var obj = data[id];
                	var s = id;
                	s = {};
                	s.key = id;
                	s.type = obj.type;
                	s.startposition = "( " + obj.src.posx + " ," + obj.src.posy + ")";
                	s.targetposition = "( " + obj.dst.posx + " ," + obj.dst.posy + ")";
                	s.units = _this.units(obj.units);
                	s.wounded = _this.wounded(obj.wounded);
                	s.reses = _this.reses(obj.reses);
                	s.items = _this.items(obj.items);
                	s.massids = _this.massids(obj.massids);
                	s.operation = <Button type="primary" onClick={() => _this.forceReturnArmy(this.state.sessionid,id)} >强制返回</Button>;
                	datas.push(s);
                }
                _this.setState ({
                	tab:datas
                });
            // }
		})
	} 

	//强制返回
	forceReturnArmy = (sessionid,maid) => {
		Ajax({sessionid:sessionid , maid:maid},"role.marcharmy.forcereturn").then(function(r){
			var data = JSON.parse(r.data.result);
            console.log(data);
		})
	};

	//清除所有集结队伍
	clearMassids = () => {
		Ajax({sessionid:this.state.sessionid, id:this.state.svr},"role.marcharmy.clearmassids").then(function(r){
			var data = JSON.parse(r.data.result);
            console.log(data);
		})
	};

	//遣返所有部队
	roleReturnAllArmies = () => {
		Ajax({sessionid:this.state.sessionid, id:this.state.svr},"role.marcharmy.rolereturnallarmies").then(function(r){
			var data = JSON.parse(r.data.result);
            console.log(data);
		})
	};

	//清除联盟战争
	forceRemoveMassBattle = () => {
		Ajax({sessionid:this.state.sessionid, id:this.state.svr, massid:this.state.id},"role.marcharmy.forceremovemassbattle").then(function(r){
			var data = JSON.parse(r.data.result);
            console.log(data);
		})
	}

	render(){
		console.log(this.state.tab)
		const col = [{
			title:'类型',
			dataIndex:'type',
			key:'type'
		}, {
			title:'出发位置',
			dataIndex:'startposition',
			key:'startposition'
		}, {
			title:'目标位置',
			dataIndex:'targetposition',
			key:'targetposition'
		}, {
			title:'units',
			dataIndex:'units',
			key:'units'
		}, {
			title:'wounded',
			dataIndex:'wounded',
			key:'wounded'
		}, {
			title:'reses',
			dataIndex:'reses',
			key:'reses'
		}, {
			title:'items',
			dataIndex:'items',
			key:'items'
		}, {
			title:'massids',
			dataIndex:'massids',
			key:'massids'
		}, {
			title:'操作',
			dataIndex:'operation',
			key:'operation'
		}];
		return (
			<div>
				<ContentHeader header='出征队列修改' />
				<Selects name='服务器:' val='请选择' data={this.server()} onChange={this.typesvr} />
				<Input name='sessionid:' val='sessionid' onChange={(e) => this.value('sessionid',e)} />
				<But name='查询出征查询' onClick={this.getOutArmyajax} />
				<But name='清除所有集结队伍' onClick={this.clearMassids} />
				<But name='遣返所有部队' onClick={this.roleReturnAllArmies} />
				<Input name='massid:' val='massid' onChange={(e) => this.value('id',e)} />
				<But name='清除联盟战争' onClick={this.forceRemoveMassBattle} />
				<Tab columns={col} dataSource={this.state.tab} />
			</div>
		)
	}
}

export default Marcharmy;