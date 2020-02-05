import request from '@/request' 
const  boxList = (params) => { //供应商列表
    return request({
        url: '/cycase/list',
        method: 'POST',
        data:params
    });
}

const deleteBox = (params) => { //删除角色
    return request({
        url: '/cycase/delete',
        method: 'DELETE',
        params
    });
}

const boxDetail  = (params) => { //角色详情
    return request({
        url: '/cycase/detail',
        method: 'GET',
        params
    });
}
const updataBox = (params) => { //修改角色
    return request({
        url: '/cycase/update',
        method: 'POST',
        data:params
    });
}

export {updataBox,boxDetail,deleteBox,boxList}