import request from '@/request'

const  purchaseList = (params) => { //采购单列表
    return request({
        url: '/purchase/list',
        method: 'POST',
        data:params
    });
}

const deletePurchase = (params) => { //删除采购单
    return request({
        url: '/purchase/delete',
        method: 'DELETE',
        params
    });
}

const purchaseDetail  = (params) => { //采购单详情
    return request({
        url: '/purchase/detail',
        method: 'GET',
        params
    });
}
const updataPurchase = (params) => { //修改采购单
    return request({
        url: '/purchase/update',
        method: 'POST',
        data:params
    });
}

const purchaseInsertList = (params) => { //批量添加采购单
    return request({
        url: '/purchase/insertList',
        method: 'POST',
        data:params
    });
}

export {
    purchaseInsertList,
    updataPurchase,
    purchaseDetail,
    deletePurchase,
    purchaseList
}