import axios from 'axios';
import newAxiox from '@/interceptor/index';
//登陆接口
export const login = (params) => axios.post('/login', params);

//获取身份

export const getrole = (params) => newAxiox.get('/getrole', { params });
//获取权利

export const getpower = (params) => newAxiox.get('/getpower', { params });

//获取列表

export const getlist = (params) => newAxiox.get('/list', { params });

//删除列表

export const dellist = (params) => newAxiox.get('/delete', { params });

//添加

export const addlist = (params) => newAxiox.get('/add', { params });

//修改

export const editlist = (params) => newAxiox.get('/edit', { params });