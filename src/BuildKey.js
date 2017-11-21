import React, { Component } from 'react';
import ContentHeader from './ContentHeader';
import Tab from './Tab';
import Formats from './Formats';
import Format from './Format';
import Ajax from './Ajax';//Ajax
import { Select,message,Tabs,Checkbox,Button } from 'antd';
const Option = Select.Option;
const TabPane = Tabs.TabPane

class Buildkey extends Component{
	constructor(props){
		super(props);
		this.state = ({
			tab1:[]
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

	isdisable = (is) => {
		var s = true;
		if(is){
			return <Checkbox>{''+is}</Checkbox>;
		}else{
			return <Checkbox checked={s}>{''+is}</Checkbox>;
		};
	};

	isCopyButton = (is) => {
		if(is > 0){
			return ''
		}else{
			return <Button type="primary">Copy</Button>
		};
	};

	isDelButton = (is) => {
		if(is){
			return <Button type="primary">Remove</Button>
		}else{
			return ''
		};
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
					s.display = _this.isdisable(getallKeys.disable);
					s.usecount = getallKeys.usecount;
					var isCopyButton= _this.isCopyButton(getallKeys.dataid);
					var isDelButton = _this.isDelButton(getallKeys.disable);
					s.cz = <div>{isCopyButton}{isDelButton}<Button type="primary">查看信息</Button></div>							
					table.push(s);
				}
				_this.setState ({
					tab:table
				});
			}
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
		}]
		return (
			<div>
				<ContentHeader header='激活码' />
				<Tabs onChange={this.callback} type="card">
			    <TabPane tab="激活码记录" key="1">
			    	<Tab columns={column} dataSource={this.state.tab} />
			    </TabPane>
			    <TabPane tab="激活码内容" key="2">Content of Tab Pane 2</TabPane>
			  </Tabs>
			</div>
		)
	}
};

export default Buildkey;