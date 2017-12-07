import React, { Component } from 'react';
import ContentHeader from './ContentHeader';
import Tab from './Tab';
import Formats from './Formats';
import Format from './Format';
import Ajax from './Ajax';//Ajax
import Multiselect from './Multiselect';
import Inputs from './Input';
import But from './But';
import DateTime from './DateTime';
import { Select,Button,message } from 'antd';
const Option = Select.Option;

class Warland extends Component {
    constructor(props){
        super(props);
        this.state = ({
            svrs:'',
            show:'',
            beg:'',
            end:'',
            close:'',
            tab1:[],
            tab2:[]
        });
    };

    //创建
    create = () => {
        var _this = this;
        Ajax({showtime:_this.state.show,
            begintime:_this.state.beg,
            endtime:_this.state.end,
            closetime:_this.state.close,
            svrs:_this.state.svrs},"servers.warland.create").then((r) => {
                var data = JSON.parse(r.data.result);
			    console.log('创建:',data);
        })
    };

    //禁用
    disable = (key) => {
        Ajax({key:key},"servers.warland.disable").then((r) => {
            var data = JSON.parse(r.data.result);
			console.log('禁用:',data);
        })
    };

    componentDidMount(){
        var _this = this;
        //列表
        Ajax({},"servers.warland.infos").then((r) => {
            var data = JSON.parse(r.data.result);
			console.log('列表:',data);
            if(data.length != 0){
                var dataobj = [];
                data.map((item,index) => {
                    var obj = {};
                    obj.key = index;
                    obj.keys = item.key;
                    obj.svrs = item.info.bases.svrs;
                    obj.svrid = item.info.bases.svrid;
                    obj.show = Format(item.info.bases.showtime);
                    obj.beg = Format(item.info.bases.opentime);
                    obj.end = Format(item.info.bases.closetime);
                    obj.close = Format(item.info.bases.donetime);
                    obj.isopen = ''+item.isopen;
                    obj.enable = ''+item.info.enable;
                    obj.cz = <Button type="primary" onClick={() => _this.disable(item.key)}>禁用</Button>
                    dataobj.push(obj);
                });
                _this.setState ({
                    tab1:dataobj
                })
            }
        });
        //服务器
        Ajax({},"servers.warland.servers").then((r) => {
            var data = JSON.parse(r.data.result);
			console.log('服务器:',data);
            if(Object.keys(data) != 0){
                var dataobj = [];
                for(var i in data){
                    try{
                        var datas = JSON.parse(data[i]);
                        
                        if(datas){
                            var obj = {};
                            obj.key = i;
                            obj.svr = i;
                            obj.keys = datas.eventid;
                            obj.show = Format(datas.showtime);
                            obj.beg = Format(datas.opentime);
                            obj.end = Format(datas.closetime);
                            obj.close = Format(datas.donetime);
                            obj.border = datas.border;
                            obj.closed = ''+datas.closed;
                            obj.svrs = datas.svrs;
                            obj.svrid = datas.svrid;
                            dataobj.push(obj)
                        }
                    }catch(e){
                        message.info(`${i}服务器${data[i]}`);
                    }
                };
                _this.setState ({
                    tab2:dataobj
                })
            } 
        });
        var t = new Date();
		var time = t.getTime()
		_this.setState ({
            show:time,
			beg:time,
			end:time,
			close:time
		});
    };

    //下拉
	value = (name,value) => {
		this.setState ({
			[name]:value
		});
	};

	//服务器
	server = () => {
		var s = JSON.parse(localStorage['server@'+ localStorage.name]);
		return s.map((item,index) => {
					var uniqueid = JSON.stringify(item.uniqueid)
					return <Option key={index} value={uniqueid}>{uniqueid + '服务器'}</Option>;
				})
	};

	//默认日历当天时间
	datatime = () => {
		var s = new Date();
		var c = Formats(s);	
		return c;
	};

	//time
	datetime = (name,date,dateString) => {
		if(date != null){
			console.log(date, dateString ,date._d);
			var a = (date._d).getTime();
			this.setState ({
				[name]:a
			});
		};
    };
    
    render(){
        const colunm = [{
            title:'key',
			dataIndex:'keys',
			key:'keys'
        }, {
            title:'svrs',
			dataIndex:'svrs',
			key:'svrs'
        }, {
            title:'svrid',
			dataIndex:'svrid',
			key:'svrid'
        }, {
            title:'show',
			dataIndex:'show',
			key:'show'
        }, {
            title:'beg',
			dataIndex:'beg',
			key:'beg'
        }, {
            title:'end',
			dataIndex:'end',
			key:'end'
        }, {
            title:'close',
			dataIndex:'close',
			key:'close'
        }, {
            title:'isopen',
			dataIndex:'isopen',
			key:'isopen'
        }, {
            title:'enable',
			dataIndex:'enable',
			key:'enable'
        }, {
            title:'操作',
			dataIndex:'cz',
			key:'cz'
        }];
        const colunm1 = [{
            title:'svr',
			dataIndex:'svr',
			key:'svr'
        }, {
            title:'key',
			dataIndex:'keys',
			key:'keys'
        }, {
            title:'show',
			dataIndex:'show',
			key:'show'
        }, {
            title:'beg',
			dataIndex:'beg',
			key:'beg'
        }, {
            title:'end',
			dataIndex:'end',
			key:'end'
        }, {
            title:'close',
			dataIndex:'close',
			key:'close'
        }, {
            title:'border',
			dataIndex:'border',
			key:'border'
        }, {
            title:'closed',
			dataIndex:'closed',
			key:'closed'
        }, {
            title:'svrs',
			dataIndex:'svrs',
			key:'svrs'
        }, {
            title:'svrid',
			dataIndex:'svrid',
			key:'svrid'
        }];
        return(
            <div>
                <ContentHeader header='无主之地' />
				<Tab columns={colunm} dataSource={this.state.tab1} />
				<ContentHeader header='服务器' />
				<Tab columns={colunm1} dataSource={this.state.tab2} />
				<Multiselect name='svr:' val='请选择' data={this.server()} onChange={(e) => this.value('svrs',e) } />
				<DateTime name='活动预告时间' defaulttime={this.datatime()} onChange={(date,dateString) => this.datetime('show',date,dateString)} />                    
				<DateTime name='活动开始时间' defaulttime={this.datatime()} onChange={(date,dateString) => this.datetime('beg',date,dateString)} />
				<DateTime name='活动结束时间' defaulttime={this.datatime()} onChange={(date,dateString) => this.datetime('end',date,dateString)} />
				<DateTime name='关闭活动时间' defaulttime={this.datatime()} onChange={(date,dateString) => this.datetime('close',date,dateString)} />
				<But name='创建'  onClick={this.create} />
            </div>
        )
    }
};

export default Warland;
