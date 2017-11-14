import React, { Component } from 'react';
import ContentHeader from './ContentHeader';
import Tab from './Tab';
import Input from './Input';
import Button from './Button';
import DateTime from './DateTime';
import Formats from './Formats';
import Ajax from './Ajax';//Ajax

class Goldlog extends Component {
	constructor(props){
		super(props);
		this.state = ({
			sessionid:'',
			begtime:'',
			endtime:'',
			id:''
		});
	};

	//默认日历当天时间
	datatime = () => {
		var s = new Date();
		var c = Formats(s)
		return c;
	};

	//默认日历值
	componentDidMount(){
		var t = new Date();
		var time = t.getTime()
		this.setState ({
			begtime:time,
			endtime:time
		});
	};

	//sess
	sess = (e) => {
		this.setState ({
			id:e.target.value
		});
	};

	//onChange  取日历值
	timedata = (date, dateString, Time) => {
		if(date != null){
			console.log(date, dateString,Time);
			var a = (date._d).getTime();
			this.setState ({
				[Time]:a
			});
		};
	};

	//ajax
	postajax = () => {
		const _this = this;
		Ajax({
			sessionid:_this.state.id,
			timebegin:_this.state.begtime,
			timeend:_this.state.endtime
		},"role.goldlog").then(function(r){
			console.log(r.data.result);
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
				<ContentHeader header='金币日志' />
				<Input name='sessionid:' val='sessionid' onChange={this.sess}/>
				<DateTime name='开始时间' defaulttime={this.datatime()} onChange={ (date, dateString) => this.timedata(date, dateString, 'begtime')} />
				<DateTime name='结束时间' defaulttime={this.datatime()} onChange={ (date, dateString) => this.timedata(date, dateString, 'endtime')} />
				<Button name='查询' onClick={this.postajax}/>
				<ContentHeader header='查询信息' />
				<Tab dataSource={dataSource} columns={columns} />
			</div>
		)
	}
}

export default Goldlog;