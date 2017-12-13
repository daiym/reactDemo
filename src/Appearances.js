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

class Appearances extends Component {
    constructor(props){
        super(props);
        this.state = ({
            server:'',
            tab1:[],
            tab2:[]
        })
    };

    selects = () => {
        var science = gamedata.baseappearances;
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
        Ajax({id:_this.state.server},"servers.base.appearances").then((r) => {
            var data = JSON.parse(r.data.result);
            console.log(data);
            var objdata = [];
            var strs = '';
            var objs = {};
            var a = [];
            var b = [];
            for(var i in data){
                var datas = data[i];
                var obj = {};
                obj.key = i;
                obj.name = i;
                obj.result = Object.keys(datas).length;
                if(strs == ''){
                    strs = parseInt(Object.keys(datas).length);
                }else{
                    strs = parseInt(Object.keys(datas).length)+strs;
                };
                objs.key = i+0.1;
                objs.name = '总人数';
                objs.result = strs;                
                objdata.push(obj)
            }
            a.push(objs);
            objdata.map((item,index) => {
                a.push(item)
            });
            for(var i in data){
                var datas = data[i];
                if(Object.keys(datas).length !== 0){
                    for(var index in datas){
                        var science = datas[index];
                        var obj = {};
                        obj.key = index;
                        obj.svr = i;
                        obj.sessionid = index;
                        obj.league = science.league.fullname;
                        obj.name = science.name.name;
                        obj.level = science.citylevel;
                        b.push(obj);
                    }
                }
            }
            _this.setState ({
                tab1:a,
                tab2:b
            })
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
                <ContentHeader header='主基地外观查询' />
				<Selects name='服务器:' val='请选择' data={this.selects()} onChange={this.svr} />
                <Button name='查询' onClick={this.postajax} />
                <Tab columns={column1} dataSource={this.state.tab1} />
                <Tab columns={column2} dataSource={this.state.tab2} />
            </div>
        )
    }
}

export default Appearances;