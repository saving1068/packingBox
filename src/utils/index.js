import {detailDic} from '@/api/admin';
import axios from 'axios'

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
    // let res = list.find(item => item.id == id);
    let resT = list.find(item => item.key == id);
    // console.log(resT,id,list)
    // console.log(res,resT)
    // if(res){
    //     const tip = res?res.value:'暂无数据'
    //     return tip
    // }else{
        const tip = resT?resT.value:'暂无数据'
        console.log(tip)
        return tip
    // }
   
})

const exportExcel = ((url,type)=>{
    try {
        console.log(url)
        axios.get(url, {
            withCredentials:true,
             headers:{
                 "token":sessionStorage.getItem('token')
             },
             responseType: 'blob', //二进制流
         }).then(function (res) {
             console.log(res)
             if(!res) return
             let blob = new Blob([res.data], {type: 'application/vnd.ms-excel;charset=utf-8'})
             let url = window.URL.createObjectURL(blob);
             let aLink = document.createElement("a");
             aLink.style.display = "none";
             aLink.href = url;
             aLink.setAttribute("download", type);
             document.body.appendChild(aLink);
             aLink.click();
             document.body.removeChild(aLink); 
             window.URL.revokeObjectURL(url); 
         }).catch(function (error) {
             console.log(error)
         });
    } catch (error) {
        
    }
})

const downFile = ((url,type)=>{
    try {
        console.log(url)
        let aLink = document.createElement("a");
             aLink.style.display = "none";
             aLink.href = url;
             document.body.appendChild(aLink);
             aLink.click();
             document.body.removeChild(aLink); 
             return
        axios.get(url, {
            withCredentials:true,
             headers:{
                 "token":sessionStorage.getItem('token')
             },
             responseType: 'blob', //二进制流
         }).then(function (res) {
             console.log(res)
             if(!res) return
             let blob = new Blob([res.data])
             let url = window.URL.createObjectURL(blob);
             let aLink = document.createElement("a");
             aLink.style.display = "none";
             aLink.href = url;
             aLink.setAttribute("download",type);
             document.body.appendChild(aLink);
             aLink.click();
             document.body.removeChild(aLink); 
             window.URL.revokeObjectURL(url); 
         }).catch(function (error) {
             console.log(error)
         });
    } catch (error) {
        
    }
})


export {dictApi,finishedInfoFormula,idChangeStr,exportExcel,downFile}