import React, { Component } from 'react';
import { Select,Row, Col } from 'antd';
// import League from './League';//Home
const Option = Select.Option;
 
class Selected extends Component {

	render(){
		const name = this.props.name;
		const val = this.props.val;
		const data = this.props.data;
		const onChange = this.props.onChange;
		const allowClear = this.props.allowClear ? true:false;
		const disabled = this.props.disabled ? true:false;
		  return (
		  	<div className="marginButton">
		  		<Row>
			  		<Col span={4} className="selectname">
				  		{name}
				  	</Col>
		      		<Col span={6}>

		      			<Select
							showSearch
							style={{ width: 200 }}
							mode="multiple"
							placeholder={val}
							allowClear = {allowClear}
							disabled = {disabled}
							// optionFilterProp="children"
							onChange={onChange}
							filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
						>
							{data}
						</Select>
		      		</Col>
		  		</Row>
			</div>
	)
  }
}

export default Selected;

