import { API } from './config'
import HTTP from './http'
export default class ListModel extends HTTP {
    getFilmDatas(){
        return new Promise((resolve,reject)=>{
            this.fetchGet({
                url:API.getFilmDatas,
                success (data){
                    resolve(data)
                },
                error (err) {
                    reject(err)
                }
            })
        })
    }
    //https://api.fengxiaoci.cn/movie/dy?page=1&pagesize=9
    // dy?page=1&pagesize=9
    getFilmCategory(category,page,pagesize,year,area){
        return new Promise((resolve,reject)=>{
            this.fetchGet({
                url:`${API.getFilmCategory}${category}?page=${page}&pagesize=${pagesize}&year=${year}&area=${area}`,
                success (data){
                    resolve(data)
                },
                error (err) {
                    reject(err)
                }
            })
        })
    }
    getFilmSearch(name){
        let searchName = encodeURI(name) 
        return new Promise((resolve,reject)=>{
            this.fetchGet({
                url:`${API.getFilmSearch}?router=search&word=${searchName}&pagesize=100`,
                success (data){
                    resolve(data)
                },
                error (err) {
                    reject(err)
                }
            })
        })
    }
    // getCourses (field){
    //     return Promise((resolve,reject)=>{
    //         this.fetchGet({
    //             url:API.getCourses + field,
    //             success(data){
    //                 resolve(data)
    //             },
    //             error (err){
    //                 reject(err)
    //             }
    //         })
    //     })
    // }

    // getCourseDatas(){
    //     return new Promise((resolve,reject)=>{
    //         this.fetchGet({
    //             url:API.getCourseDatas,
    //             success(data){
    //                 resolve(data)
    //             },
    //             error(err){
    //                 reject(err)
    //             }
    //         })
    //     })
    // }
}