import React, { Component } from 'react';
import { Checkbox,Row, Col } from 'antd';

class Checkboxs extends Component {
	// onChange = (e) => {
	// 	console.log(`checked = ${e.target.checked}`);
	// };
	
	render(){
		const val = this.props.val;
		const onChange = this.props.onChange;
		return (
			<div className="marginButton">
				<Row>
					<Col span={6} className="selectname">
				  		<Checkbox onChange={onChange}>
							{val}
						</Checkbox>
					</Col>
				</Row>
				
			</div>
		)
	}
}

export default Checkboxs;