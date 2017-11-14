import React, { Component } from 'react';
import ContentHeader from './ContentHeader';
import DateTime from './DateTime';
import Formats from './Formats';
import Format from './Format';
import Ajax from './Ajax';//Ajax
import But from './But';

class PayLogs extends Component {
	constructor(props){
		super(props);
		this.state = ({
			beg:'',
			end:''
		})
	};

	componentDidMount(){
		var t = new Date();
		var time = t.getTime()
		this.setState ({
			beg:time,
			end:time
		})
	};

	//time
	datetime = (name,date,dateString) => {
		if(date != null){
			console.log(date, dateString ,date._d);
			var a = (date._d).getTime();
			this.setState ({
				[name]:a
			});
		};
	};

	//默认日历当天时间
	datatime = () => {
		var s = new Date();
		var c = Formats(s);	
		return c;
	};

	//ajax
	postajax = () => {
		var _this = this;
		Ajax({begintime:this.state.beg , endtime:this.state.end},"servers.log.paylog").then(function(r){
			if(r.data.errorcode == 0){
				var data = JSON.parse(r.data.result);
				console.log(data);
				var codeGet = "";
				for(var i = 0; i < data.length; ++i){
					codeGet += JSON.parse(r[i]) + '\r\n';
	                // var paylog = data[i].paylog;
	                // data[i].time = Formats(data[i].time);
	                // data[i].paylog.create_time = Formats(paylog.create_time);
	                // data[i].paylog.reg_time = Formats(paylog.reg_time);
	                // data[i].paylog.update_time = Formats(paylog.update_time);
	            }
				var aTag = document.createElement('a');
			    var blob = new Blob([codeGet]);
			    aTag.download = 'paylog.txt';
			    aTag.href = URL.createObjectURL(blob);
			    aTag.click();
			    URL.revokeObjectURL(blob);	   			
			}
		})
	}

	render(){
		return(
			<div>
				<ContentHeader header='PayLogs' />
				<DateTime name='开始时间' defaulttime={this.datatime()} onChange={(date,dateString) => this.datetime('beg',date,dateString)} />
				<DateTime name='结束时间' defaulttime={this.datatime()} onChange={(date,dateString) => this.datetime('end',date,dateString)} />
				<But name='查询' onClick={this.postajax} />
			</div>
		)
	}
}

export default PayLogs;