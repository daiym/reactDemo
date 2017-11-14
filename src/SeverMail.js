import React, { Component } from 'react';
import ContentHeader from './ContentHeader';
import { Tabs } from 'antd';
import Tab from './Tab';
import Selects from './Select';
import Input from './Input';
import Button from './Button';
import Checkbox from './Checkbox';
import Time from './Time';
import gamedata from './gamedata';
import Ajax from './Ajax';//Ajax
import { Select } from 'antd';
const Option = Select.Option;
const TabPane = Tabs.TabPane;


class SeversMail extends Component {
	constructor(props){
		super(props);
		this.state = ({
			mailRecord:''
		})
	}
	callback = (key) => {
		console.log(key);			
	}

	// Gmtools.mail = {};


	//邮件记录数据
	componentDidMount(){
		Ajax({},"servers.rolemail.mails").then(function(r){
		var res = JSON.parse(r.data.result);
			console.log(res)
			// var c = Object.keys(res);
			// var s = [];
			// for(var i = 0; i < c.length; i++){
			// 	var data = x[i];
			// 	data = {};
			// 	data.id = data;				
			// 	data.svrs = data;
			// 	data.plat
			// }
		})
	}

	//语言
	lang = () => {
		var maillang = gamedata.lang;
		var list = Object.keys(maillang);
		var s = list.map(index => maillang[index]);
		var a = 0;
		return s.map((item,index) => {
					return <Option key={index} value={item.value}>{ item.info + (item.value)}</Option>;
				})
	}

	//道具
	itemdata = () => {
		var mailitem = gamedata.items;
		var list = Object.keys(mailitem);
		var a = [];
		list.map((index) => {
			mailitem[index].num = index;
			a.push(mailitem[index])
		})
		return a.map((data,index) => {
				var num = JSON.stringify(data.num);
				return <Option key={index} value={num}>{'(id:'+ num +')'+data.langs.cn}</Option>;
				})
	}
	
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
		  title: 'id',
		  dataIndex: 'id',
		  key: 'id',
		}, {
		  title: 'svrs',
		  dataIndex: 'svrs',
		  key: 'svrs',
		}, {
			title:'plat',
			dataIndex:'plat',
			key:'plat',
		}, {
		  title: 'mail name',
		  dataIndex: 'mailname',
		  key: 'mailname',
		}, {
			title:'createuser',
			dataIndex:'createuser',
			key:'createuser',
		}, {
			title:'createtime',
			dataIndex:'createtime',
			key:'createtime',
		}, {
			title:'validatetime',
			dataIndex:'validatetime',
			key:'validatetime',
		}, {
			title:'times',
			dataIndex:'times',
			key:'times',
		}, {
			title:'valid',
			dataIndex:'valid',
			key:'valid',
		}, {
			title:'操作',
			dataIndex:'operation',
			key:'operation',
		}];	
		return (
			<div>
				<ContentHeader header='邮件' />
				<Tabs onChange={this.callback} type="card">
				    <TabPane tab="邮件记录" key="1">
				    	<Tab dataSource={dataSource} columns={columns} />
				    </TabPane>
				    <TabPane tab="编辑邮件" key="2">
				    	<Input name='邮件名:' val='邮件名' />
				    	<Selects name='语言:' val='请选择' data={this.lang()} />
				    	<Input name='title1:' val='title1' />
				    	<Input name='title2:' val='title2' />
				    	<Button name='保存草稿' />
				    	<Tab dataSource={dataSource} columns={columns} />
				    	<hr />
				    	<Selects name='item:' val='请选择' data={this.itemdata()} />
				    	<Input name='count:' val='count' />
				    	<Button name='添加' />
				    	<Tab dataSource={dataSource} columns={columns} />
				    	<hr />
				    	<Input name='level:' val='level' />
				    	<Selects name='item:' val='请选择' data={this.itemdata()} />
				    	<Input name='count:' val='count' />
				    	<Button name='添加' />
				    	<Tab dataSource={dataSource} columns={columns} />
				    	<hr />
				    	<Input name='URL Name:' val='URLName' />
				    	<Input name='URL:' val='URL' />
				    	<Button name='添加URL' />
				    	<Tab dataSource={dataSource} columns={columns} />
				    	<hr />
				    	<Checkbox val='标记是否为更新邮件' />
				    </TabPane>
				    <TabPane tab="设置Severs" key="3">
				    	<Input name='平台id:' val='' />
				    	<Checkbox val='all servers' />
				    	<Selects name='服务器:' val='请选择' data={this.props.data} />
				    	<Tab dataSource={dataSource} columns={columns} />
				    	<Time name='生效时间' />
				    	<Selects name='生效操作:' val='请选择' data={this.props.data} />
				    	<Button name='发送' />
				    </TabPane>
			  	</Tabs>
			</div>
		)
	}
}

export default SeversMail;