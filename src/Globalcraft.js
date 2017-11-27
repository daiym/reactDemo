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
import { Select } from 'antd';
const Option = Select.Option;

class globalcraft extends Component {

	//默认日历当天时间
	datatime = () => {
		var s = new Date();
		var c = Formats(s);	
		return c;
	};

	server = () => {
		var s = JSON.parse(localStorage['server@'+ localStorage.name]);
		return s.map((item,index) => {
					var uniqueid = JSON.stringify(item.uniqueid)
					return <Option key={index} value={uniqueid}>{uniqueid + '服务器'}</Option>;
				})
	}

	render(){
		return (
			<div>
				<ContentHeader header='跨服军备竞赛' />
				<Tab />
				<ContentHeader header='排行榜' />
				<Tab />
				<Multiselect name='item:' val='请选择' data={this.server()} />
				<DateTime name='开始时间' defaulttime={this.datatime()} />
				<Inputs name='持续天数:' val='持续天数' />
				<Inputs name='关闭天数:' val='关闭天数' />
				<But name='开启' />
				<Tab />
			</div>
		)
	}
}

export default globalcraft;