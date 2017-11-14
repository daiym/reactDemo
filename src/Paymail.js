import React, { Component } from 'react';
import ContentHeader from './ContentHeader';
import Textarea from './Textarea';
import Upload from './Upload';
import Button from './Button';

class Paymail extends Component {
	render() {
		return (
			<div>
				<ContentHeader header='Pay Donble' />
				<Upload val='选择文件' />
				<Textarea name='csv格式数据:' val='csv格式数据' />
				<Button name='保存' />
			</div>
		)
	}
}

export default Paymail;
