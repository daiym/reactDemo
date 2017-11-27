import React, { Component } from 'react';
import ContentHeader from './ContentHeader';
import Tab from './Tab';
import Formats from './Formats';
import Format from './Format';
import Ajax from './Ajax';//Ajax
import Selects from './Select';
import But from './But';
import Inputs from './Input';
import gamedata from './gamedata';
import { Select } from 'antd';
const Option = Select.Option;

class generalpowerladder extends Component {
	constructor(props){
		super(props);
		this.state = ({
			plat:'',
			svr:''
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

	//下拉
	selects = (name,value) => {
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

	postajax = () => {
		Ajax({unqiueid:this.state.svr, platid:this.state.plat},'servers.temp.activition.generalpowerladder').then(function(r){
			if(r){
				var data = JSON.parse(r.data.result);
				console.log(data);
			}
		})
	}

	render(){
		return(
			<div>
				<ContentHeader header='军官战力排行榜' />
				<Selects name='server:' val='请选择' data={this.server()} onChange={(value) => this.selects('svr',value)} />
				<Inputs name='plat:' val='plat' onChange={(e) => this.value('plat',e)} />
				<But name='reward' onClick={this.postajax} />
			</div>
		)
	}
}

export default generalpowerladder;