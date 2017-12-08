import React, { Component } from 'react';
import ContentHeader from './ContentHeader';
import Selects from './Select';
import Input from './Input';
import Tab from './Tab';
import Ajax from './Ajax';//Ajax
import Button from './Button';
import { Select } from 'antd';
const Option = Select.Option;


class Warlandrole extends Component {
    constructor(props){
        super(props);
        this.state = ({
            selects:[],
            sessionid:'',
            server:''
        })
    };

    //value
	value = (name,e) => {
		this.setState ({
			[name]:e.target.value
		})
    };
    
    svr = (value) => {
		this.setState ({
			server:value
        });
    };

    componentDidMount() {
        var _this = this;
        Ajax({},"servers.warland.infos").then(function(r){
            var data = JSON.parse(r.data.result);
            console.log(data);
            if(data.length != 0){
                var objsvrs = [];
                data.map((item,index) => {
                   if(item.isopen){
                       var id = item.info.bases.svrid;
                       objsvrs.push(id);
                   };
                });
                
                var s = objsvrs.filter(function (element, index, self) {
                    return self.indexOf(element) === index;
                });
                
                var a =[];
                s.map((index) => {
                    s[index] = {};
                    s[index].num = index;
                    a.push(s[index])
                })
                console.log(a);
                var selects = a.map((item,index) => {
                            var num = JSON.stringify(item.num)
                            return <Option key={index} value={num}>{item.num + '服务器'}</Option>;
                        });
                _this.setState ({
                    selects:selects
                })
            }
        })
    };

    postajax = () => {
        var _this = this;
        Ajax({svrid:_this.state.server,sessionid:_this.state.sessionid},"servers.warland.role").then(function(r){
            var data = JSON.parse(r.data.result);
            console.log(data);
        })
    }
    render(){
        const Column = [{
            title:'名称',
			dataIndex:'name',
			key:'name'
        }, {
            title:'结果',
			dataIndex:'result',
			key:'result'
        }];
        return (
            <div>
                <ContentHeader header='无主查询' />
				<Selects name='服务器:' val='请选择' data={this.state.selects} onChange={this.svr} />
                <Input name='sessionid:' val='sessionid' onChange={(e) => this.value("sessionid",e)} />
                <Button name='查询' onClick={this.postajax} />
                <Tab columns={Column} />
            </div>
        )
    }
};

export default Warlandrole;