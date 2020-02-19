import request from '@/request'

const  orderList = (params) => { //订单列表
    return request({
        url: '/order/list',
        method: 'POST',
        data:params
    });
}

const deleteOrder = (params) => { //删除订单
    return request({
        url: '/order/delete',
        method: 'DELETE',
        params
    });
}

const orderDetail  = (params) => { //订单详情
    return request({
        url: '/order/detail',
        method: 'GET',
        params
    });
}
const updataOrder = (params) => { //修改订单
    return request({
        url: '/order/update',
        method: 'POST',
        data:params
    });
}

const exportExcel   = (params) => { //订单详情
    return request({
        url: '/order/exportExcel',
        method: 'GET',
        params
    });
}

const uploadFile =  (params) => { //订单详情
    return request({
        url: '/order/upload',
        method: 'POST',
        data:params,
        headers:{
            "Content-type":"multipart/form-data"
        }

    });
}

const delFile =   (params) => { //订单详情
    return request({
        url: '/order/delete/attachment',
        method: 'DELETE',
        params,
    });
}


export {
    updataOrder,
    orderDetail,
    deleteOrder,
    orderList,
    exportExcel,
    uploadFile,
    delFile
}