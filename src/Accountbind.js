import React, { Component } from 'react';
import ContentHeader from './ContentHeader';
import Input from './Input';
import InputBtn from './InputBtn';
import Tab from './Tab';
import Button from './Button';

class Accountbind extends Component {
	render() {
		const dataSource = [{
		  key: '1',
		  name: '胡彦斌',
		  age: 32,
		  address: '西湖区湖底公园1号'
		}, {
		  key: '2',
		  name: '胡彦祖',
		  age: 42,
		  address: '西湖区湖底公园1号'
		}, {
		  key: '3',
		  name: '胡彦祖',
		  age: 42,
		  address: '西湖区湖底公园1号'
		}];

		const columns = [{
		  title: '姓名',
		  dataIndex: 'name',
		  key: 'name',
		}, {
		  title: '年龄',
		  dataIndex: 'age',
		  key: 'age',
		}, {
		  title: '住址',
		  dataIndex: 'address',
		  key: 'address',
		}];
		return (
			<div>
				<ContentHeader header='账户绑定信息' />
				<Input name='plat:' val='plat' />
				<InputBtn name='bindsessionid:' btn='查询' val='bindsessionid' />
				<InputBtn name='unbindsessionid:' btn='查询' val='unbindsessionid' />
				<Button name='下一步' />
				<ContentHeader header='绑定状态' />
				<Tab dataSource={dataSource} columns={columns} />
				<ContentHeader header='查询结果' />
				<Tab dataSource={dataSource} columns={columns} />
				<Tab dataSource={dataSource} columns={columns} />
				<Button name='绑定' />
			</div>
		)
	}
}

export default Accountbind;