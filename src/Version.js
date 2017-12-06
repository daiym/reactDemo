import React, { Component } from 'react';
import ContentHeader from './ContentHeader';
import Tab from './Tab';
import Ajax from './Ajax';//Ajax
import But from './But';
import Inputs from './Input';
import { Checkbox,Button,Modal } from 'antd';
const CheckboxGroup = Checkbox.Group;

class Version extends Component {
	constructor(props){
		super(props);
		this.state = ({
			tab1:[],
			visible:false,
			low:'',
			higt:'',
			paymode:'',
			packagename:'',
			objpackagename:[]
		})
	};

	czremovefn = (is,packagename) => {
		var open = !is;
		if(is){
			return <Button type="primary" onClick={() => this.coupon(packagename,open)}>关闭</Button>
		}else{
			return <Button type="primary" onClick={() => this.coupon(packagename,open)}>开启</Button>
		}
	};

	//开启关闭
	coupon = (packagename,open) => {
		Ajax({packagename:packagename , open:open},"platids.coupon").then(function(r){
			var data = JSON.parse(r.data.result);
			console.log(data);
		})
	};

	//paymode
	paymode = (packagename) => {
		this.setState ({
			visible:true,
			packagename:packagename
		});
	};

	handleOk = (packagename,paymode) => {
		var _this = this;
		if(packagename !='' && paymode != ''){
			Ajax({packagename:_this.state.packagename , paymode:_this.state.paymode},"platids.paymode").then(function(r){
				var data = JSON.parse(r.data.result);
				console.log(data);
			})
			_this.setState ({
				visible:false
			});
		}
	};

	onCancel = () => {
		this.setState ({
			visible:false
		});
	};

	//撤销
	reset = () => {
		Ajax({},"platids.reset").then(function(r){
			var data = JSON.parse(r.data.result);
			console.log(data);
		})
	};

	//保存
	save = () => {
		Ajax({},"platids.save").then(function(r){
			var data = JSON.parse(r.data.result);
			console.log(data);
		})
	};

	//改版本号
	version = (packages,high,low) => {
		Ajax({packages:packages , high:high , low:low},"platids.version").then(function(r){
			var data = JSON.parse(r.data.result);
			console.log(data);
		})
	};

	//check
	checkfn = (checked,packagename) => {
		if(checked.target.checked){
			this.state.objpackagename.push(packagename);
		}else{
			this.state.objpackagename.splice(this.state.objpackagename.indexOf(packagename),1)
		};
		this.setState ({
			objpackagename:this.state.objpackagename
		})
	};

	componentDidMount(){
		var _this = this;
		Ajax({},"platids.infos").then(function(r){
			var data = JSON.parse(r.data.result);
			console.log(data);
			var data = data.sort(function(a,b){ var x1 = a.platflag.localeCompare(b.platflag); if (x1==0) x1 = a.os.localeCompare(b.os); return x1;});
			var objdata = [];
			data.map((item,index) => {
				var obj = {};
				obj.key = index;
				obj.checkbox = <Checkbox onChange={(checked) => _this.checkfn(checked,item.packagename)} ></Checkbox>;
				obj.index = index;
				obj.platflag = item.platflag;
				obj.os = item.os;
				obj.platid = item.platid;
				obj.coupon = ''+item.coupon;
				var czremove = _this.czremovefn(item.coupon,item.packagename);
				obj.czremove = czremove;
				obj.paymode = item.paymode;
				obj.revise = <Button type="primary" onClick={() => _this.paymode(item.packagename)}>修改paymode</Button>;
				obj.versionhigh  = item.version_high;
				obj.versionlow = item.version_low;
				obj.cz = <Button type="primary" >查看</Button>
				objdata.push(obj);
			})
			_this.setState ({
				tab1:objdata
			})
		})
	}

	//value
	value = (name,e) => {
		this.setState ({
			[name]:e.target.value
		})
	};

	//改版本号
	version = (packages,high,low) => {
		Ajax({packages:this.state.objpackagename , high:this.state.high , low:this.state.low},"platids.version").then(function(r){
			var data = JSON.parse(r.data.result);
			console.log(data);;
		})
	};

	

	render(){
		const colunm = [{
			title:'checkbox',
			dataIndex:'checkbox',
			key:'checkbox'
		}, {
			title:'index',
			dataIndex:'index',
			key:'index'
		}, {
			title:'platflag',
			dataIndex:'platflag',
			key:'platflag'
		}, {
			title:'os',
			dataIndex:'os',
			key:'os'
		}, {
			title:'platid',
			dataIndex:'platid',
			key:'platid'
		}, {
			title:'coupon',
			dataIndex:'coupon',
			key:'coupon'
		}, {
			title:'操作',
			dataIndex:'czremove',
			key:'czremove'
		}, {
			title:'paymode',
			dataIndex:'paymode',
			key:'paymode'
		}, {
			title:'操作',
			dataIndex:'revise',
			key:'revise'
		}, {
			title:'versionhigh',
			dataIndex:'versionhigh',
			key:'versionhigh'
		}, {
			title:'versionlow',
			dataIndex:'versionlow',
			key:'versionlow'
		}, {
			title:'操作',
			dataIndex:'cz',
			key:'cz'
		}];
		return (
			<div>
				<Modal
					title="title"
					visible={this.state.visible}
					onOk={this.handleOk}
					onCancel={this.onCancel}
					>
					<Inputs name='paymode:' val='paymode' onChange={(e) => this.value('paymode',e)} />
				</Modal>
				<ContentHeader header='版本信息' />
				<But name='撤销' onClick={this.reset} />
				<But name='保存' onClick={this.save} />
				<Tab columns={colunm} dataSource={this.state.tab1} />
				<Inputs name='high:' val='high' onChange={(e) => this.value('high',e)} />
				<Inputs name='low:' val='low' onChange={(e) => this.value('low',e)} />
				<But name='改版本号' onClick={this.version} />
			</div>
		)
	}
};

export default Version;