import React, { Component } from 'react';
import { Alert } from 'antd';

class Alertantd extends Component {
	onClose = (e) => {
		console.log(e, 'I was closed.');
	}
	
	render(){
		const data = this.props.data;
		return (
			<div>
				<Alert message="Error Text"
				    description={data}
				    type="error"
				    closable
				    onClose={this.onClose}
				/>
			</div>
		)
	}
}

export default Alertantd;