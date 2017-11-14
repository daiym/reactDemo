import React, { Component } from 'react';
import { Input,Row, Col } from 'antd';

class Inputtext extends Component {
	render() {
		const name = this.props.name;
		const val = this.props.val;
		const onChange = this.props.onChange;
		return (
			<div className="marginButton">
				<Row>
					<Col span={4} className="selectname">
			  		{name}
					</Col>
			      	<Col span={5}>
						<Input placeholder={val} style={{ width: 200 }} onChange={onChange} />
	      			</Col>
				</Row>
			</div>
		)
	}
}

export default Inputtext;