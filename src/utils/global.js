const request=require('request')
const url="https://api.covid19india.org/data.json"
const global=(callback)=>{
    request({url,json:true},(error,res)=>{


        if(error)
        callback("Unable to connect to  this service",undefined)



        else
        {

            const data1=res.body.cases_time_series;
            const dData=[];
            const cData=[]
            data1.forEach((item)=>{
                dData.push(item.date);
                cData.push(item.totalconfirmed)
            })
          const  dateData=dData.slice(52);
           const confirmedData=cData.slice(52);

            callback(undefined,{dateData,confirmedData})
                    }


})
}
module.exports=global



