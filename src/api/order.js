import request from '@/request'

const  orderList = (params) => { //角色列表
    return request({
        url: '/order/list',
        method: 'POST',
        data:params
    });
}

const deleteOrder = (params) => { //删除角色
    return request({
        url: '/order/delete',
        method: 'DELETE',
        params
    });
}

const orderDetail  = (params) => { //角色详情
    return request({
        url: '/order/detail',
        method: 'GET',
        params
    });
}
const updataOrder = (params) => { //修改角色
    return request({
        url: '/order/update',
        method: 'POST',
        data:params
    });
}


export {
    updataOrder,
    orderDetail,
    deleteOrder,
    orderList,
}