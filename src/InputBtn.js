import React, { Component } from 'react';
import { Input,Row, Col,Button } from 'antd';

class InputBtn extends Component {
	render() {
		const name = this.props.name;
		const btn = this.props.btn;
		const val = this.props.val;
		return (
			<div className="marginButton">
				<Row>
					<Col span={4} className="selectname">
			  		{name}
					</Col>
			      	<Col span={5}>
						<Input placeholder={val} style={{ width: 200 }}/>
	      			</Col>
	      			<Col span={5}>
	      				<Button type="primary">{btn}</Button>
	      			</Col>
				</Row>
			</div>
		)
	}
}

export default InputBtn;