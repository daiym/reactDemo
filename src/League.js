import React, { Component } from 'react';
import ContentHeader from './ContentHeader';
// import Select from './Select';
// import InputBtn from './InputBtn';
import Tab from './Tab';
import Selects from './Select';
import Input from './Input';
import { Select } from 'antd';
import Ajax from './Ajax';//Ajax
import Format from './Format';//Format
import Button from './Button';
const Option = Select.Option;


class League extends Component {
	constructor(props){
		super(props);
		this.state = {
			server:'',
			id:'',
			infodata:[],
			infobase:[],
		}
	}

	server = () => {
		var s = JSON.parse(localStorage['server@'+ localStorage.name]);
		return s.map((item,index) => {
					var uniqueid = JSON.stringify(item.uniqueid)
					return <Option key={index} value={uniqueid}>{uniqueid + '服务器'}</Option>;
				})
	}

	handleChange = (value) => {
		this.setState ({
			server:value
		})
	}

	idChange = (e) => {
		this.setState ({
			id:e.target.value
		})
	}

	getAjax = () =>{
		const _this = this;
		Ajax({
			uniqueid:_this.state.server,
			shortname:_this.state.id
		},'league.info').then(function(r){
			var res = JSON.parse(r.data.result)
			console.log(r)
			console.log('league.info: ',res)
			var info = res.info;
			const data = [{
				titlename:'leagueid'
			},{
				titlename:'名称'
			},{
				titlename:'联盟语言'
			},{
				titlename:'联盟最多可容纳'
			},{
				titlename:'联盟宣言'
			},{
				titlename:'联盟等级'
			},{
				titlename:'创建时间'
			},{
				titlename:'盟主'
			},{
				titlename:'联盟总战力'
			},{
				titlename:'入盟基地等级要求'
			}];
			let list = [];
			if(res.info !== ''){
				for(var i in res.info){
					list = [info.names.id,
								info.names.shortname,
								info.langid,
								info.maxcount,
								info.announcement,
								info.level,
								Format(info.createtime),
								info.owner,
								info.powerpoint,
								info.applycitylevel]
				}
			}
			for(var s = 0; s < data.length; s++){
				data[s].key = s;
				data[s].result = list[s];
			}
			let base = [];
			for(var index in res){
				var baseres = res[index];
				if(baseres.baseinfo){
					var i = index+'1';
					i = {};
					i.key = index;
					i.name = baseres.baseinfo.name.name;
					i.sessionid = index;
					i.grade = 'R' + baseres.baseinfo.leaguelevel
					i.leaguetime = index;
					i.leaguegrade = baseres.baseinfo.citylevel;
					base.push(i);
				}
			}
			_this.setState ({
				infodata:data,
				infobase:base
			})
		})
	}

	render() {
		const columns = [{
		  title: '名称/Title',
		  dataIndex: 'titlename',
		  key: 'titlename',
		}, {
		  title: '结果/Result',
		  dataIndex: 'result',
		  key: 'result',
		}];
		const number = [{
			title:'name',
			dataIndex:'name',
			key:'name',
		},{
			title:'sessionid',
			dataIndex:'sessionid',
			key:'sessionid',
		},{
			title:'R等级',
			dataIndex:'grade',
			key:'grade',
		},{
			title:'入盟时间',
			dataIndex:'leaguetime',
			key:'leaguetime',
		},{
			title:'基地等级',
			dataIndex:'leaguegrade',
			key:'leaguegrade',
		}];
		return (
			<div>
				<ContentHeader header='联盟查询' />
				<Selects name='服务器:' val='请选择' data={this.server()} onChange={this.handleChange}/>
				<Input name='联盟简称:' val='联盟简称' onChange={this.idChange}/>
				<Button name='查询' onClick={this.getAjax}/>
				<ContentHeader header='联盟基本信息' />
				<Tab dataSource={this.state.infodata} columns={columns} />
				<ContentHeader  header='联盟成员' />
				<Tab dataSource={this.state.infobase} columns={number}/>
			</div>
		)
	}
}

export default League;