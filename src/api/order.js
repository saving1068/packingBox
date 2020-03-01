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

const delFile =   (params) => { //删除附件
    return request({
        url: '/order/delete/attachment',
        method: 'DELETE',
        params,
    });
}

const delMater =   (params) => { //删除材料
    return request({
        url: '/order/mater/delete',
        method: 'DELETE',
        params,
    });
}
const delProcesscost = (params) => { //删除其他费用
    return request({
        url: '/order/processcost/delete',
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
    delFile,
    delMater,
    delProcesscost
}