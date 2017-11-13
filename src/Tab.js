import React, { Component } from 'react';
import { Table } from 'antd';

class Tab extends Component {
	render(){
		const columns = this.props.columns;
		const dataSource = this.props.dataSource;
		return (
			<div>
				<Table columns={columns} dataSource={dataSource} pagination={{ pageSize:  10}} />
			</div>
		)
	}
}

export default Tab;