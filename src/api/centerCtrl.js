let baseUrl = 'http://106.12.58.11:5000'
// let baseUrl = 'http://localhost:5000'
import axios from 'axios';
let upload = (formData)=>{
  return new Promise((resolve)=>{
    axios({
      url:`${baseUrl}/api/upload`,
      method:'POST',
      headers:{
        "content-type":'multipart/form-data'
      },
      data:formData
    }).then((res)=>{
      resolve(res)
    }).catch(err=>{
      reject(err)
    })
  })
}

export default {upload}
