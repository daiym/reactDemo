import React, { Component } from 'react';
import ContentHeader from './ContentHeader';
import Tab from './Tab';
import But from './But';
import Ajax from './Ajax';//Ajax
import Input from './Input';
import { Button } from 'antd';

class Testpay extends Component{
	constructor(props){
		super(props);
		this.state = ({
			sessionid:'',
			id:'',
			tab:[]
		})
	}

	//value
	value = (name,e) => {
		this.setState ({
			[name]:e.target.value
		})
	};

	idajax = (sessionid,id) => {
		console.log(sessionid,id)
		Ajax({sessionid:sessionid , dataid:id},"role.pay.testpay").then(function(r){
			if(r.data.errorcode == 0){
				var data = JSON.parse(r.data.result);
				console.log(data);
			}
		})
	}

	sessionidajax = () => {
		var _this = this;
		Ajax({sessionid:this.state.sessionid},"role.pay.showinfo").then(function(r){
			if(r.data.errorcode == 0){
				var data = JSON.parse(r.data.result);
				console.log(data);
				var payInfo = [];
				var testpaytab = [];
				for(var i = 0; i < data.normal.length; ++i){
	                payInfo.push(data.normal[i].id);
	            }
	            for(var i = 0; i < data.promotion.length; ++i){
	                payInfo.push(data.promotion[i].id);
	            }
	            payInfo = payInfo.sort(function(a,b){return a - b});
	            for(var i = 0 ; i < payInfo.length; i++){
	            	var dataid = payInfo[i];
	            	var s = i;
					s = {};
					s.key = i+1;
	            	s.testpay = <Button type="primary" onClick={() =>_this.idajax(_this.state.sessionid,dataid)} >testpay</Button>;
					s.name = dataid;
					testpaytab.push(s);
				};
				_this.setState ({
					tab:testpaytab
				})
							
			}
			
		})
	}
	
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
				<ContentHeader header='Test pay' />
				<Input name='seesionid:' val='seesionid' onChange={(e) => this.value('sessionid',e)} />
				<But name='查询' onClick={this.sessionidajax} />
				<Input name='id:' val='id' onChange={(e) => this.value('id',e)} />
				<But name='testpay' onClick={() => this.idajax(this.state.sessionid,this.state.id)} />
				<Tab columns={col} dataSource={this.state.tab} />
			</div>
		)
	}
}

export default Testpay;