import request from '@/request' 
const  delierList = (params) => { //送货单列表
    return request({
        url: '/dg/list',
        method: 'POST',
        data:params
    });
}

const deleteDelier = (params) => { //删除送货单
    return request({
        url: '/dg/delete',
        method: 'DELETE',
        params
    });
}

const delierDetail  = (params) => { //送货单详情
    return request({
        url: '/dg/detail',
        method: 'GET',
        params
    });
}
const updataDelier = (params) => { //修改送货单
    return request({
        url: '/dg/update',
        method: 'POST',
        data:params
    });
}

export {updataDelier,delierDetail,deleteDelier,delierList}