import React from 'react';
import Loadable from 'react-loadable'; 
const Loading=()=><div>Loading……</div>;

const Login=Loadable({
    loader:()=>import('@/views/login/index'),
    loading:Loading
})

const Index=Loadable({
    loader:()=>import('@/views/index/index'),
    loading:Loading
})

const Del=Loadable({
    loader:()=>import('@/views/index/del/index'),
    loading:Loading
})
const Send=Loadable({
    loader:()=>import('@/views/index/send/index'),
    loading:Loading
})
const Zhaopin=Loadable({
    loader:()=>import('@/views/index/zhaopin/index'),
    loading:Loading
})
const Home=Loadable({
    loader:()=>import('@/views/index/home/index'),
    loading:Loading
})
export default [
    {
        path:'/index',
        child:[
            {
                path:'/index/del',
                child:[],
                component:Del
            },
            {
                path:'/index/zhaopin',
                child:[],
                component:Zhaopin
            },
            {
                path:'/index/send',
                child:[],
                component:Send
            },
        ],
        component:Index
    },
    {
        path:'/login',
        child:[],
        component:Login
    },{
        path:'/',
        to:'/login'
    }
]