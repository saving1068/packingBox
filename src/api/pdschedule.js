import request from '@/request'

const  pdscheduleList = (params) => { //排产列表
    return request({
        url: '/pdschedule/list',
        method: 'POST',
        data:params
    });
}

const deletePdschedule = (params) => { //删除排产
    return request({
        url: '/pdschedule/delete',
        method: 'DELETE',
        params
    });
}

const pdscheduleDetail  = (params) => { //排产详情
    return request({
        url: '/pdschedule/detail',
        method: 'GET',
        params
    });
}
const updataPdschedule = (params) => { //修改排产
    return request({
        url: '/pdschedule/update',
        method: 'POST',
        data:params
    });
}



export {
    updataPdschedule,
    pdscheduleDetail,
    deletePdschedule,
    pdscheduleList
}