import React, { Component } from 'react';
import { DatePicker,Row,Col } from 'antd';
import moment from 'moment';
import Formats from './Formats';
const { MonthPicker, RangePicker } = DatePicker;

class DateTime extends Component {
	//返回数据  2017-09-08
	// onChange = (date, dateString) => {
	// 	console.log(date, dateString);
	// }
	// datatime = () => {
	// 	var s = new Date();
	// 	var c = Formats(s)
	// 	return c;
	// }
	

	render() {
		const name = this.props.name;
		const onChange = this.props.onChange;
		const defaulttime = this.props.defaulttime;
		const dateFormat = 'YYYY-MM-DD';
		return (
			<div className="marginButton">
				<Row>
					<Col span={4} className="selectname">
			  		{name}
					</Col>
			      	<Col span={5}>
					    <DatePicker onChange={onChange}  
					    defaultValue={moment(defaulttime, dateFormat)} 
					    format={dateFormat}
					    style={{ width: 200 }} />
	      			</Col>
				</Row>
			</div>
		)
	}
}

export default DateTime;