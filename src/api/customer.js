import request from '@/request'
const  customerList = (params) => { //客户列表
    return request({
        url: '/customer/list',
        method: 'POST',
        data:params
    });
}

const deleteCustomer = (params) => { //删除角色
    return request({
        url: '/customer/delete',
        method: 'DELETE',
        params
    });
}

const customerDetail  = (params) => { //角色详情
    return request({
        url: 'customer/detail',
        method: 'GET',
        params
    });
}
const updataCustomer = (params) => { //修改角色
    return request({
        url: '/customer/update',
        method: 'POST',
        data:params
    });
}

export {updataCustomer,customerDetail,deleteCustomer,customerList}