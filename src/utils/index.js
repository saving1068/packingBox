import {detailDic} from '@/api/admin';

const dictApi = (async (sign)=>{
    let res = await detailDic({sign})
    return res.data
})

export {dictApi}