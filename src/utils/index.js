import {detailDic} from '@/api/admin';

const dictApi = (async (sign)=>{
    let res = await detailDic({sign})
    return res.data
})

const finishedInfoFormula = ((formula,length,width,height)=>{//面子宽
    formula = formula.replace(/宽/g,width).replace(/高/g,height).replace(/长/g,length);
    console.log(eval(formula).toFixed(3)/1)
    return eval(formula).toFixed(3)/1
})

const idChangeStr = ((list,id)=>{
    let res = list.find(item => item.id == id);
    console.log(res.value)
    return res.value
})



export {dictApi,finishedInfoFormula,idChangeStr}