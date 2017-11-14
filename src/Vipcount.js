import React, { Component } from 'react';
import ContentHeader from './ContentHeader';
import But from './But';
import Ajax from './Ajax';//Ajax

class Vipcount extends Component {
	constructor(props){
		super(props);
		this.state = ({
			link:'',
			name:''
		})
	}; 

	componentDidMount(){
		var _this = this;
		Ajax({},"role.vip7.rolelist").then(function(r){
			if(r.data.errorcode == 0){
				var data = JSON.parse(r.data.result);
				//r如果不是对象，就是把JSON.parse，如果是对象就直接用；
				var arrData = typeof data != 'object' ? JSON.parse(data) : data;
				var CSV = '';
				//大名头
				CSV += 'Download' + escape('\r\n\n');
				//表头
				if(true){
					var row = "";
					for (var index in arrData[0]) {
			            row += index + ',';
			        };
			        // row = row.slice(0, -1);
			        CSV += row + escape('\r\n');
				};
				//表内容
				for(var i = 0; i < arrData.length; i++) {
			        var row = "";
			        for (var index in arrData[i]) {
			            row += '"' + arrData[i][index] + '",';
			        };
			        // row.slice(0, row.length - 1);
			        CSV += row + escape('\r\n');
			    };
			    if(CSV == ''){
			    	return null;
			    };
			    var uri = 'data:text/plain;charset=UTF-8,' + "\ufeff" + (CSV);
			    var fileName = "MyReport_";
			    fileName += 'Download'.replace(/ /g,"_");
			    var name = fileName + ".csv";
			    _this.setState ({
					link:uri,
					name:name
				});
			}
		})
	}

	render(){
		return (
			<div>
				<ContentHeader header='VIP 7' />
				<div>
					<a href={this.state.link} download={this.state.name}>
						<But name='Download CSV' />
					</a>
				</div>
			</div>
		)
	}
};

export default Vipcount;