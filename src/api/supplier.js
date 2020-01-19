import request from '@/request' 
const  supplierList = (params) => { //供应商列表
    return request({
        url: '/supplier/list',
        method: 'POST',
        data:params
    });
}

const deleteSupplier = (params) => { //删除角色
    return request({
        url: '/supplier/delete',
        method: 'DELETE',
        params
    });
}

const supplierDetail  = (params) => { //角色详情
    return request({
        url: 'supplier/detail',
        method: 'GET',
        params
    });
}
const updataSupplier = (params) => { //修改角色
    return request({
        url: '/supplier/update',
        method: 'POST',
        data:params
    });
}

export {updataSupplier,supplierDetail,deleteSupplier,supplierList}