import request from '@/request' 
const  costList = (params) => { //供应商列表
    return request({
        url: '/smc/list',
        method: 'POST',
        data:params
    });
}

const deleteCost = (params) => { //删除角色
    return request({
        url: '/smc/delete',
        method: 'DELETE',
        params
    });
}

const costDetail  = (params) => { //角色详情
    return request({
        url: '/smc/detail',
        method: 'GET',
        params
    });
}
const updataCost = (params) => { //修改角色
    return request({
        url: '/smc/update',
        method: 'POST',
        data:params
    });
}

export {updataCost,costDetail,deleteCost,costList}