import React, { Component } from 'react';
import ContentHeader from './ContentHeader';
import Tab from './Tab';
import Formats from './Formats';
import Format from './Format';
import Ajax from './Ajax';//Ajax
import Selects from './Select';
import Inputs from './Input';
import Inputvalue from './Inputvalue';
import But from './But';
import DateTime from './DateTime';
import gamedata from './gamedata';
import { Select,message,Tabs,Checkbox,Button,Input } from 'antd';
const Option = Select.Option;
const TabPane = Tabs.TabPane
const { TextArea } = Input;

class Buildkey extends Component{
	constructor(props){
		super(props);
		this.state = ({
			tab:[],
			plat:'',
			lang:'',
			title1:'',
			title2:'',
			content:'',
			datalangs:{},
			dataitems:{},
			tablangs:[],
			tabitems:[],
			item:'',
			itemcount:''
		})
	}

	callback = (key) => {
		console.log(key);
	}

	istime = (is) => {
		if(is == 0){
			return '';
		}else{
			return Format(is)
		};
	};

	isdisable = (is,key) => {
		var s = true;
		if(is){
			return <Checkbox onClick={() => this.disableajax(key,false)}>{''+is}</Checkbox>;
		}else{
			return <Checkbox checked={s} onClick={() => this.disableajax(key,true)}>{''+is}</Checkbox>;
		};
	};

	isCopyButton = (is) => {
		if(is > 0){
			return ''
		}else{
			return <Button type="primary">Copy</Button>
		};
	};

	isDelButton = (is,key) => {
		if(is){
			return <Button type="primary" onClick={() => this.removeajax(key)} >Remove</Button>
		}else{
			return ''
		};
	};

	//remove
	removeajax = (key) => {
		Ajax({key: key},"activation.code.remove").then(function(r){
			var data = JSON.parse(r.data.result);
			console.log("activation.code.remove: ",data);
		});
	};

	//disable
	disableajax = (key,disable) => {
		Ajax({key :key, disable: disable},"activation.code.disable").then(function(r){
			var data = JSON.parse(r.data.result);
			console.log("activation.code.disable: ",data);
		});
	};

	componentDidMount = () => {
		var _this = this;
		Ajax({},"activation.code.allkeys").then(function(r){
			var data = JSON.parse(r.data.result);
			console.log(data);
			if(Object.keys(data) != 0){
				var a = [];
				for(var k in data) {
					data[k].num = JSON.parse(k);
					a.push(data[k]);
				};				
				var a = a.sort(function(a,b){return b.num - a.num});
				var table = [];
				for(var k = 0; k < a.length; k++){
					var getallKeys = a[k];
					var s = k;
					s = {};
					s.key = k;
					s.id = getallKeys.num;
					s.begtime = _this.istime(getallKeys.begintime);
					s.endtime = _this.istime(getallKeys.endtime);
					s.createtime = _this.istime(getallKeys.createtime);
					s.dataid = getallKeys.dataid;
					s.plat = getallKeys.platinfo;
					s.display = _this.isdisable(getallKeys.disable,getallKeys.num);
					s.usecount = getallKeys.usecount;
					var isCopyButton= _this.isCopyButton(getallKeys.dataid);
					var isDelButton = _this.isDelButton(getallKeys.disable,getallKeys.num);
					s.cz = <div>{isCopyButton}{isDelButton}<Button type="primary">查看信息</Button></div>							
					table.push(s);
				}
				_this.setState ({
					tab:table
				});
			}
		})
	};

	//默认日历当天时间
	datatime = () => {
		var s = new Date();
		var c = Formats(s);	
		return c;
	};

	//语言
	lang = () => {
		var maillang = gamedata.lang;
		var list = Object.keys(maillang);
		var s = list.map(index => maillang[index]);
		return s.map((item,index) => {
					return <Option key={index} value={item.value}>{ item.info + (item.value)}</Option>;
				})
	};

	//item
	itemdata = () => {
		var mailitem = gamedata.items;
		var list = Object.keys(mailitem);
		var a = [];
		list.map((index) => {
			mailitem[index].num = index;
			a.push(mailitem[index])
		})
		return a.map((data,index) => {
				// var num = JSON.stringify(data.num);
				// console.log(typeof(num))
				// console.log(parseInt(num))
				return <Option key={index} value={data.num}>{'(id:'+ data.num +')'+data.langs.cn}</Option>;
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
			var data = this.state.datalangs;
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
		}
	};

	//删除lang
	deletelang = (lang) => {
		var data = this.state.datalangs;
		delete data[lang];
		this.datalang(data);
		console.log(data);
	};

	//lang 表格数据
	datalang = (data) => {
		var a =[];
		var num = 0;
		for(var lang in data){
			var s = lang;
			s = {};
			s.key = ++num;
			s.lang = lang;
			s.title1 = data[lang].title1;
			s.title2 = data[lang].title2;
			s.content = data[lang].content;
			s.cz = <Button type="primary" onClick={() => this.deletelang(lang)} >Delete</Button>
			a.push(s);
		};
		this.setState ({
			datalangs:data,
			tablangs:a
		});
	};

	//拼接lang
	langtable = () => {
		var data = this.state.datalangs;
		var lang = this.state.lang;
		data[lang] = {};
		data[lang].title1 = this.state.title1;
		data[lang].title2 = this.state.title2;
		data[lang].content = this.state.content;
		console.log(data);
		this.datalang(data);
	};

	//拼接item
	dataitem = () => {
		var data  = this.state.dataitems;
		var item = this.state.item;
		console.log(this.state.item)
		data[item] = parseInt(this.state.itemcount);
		this.itemtable(data);
	};

	//item  表格数据
	itemtable = (data) => {
		var a =[];
		for(var item in data){
			var s = {};
			item = parseInt(item)
			s.key = item;
			s.item = `${gamedata.items[item].langs.cn}(${item})`;
			s.count = data[item];
			s.cz = <div><Button type="primary" >Delete</Button><Button type="primary" >-</Button><Button type="primary" >+</Button></div>
			a.push(s);
		}
		this.setState ({
			dataitems:data,
			tabitems:a
		})
	}


	render(){
		const column = [{
			title:'id',
			dataIndex:'id',
			key:'id'
		}, {
			title:'开始时间',
			dataIndex:'begtime',
			key:'begtime'
		}, {
			title:'结束时间',
			dataIndex:'endtime',
			key:'endtime'
		}, {
			title:'创建时间',
			dataIndex:'createtime',
			key:'createtime'
		}, {
			title:'dataid',
			dataIndex:'dataid',
			key:'dataid'
		}, {
			title:'plat',
			dataIndex:'plat',
			key:'plat'
		}, {
			title:'display',
			dataIndex:'display',
			key:'display'
		}, {
			title:'usecount',
			dataIndex:'usecount',
			key:'usecount'
		}, {
			title:'操作',
			dataIndex:'cz',
			key:'cz'
		}];
		const columns = [{
			title:'lang',
			dataIndex:'lang',
			key:'lang'
		}, {
			title:'title1',
			dataIndex:'title1',
			key:'title1'
		}, {
			title:'title2',
			dataIndex:'title2',
			key:'title2'
		}, {
			title:'content',
			dataIndex:'content',
			key:'content'
		}, {
			title:'操作',
			dataIndex:'cz',
			key:'cz'
		}];
		const column1 = [{
			title:'item',
			dataIndex:'item',
			key:'item'
		}, {
			title:'count',
			dataIndex:'count',
			key:'count'
		}, {
			title:'操作',
			dataIndex:'cz',
			key:'cz'
		}];
		const column2 = [{
			title:'plat',
			dataIndex:'plat',
			key:'plat'
		}, {
			title:'begintime',
			dataIndex:'begintime',
			key:'begintime'
		}, {
			title:'endtime',
			dataIndex:'endtime',
			key:'endtime'
		}, {
			title:'dataid',
			dataIndex:'dataid',
			key:'dataid'
		}, {
			title:'usecount',
			dataIndex:'usecount',
			key:'usecount'
		}];
		
		return (
			<div>
				<ContentHeader header='激活码' />
				<Tabs onChange={this.callback} type="card">
			    <TabPane tab="激活码记录" key="1">
			    	<Tab columns={column} dataSource={this.state.tab} />
			    </TabPane>
			    <TabPane tab="激活码内容" key="2">
			    	<Inputs name='平台id:' val='平台id' onChange={(e) => this.value('plat',e)} />
			    	<DateTime name='开始时间' defaulttime={this.datatime()} />
					<DateTime name='结束时间' defaulttime={this.datatime()} />
					<Selects name='lang:' val='请选择' data={this.lang()} onChange={ (value) => this.typesvr('lang',value)} />
					<Inputvalue name='title1:' val='title1' value={this.state.title1} onChange={(e) => this.value('title1',e)} />
					<Inputvalue name='title2:' val='title2' value={this.state.title2} onChange={(e) => this.value('title2',e)} />
					<TextArea style={{ minHeight:80 , maxWidth: 800}} value={this.state.content} placeholder='content' onChange={(e) => this.value('content',e)} />
					<But name='添加' onClick={this.langtable} />
					<Tab columns={columns} dataSource={this.state.tablangs} />
					<hr />
					<Selects name='item:' val='请选择' data={this.itemdata()} onChange={ (value) => this.typesvr('item',value)} />
					<Inputs name='count:' val='count' onChange={(e) => this.value('itemcount',e)} />
					<But name='添加' onClick={this.dataitem} />
					<Tab columns={column1} dataSource={this.state.tabitems} />
					<hr />
					<But name='生效' />
					<Tab columns={column2} />
					<Inputs name='验证码数量:' val='验证码数量' />
					<But name='生成激活码' />
			    </TabPane>
			  </Tabs>
			</div>
		)
	}
};

export default Buildkey;