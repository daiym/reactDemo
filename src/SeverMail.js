import React, { Component } from 'react';
import ContentHeader from './ContentHeader';
import { Tabs } from 'antd';
import Tab from './Tab';
import Selects from './Select';
import Inputs from './Input';
import Inputvalue from './Inputvalue';
import But from './Button';
import Checkbox from './Checkbox';
import Time from './Time';
import gamedata from './gamedata';
import Ajax from './Ajax';//Ajax
import Formats from './Formats';
import Format from './Format';
import { Select,Button,Input } from 'antd';
const Option = Select.Option;
const TabPane = Tabs.TabPane;
const { TextArea } = Input;


class SeversMail extends Component {
	constructor(props){
		super(props);
		this.state = ({
			tab1:[],
			name:'',
			lang:'',
			title1:'',
			title2:'',
			content:'',
			objdatalang:{},
			tablang:[],
			item:'',
			count:'',
			objdataitem:{},
			tabitem:[]
		})
	}

	callback = (key) => {
		console.log(key);			
	}

	//邮件记录数据
	componentDidMount(){
		var _this = this;
		Ajax({},"servers.rolemail.mails").then(function(r){
			var res = JSON.parse(r.data.result);
			console.log(res)
			var objdata = [];
			var svrs = '';
			var times = '';			
			for(var i in res){
				var mail = res[i];
				var content = JSON.parse(mail.mailjson);
				for(var index in content.times){
					times = 'type'+index
				}
				for(var index in mail.svrs){
					svrs = index+','
				}
				var obj = {};
				obj.key = i;
				obj.id = i;
				obj.svrs = svrs;
				obj.plat = content.platid;
				obj.mailname = mail.name;
				obj.createuser = mail.createuser;
				obj.createtime = Format(mail.createtime);
				obj.validatetime = Format(content.validatetime);
				obj.times = times;
				obj.valid = ''+mail.valid;
				obj.operation = <div><Button type="primary">copy</Button><Button type="primary">cancel</Button><Button type="primary">查看信息</Button></div>
				objdata.push(obj);
			};
			_this.setState ({
				tab1:objdata
			})
		})
	};

	//value
	value = (name,e) => {
		this.setState ({
			[name]:e.target.value
		})
	};

	//下拉
	typesvr = (name,value) => {
		this.setState ({
			[name]:value
		});
		if(name == 'lang'){
			var data = this.state.objdatalang;
			if(!data[value]){
				this.setState ({
					title1:'',
					title2:'',
					content:''
				})
			}else{
				this.setState ({
					title1:data[value].title1,
					title2:data[value].title2,
					content:data[value].content
				})
			}
		}else if(name == 'item'){
			var data = this.state.objdataitem;
			if(!data[value]){
				this.setState ({
					count:''
				})
			}else{
				this.setState ({
					count:data[value]
				})
			}
		};
	};

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
				return <Option key={index} value={data.num}>{'(id:'+ data.num +')'+data.langs.cn}</Option>;
				})
	};

	//拼接lang
	datalang = () => {
		var data = this.state.objdatalang;
		var langs = this.state.lang;
		data[langs] = {};
		data[langs].title1 = this.state.title1;
		data[langs].title2 = this.state.title2;
		data[langs].content = this.state.content;
		console.log(data);
		this.langtable(data)
	};

	//lang表格
	langtable = (data) => {
		var num = 0;
		var a = [];
		for(var lang in data){
			var s = {};
			s.key = ++num;
			s.lang = lang;
			s.title1 = data[lang].title1;
			s.title2 = data[lang].title2;
			s.content = data[lang].content;
			s.cz = <Button type="primary" >Delete</Button>
			a.push(s);
		};
		this.setState ({
			objdatalang:data,
			tablang:a
		})
	};

	//拼接item
	dataitem = () => {
		var data = this.state.objdataitem;
		var items = this.state.item;
		data[items] = parseInt(this.state.count);
		console.log(data)
		this.itemtable(data);
	};

	//item表格
	itemtable = (data) => {
		var num = 0;
		var a = [];
		for(var i in data){
			var s = {};
			s.key = ++num;
			s.name = i;
			s.count = data[i];
			s.cz = <div><Button type="primary" >-</Button><Button type="primary" >+</Button><Button type="primary" >Delete</Button></div>
			a.push(s);
		};
		this.setState ({
			objdataitem:data,
			tabitem:a
		})
	};
	
	render() {
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
		  title: 'mailname',
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
		const column1 = [{
			title:'lang',
			dataIndex:'lang',
			key:'lang',
		}, {
			title:'title1',
			dataIndex:'title1',
			key:'title1',
		}, {
			title:'title2',
			dataIndex:'title2',
			key:'title2',
		}, {
			title:'content',
			dataIndex:'content',
			key:'content',
		}, {
			title:'操作',
			dataIndex:'cz',
			key:'cz',
		}];
		const column2 = [{
			title:'name',
			dataIndex:'name',
			key:'name',
		}, {
			title:'count',
			dataIndex:'count',
			key:'count',
		}, {
			title:'操作',
			dataIndex:'cz',
			key:'cz',
		}];
		return (
			<div>
				<ContentHeader header='邮件' />
				<Tabs onChange={this.callback} type="card">
				    <TabPane tab="邮件记录" key="1">
				    	<Tab dataSource={this.state.tab1} columns={columns} />
				    </TabPane>
				    <TabPane tab="编辑邮件" key="2">
				    	<Inputs name='邮件名:' val='邮件名' onChange={(e) => this.value('name',e)} />
				    	<Selects name='语言:' val='请选择' data={this.lang()} onChange={(value) => this.typesvr('lang',value)} />
						<Inputvalue name='title1:' val='title1' value={this.state.title1} onChange={(e) => this.value('title1',e)} />
						<Inputvalue name='title2:' val='title2' value={this.state.title2} onChange={(e) => this.value('title2',e)} />
						<TextArea style={{ minHeight:80 , maxWidth: 800}} value={this.state.content} onChange={(e) => this.value('content',e)} />
				    	<But name='保存草稿' onClick={this.datalang} />
				    	<Tab columns={column1} dataSource={this.state.tablang} />
				    	<hr />
				    	<Selects name='item:' val='请选择' data={this.itemdata()} onChange={(value) => this.typesvr('item',value)} />
						<Inputvalue name='count:' val='count' value={this.state.count} onChange={(e) => this.value('count',e)} />
				    	<But name='添加' onClick={this.dataitem} />
				    	<Tab columns={column2} dataSource={this.state.tabitem} />
				    	<hr />
				    	<Inputs name='level:' val='level' />
				    	<Selects name='item:' val='请选择' data={this.itemdata()} />
				    	<Inputs name='count:' val='count' />
				    	<But name='添加' />
				    	<Tab columns={columns} />
				    	<hr />
				    	<Inputs name='URL Name:' val='URLName' />
				    	<Inputs name='URL:' val='URL' />
				    	<But name='添加URL' />
				    	<Tab columns={columns} />
				    	<hr />
				    	<Checkbox val='标记是否为更新邮件' />
				    </TabPane>
				    <TabPane tab="设置Severs" key="3">
				    	<Inputs name='平台id:' val='' />
				    	<Checkbox val='all servers' />
				    	<Selects name='服务器:' val='请选择' data={this.props.data} />
				    	<Tab columns={columns} />
				    	<Time name='生效时间' />
				    	<Selects name='生效操作:' val='请选择' data={this.props.data} />
				    	<But name='发送' />
				    </TabPane>
			  	</Tabs>
			</div>
		)
	}
}

export default SeversMail;