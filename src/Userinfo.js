import React, { Component } from 'react';
import ContentHeader from './ContentHeader';
import Selects from './Select';
// import InputBtn from './InputBtn';
import Input from './Input';
import Tab from './Tab';
import { Select } from 'antd';
import Ajax from './Ajax';//Ajax
import Button from './Button';
const Option = Select.Option;

class Userinfo extends Component {
	constructor(props){
		super(props);
		this.state = {
			sessionid:'',
			dataSource:[]
		}
	}
	
	change = (e) => {
		this.setState ({
			sessionid:e.target.value
		})
	}

	server = () => {
		var s = JSON.parse(localStorage['server@'+ localStorage.name]);
		return s.map((item,index) => {
					var uniqueid = JSON.stringify(item.uniqueid)
					return <Option key={index} value={uniqueid}>{uniqueid + '服务器'}</Option>;
				})
	}

	getAjax = () => {
		const _this = this;
		Ajax({
			sessionid:_this.state.sessionid
		},'role.roleinfo.sessionid').then(function(r){
			var res = JSON.parse(r.data.result);
			console.log(res)
			const data = [];
			const a = {};
			const b = {};
			const c = {};
			const d = {};
			const e = {};
			const f = {};
			a.key = 1;
			a.titlename = '用户sessionid';
			a.result = res.sessionid;
			b.key = 2;
			b.titlename = '服务器/Server';
			b.result = res.unqueid + '服务器';
			c.key = 3;
			c.titlename = '玩家名字/UserName';
			c.result = res.pos.baseinfo.name.name;
			d.key = 4;
			d.titlename = '主基地等级/BaseLV';
			d.result = res.pos.baseinfo.citylevel;
			e.key = 5;
			e.titlename = '指挥官等级/Commander Lv';
			e.result = res.info.level;
			f.key = 6;
			f.titlename = '语言/Language	zh';
			f.result = res.info.showinfo.langid;
			data.push(a,b,c,d,e,f);
			_this.setState ({
				dataSource:data
			})
		})
	}
	render(){
		const dataSource = this.state.dataSource;

		const ColumnGroup = [{
		  title: '名称/Title',
		  dataIndex: 'titlename',
		  key: 'titlename',
		}, {
		  title: '结果/Result',
		  dataIndex: 'result',
		  key: 'result',
		}];
		return(
			<div>
				<ContentHeader header='用户信息' />
				<Selects name='服务器:' val='请选择' data={this.server()}/>
				<Input name='用户名:' val='用户名' />
				<Input name='用户id:' val='用户id' />
				<Input name='用户sessionid:' val='用户sessionid' onChange={this.change}/>
				<Button name='查询' onClick={this.getAjax}/>
				<ContentHeader header='查询结果' />
				<Tab dataSource={dataSource} columns={ColumnGroup} />
			</div>
		)
	}
}


export default Userinfo;