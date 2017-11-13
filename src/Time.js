import React, { Component } from 'react';
import { DatePicker,Row, Col } from 'antd';
const { RangePicker } = DatePicker;

class Time extends Component {
	//日历13位毫秒
	// onChange = (value, dateString) => {
	// 	console.log('Selected Time: ', value);
		
	// 	var a = value._d;

	// 	console.log(a.getTime())
 //  		console.log('Formatted Selected Time: ', dateString);
	// }
	onOk = (value) => {
		console.log('onOk: ', value);
	}

	render() {
		const name = this.props.name;
		const onChange = this.props.onChange;
		return (
			<div className="marginButton">
				<Row>
					<Col span={4} className="selectname">
			  		{name}
					</Col>
			      	<Col span={5}>
						<DatePicker
					      showTime
					      format="YYYY-MM-DD HH:mm:ss"
					      style={{ width: 200 }}
					      placeholder="Select Time"
					      onChange={onChange}
					      onOk={this.onOk}
					    />
	      			</Col>
				</Row>
			</div>
		)
	}
}

export default Time;