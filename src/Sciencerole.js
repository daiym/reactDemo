import React, { Component } from 'react';
import ContentHeader from './ContentHeader';
import Selects from './Select';
import Input from './Input';
import Tab from './Tab';
import Ajax from './Ajax';//Ajax
import Button from './Button';
import gamedata from './gamedata';
import { Select } from 'antd';
const Option = Select.Option;

class Sciencerole extends Component {
    constructor(props){
        super(props);
        this.state = ({
            server:''
        })
    };

    selects = () => {
        var science = gamedata.sciencemaster;
        var objdata = Object.keys(science);
        var a = [];
        objdata.map((index) => {
            science[index].num = index;
            a.push(science[index]);
        });
        return a.map((data,index) => {
                    return <Option key={index} value={data.num}>{'(id:'+ data.num +')'+data.name.cn}</Option>;
                })
    };

    svr = (value) => {
		this.setState ({
			server:value
        });
    };

    postajax = () => {
        var _this = this;
        Ajax({id:_this.state.server},"servers.science.master").then((r) => {
            var data = JSON.parse(r.data.result);
            console.log(data);
        })
    }

    render(){
        const column1 = [{
			title:'name',
			dataIndex:'name',
			key:'name'
		}, {
			title:'result',
			dataIndex:'result',
			key:'result'
        }];
        const column2 = [{
            title:'服务器',
			dataIndex:'svr',
			key:'svr'
        }, {
            title:'sessionid',
			dataIndex:'sessionid',
			key:'sessionid'
        }, {
            title:'联盟',
			dataIndex:'league',
			key:'league'
        }, {
            title:'name',
			dataIndex:'name',
			key:'name'
        }, {
            title:'level',
			dataIndex:'level',
			key:'level'
        }];
        return(
            <div>
                <ContentHeader header='科技大师查询' />
				<Selects name='服务器:' val='请选择' data={this.selects()} onChange={this.svr} />
                <Button name='查询' onClick={this.postajax} />
                <Tab columns={column1} />
                <Tab columns={column2} />
            </div>
        )
    }
}

export default Sciencerole;