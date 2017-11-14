import React, { Component } from 'react';
import { Input,Row, Col } from 'antd';
const { TextArea } = Input;

class Textarea extends Component {
	render() {
		const name = this.props.name;
		const val = this.props.val;
		const value = this.props.value;
		const onChange = this.props.onChange;
		return (
			<div className="marginButton">
				<Row>
					<Col span={4} className="selectname">
			  			{name}
					</Col>
			      	<Col span={5}>
						<TextArea rows={4} placeholder={val} value={value} onChange={onChange} style={{ minWidth: 500 }}/>
	      			</Col>
				</Row>
			</div>
		)
	}
}

export default Textarea;