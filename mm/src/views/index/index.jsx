import React, { Component } from 'react';
import {getrole,getpower }from '@/requests/index';
import { Layout} from 'antd';
import RouterView from '@/router/routerView'
const { Header, Footer, Sider, Content } = Layout;


export default class  extends Component {
    state={
        username:'',
        role:[],
        powerList:[]
    }
    render() {
        let {username,role,powerList}=this.state;
        console.log(this.props)
        return (
            <div id="index">
                <Layout className='wrapper'>
                    <Header className="head">
                        <div></div>
                        <div></div>
                        <div>
                           <p> 用户:<span>{username}</span> {role&&role.map((item,index)=>{
                            return <span key={index}>{item.name}</span>
                            })}</p>
                            <span onClick={this.exit.bind(this)}>退出</span>
                        </div>
                    </Header>
                    <Layout>
                    <Sider id="left">
                        {
                            powerList&&powerList.map((item,index)=>{
                            return <p key={index} onClick={this.changeRouter.bind(this,item.url)}>{item.name}</p>
                            })
                        }
                    </Sider>
                    <Content>
                        <RouterView routes={this.props.routes}/>
                    </Content>
                    </Layout>
                </Layout>
            
             
            </div>
          
        )
    }
  async  componentDidMount(){
    //从本地获取用户信息
    let {userinfo}=JSON.parse(window.localStorage.userinfo);
      



   console.log(userinfo)

    this.setState({
        role:userinfo.role,
        username:userinfo.name,
        powerList:userinfo.power,
       })
  

      
 
   
    }
    exit(){
        window.localStorage.removeItem('userinfo');
        window.localStorage.removeItem('token');
        this.props.history.push('/login');
    }
    changeRouter(url){
        this.props.history.push(url);
    }
}


