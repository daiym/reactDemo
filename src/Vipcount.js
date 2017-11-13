import React, { Component } from 'react';
import ContentHeader from './ContentHeader';
import But from './But';
import Ajax from './Ajax';//Ajax

class Vipcount extends Component {
	constructor(props){
		super(props);
		this.state = ({
			link:''
		})
	}; 

	componentDidMount(){
		var _this = this;
		Ajax({},"role.vip7.rolelist").then(function(r){
			if(r.data.errorcode == 0){
				var data = JSON.parse(r.data.result);
				// console.log(data);
				// console.log(JSON.stringify(data))
				var datahref = 'data:text/plain;charset=UTF-8,' + "\ufeff" + (JSON.stringify(data));
				_this.setState ({
					link:datahref
				});
			}
		})
	}


	render(){
		console.log(this.state.link)
		return (
			<div>
				<ContentHeader header='VIP 7' />
				<div>
					<a href={this.state.link} download='Download.CSV'>
						<But name='Download CSV' />
					</a>
				</div>
			</div>
		)
	}
};

export default Vipcount;