import React, { Component } from 'react';
import antd from 'antd';
import Homepage from './Homepage';//主页
import Userinfo from './Userinfo';//用户信息
import League from './League';//联盟信息
import Mail from './Mail';//发送指定邮件
import SeverMail from './SeverMail';//发送邮件
import Announce from './Announce';//通知公告
import Serverlog from './Serverlog';//系统日志
import Goldlog from './Goldlog';//金币日志
import Newerlog from './Newerlog';//新手统计表
import Accountbind from './Accountbind';//账号绑定
import Specifiesreward from './Specifiesreward';//特殊奖励
import Paymail from './Paymail';//paymail
import TempActivition from './TempActivition';//TempActivition
import Serverinfo from './Serverinfo';//Serverinfo
import Chatlogs from './Chatlogs';//Chatlogs
import PayLogs from './PayLogs';//PayLogs
import Vipcount from './Vipcount';//Vipcount
import { BrowserRouter,Route,Link} from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import Ajax from './Ajax';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;


class Home extends Component {
  constructor(props){
    super(props);
  }
  state = {
    collapsed: false,
  };
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }
  componentDidMount(){
    var _this = this;
    Ajax({}, 'servers.infos')
    .then(function(res){
      if(res == '/login'){
        return null;
      }else if(res.data.errorcode == 0){
        var r = JSON.parse(res.data.result);
        console.log('servers.infos: ',r)
        if(r){
          localStorage['server@' + localStorage.name] = JSON.stringify(r);
        }
        console.log(_this.props);
      }
    })
  }
  render() {
    var name = localStorage.name;
    return (
      
      <Layout className='height'>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <Link to="/">
                <Icon type="pie-chart" />
                <span>首页</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/userinfo">
                <Icon type="desktop" />
                <span>用户信息</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/leagueinfo">
                <Icon type="desktop" />
                <span>联盟信息</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/mailinfo">
                <Icon type="desktop" />
                <span>发送指定邮件</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link to="/servermailinfo">
                <Icon type="desktop" />
                <span>发送邮件</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="6">
              <Link to="/announceinfo">
                <Icon type="desktop" />
                <span>通知公告</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="7">
              <Link to="/sevrverloginfo">
                <Icon type="desktop" />
                <span>系统日志</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="8">
              <Link to="/goldloginfo">
                <Icon type="desktop" />
                <span>金币日志</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="9">
              <Link to="/newerloginfo">
                <Icon type="desktop" />
                <span>新手统计</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="10">
              <Link to="/accountbindinfo">
                <Icon type="desktop" />
                <span>账号绑定</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="11">
              <Link to="/specifiesreward">
                <Icon type="desktop" />
                <span>特殊奖励</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="12">
              <Link to="/paymail">
                <Icon type="desktop" />
                <span>paymail</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="13">
              <Link to="/tempactivition">
                <Icon type="desktop" />
                <span>tempactivition</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="14">
              <Link to="/serverinfo">
                <Icon type="desktop" />
                <span>服务器信息</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="15">
              <Link to="/chatlogs">
                <Icon type="desktop" />
                <span>聊天记录</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="16">
              <Link to="/paylogs">
                <Icon type="desktop" />
                <span>paylogs</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="17">
              <Link to="/vip 7">
                <Icon type="desktop" />
                <span>VIP7 Count</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 , marginBottom:24}} >
            <div className="headername"><Icon type="smile-o" style={{marginRight:5}}/>{name}</div>
          </Header>
          <Content className="height" style={{ margin: '0 16px' , overflow:'auto'}}>
            <div className="height" style={{ padding: 24, background: '#fff', minHeight: 360 , overflow:'auto'}}>
              <Route exact path="/" component={Homepage}/>
              <Route path="/userinfo" component={Userinfo}/>
              <Route path="/leagueinfo" component={League}/>
              <Route path="/mailinfo" component={Mail}/>
              <Route path="/servermailinfo" component={SeverMail}/>
              <Route path="/announceinfo" component={Announce}/>
              <Route path="/sevrverloginfo" component={Serverlog}/>
              <Route path="/goldloginfo" component={Goldlog}/>
              <Route path="/newerloginfo" component={Newerlog}/>
              <Route path="/accountbindinfo" component={Accountbind}/>
              <Route path="/specifiesreward" component={Specifiesreward}/>
              <Route path="/paymail" component={Paymail}/>
              <Route path="/tempactivition" component={TempActivition}/>
              <Route path="/serverinfo" component={Serverinfo}/>
              <Route path="/chatlogs" component={Chatlogs}/>
              <Route path="/paylogs" component={PayLogs}/>
              <Route path="/vip 7" component={Vipcount}/>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2016 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Home;