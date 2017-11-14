import React, { Component } from 'react';
import ContentHeader from './ContentHeader';
import Tab from './Tab';
import But from './But';
import Ajax from './Ajax';//Ajax
import Input from './Input';
import { Button } from 'antd';

class Testpay extends Component{
	
	render(){
		const col = [{
			title:'testpay',
			dataIndex:'testpay',
			key:'testpay'
		}, {
			title:'name',
			dataIndex:'name',
			key:'name'
		}]
		return(
			<div>
				<Input name='联盟简称:' val='联盟简称' onChange={this.value} />
				<But name='查询' />
				<Input name='联盟简称:' val='联盟简称' onChange={this.value} />
				<But name='testpay' />
				<Tab columns={col} />
			</div>
		)
	}
}

export default Testpay;