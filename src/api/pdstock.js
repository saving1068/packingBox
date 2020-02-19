import request from '@/request'

const  pdstockList = (params) => { //成品库列表
    return request({
        url: '/pdstock/list',
        method: 'POST',
        data:params
    });
}

const deletePdstock = (params) => { //删除成品库
    return request({
        url: '/pdstock/delete',
        method: 'DELETE',
        params
    });
}

const pdstockDetail  = (params) => { //成品库详情
    return request({
        url: '/pdstock/detail',
        method: 'GET',
        params
    });
}
const updataPdstock = (params) => { //修改成品库
    return request({
        url: '/pdstock/update',
        method: 'POST',
        data:params
    });
}

const addPdstock = (params) => { //入成品库
    return request({
        url: '/pdstock/addPd',
        method: 'POST',
        data:params
    });
}

const outPdstock = (params) => { //出成品库
    return request({
        url: '/pdstock/delPd',
        method: 'POST',
        data:params
    });
}

const addPdstockHistory = (params) => { //入库历史信息列表
    return request({
        url: '/pdinstockHistory/list',
        method: 'POST',
        data:params
    });
}
const addPdstockDetail = (params) => { //入库历史信息列表详情
    return request({
        url: '/pdinstockHistory/detail',
        method: 'GET',
        params
    });
}
const stockHistoryDelete = (params) => { //入库历史信息列表详情
    return request({
        url: '/pdinstockHistory/delete',
        method: 'DELETE',
        params
    });
}


const outPdstockHistory = (params) => { //入库历史信息列表
    return request({
        url: '/outstockHistory/list',
        method: 'POST',
        data:params
    });
}
const outPdstockDetail = (params) => { //入库历史信息列表详情
    return request({
        url: '/outstockHistory/detaill',
        method: 'GET',
        params
    });
}
const outStockHistoryDelete = (params) => { //入库历史信息列表详情
    return request({
        url: '/outstockHistory/delete',
        method: 'DELETE',
        params
    });
}



export {
    updataPdstock,
    pdstockDetail,
    deletePdstock,
    pdstockList,
    addPdstock,
    outPdstock,
    outStockHistoryDelete,
    outPdstockDetail,
    outPdstockHistory,
    stockHistoryDelete,
    addPdstockDetail,
    addPdstockHistory
}