const request=require('request');
const district=(address,callback)=>{
const url="https://api.covid19india.org/v2/state_district_wise.json";

request({url,json:true},(error,res)=>{
    if(error)
    {
        callback("unable to fetch the district data",undefined);
    }
    else{

        const data=res.body;
        var result=[];
        data.forEach((item)=>{
            if(item.state.toLowerCase()==address.toLowerCase())
            {
               return result.push(item.districtData)
            }
        })
       
        var districts=[];
        var disconfirm=[]
        var disactive=[]
            result[0].forEach((item)=>{
                
                districts.push(item.district);
                disconfirm.push(item.confirmed)
                disactive.push(item.active)
            })
     

        
        callback(undefined,{districts,disconfirm,disactive});
    }

})
}

module.exports=district