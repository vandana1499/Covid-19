const request=require('request');

const location=(address,callback)=>{

   
  const url="https://api.covid19india.org/data.json"
    request({url,json:true},(error,res)=>{


        if(error)
        callback("Unable to connect to  this service",undefined)



        else
        {
            
         
                const data=res.body.statewise;
              
                 const result=data.filter((item)=>{
                     if(item.state.toLowerCase()==address.toLowerCase())
                     return item
                 })
                
              
               const send=result[0]
              
                if(result!=undefined)
                 callback(undefined,send)
                else
                  callback("Location not available in the data",undefined)
  
        }
    })
}

  
module.exports=location