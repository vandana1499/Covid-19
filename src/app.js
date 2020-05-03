const express=require('express');
const path=require('path');
const hbs=require('hbs');
const location=require('./utils/location')
const district=require('./utils/district')
 const global=require('./utils/global')
const app=express()
const port=process.env.PORT || 3001;


const publicDirectory=path.join(__dirname,"../public/")
const viewsDirectory=path.join(__dirname, '../templates/views')
const partialsDirectory=path.join(__dirname, '../templates/partials')



app.use(express.static(publicDirectory))
app.set('view engine', 'hbs');
app.set('views', viewsDirectory);


hbs.registerPartials(partialsDirectory)


app.get('',(req,res)=>{

    res.render("index",{name:"Vandana",
    title1:"There are currently no drugs licensed for the treatment or prevention of COVID-19",
    info1:"While several drug trials are ongoing, there is currently no proof that hydroxychloroquine or any other drug can cure or prevent COVID-19. The misuse of hydroxychloroquine can cause serious side effects and illness and even lead to death. WHO is coordinating efforts to develop and evaluate medicines to treat COVID-19."
    ,title2:"COVID-19 IS NOT transmitted through houseflies",
    info2:"To date, there is no evidence or information to suggest that the COVID-19 virus transmitted through houseflies. The virus that cause COVID-19 spreads primarily through droplets generated when an infected person coughs, sneezes or speaks. You can also become infected by touching a contaminated surface and then touching your eyes, nose or mouth before washing your hands. To protect yourself, keep at least 1-metre distance from others and disinfect frequently-touched surfaces. Clean your hands thoroughly and often and avoid touching your eyes, mouth and nose.",
    title3:"Exposing yourself to the sun or to temperatures higher than 25C degrees DOES NOT prevent the coronavirus disease (COVID-19)",
    info3:"You can catch COVID-19, no matter how sunny or hot the weather is. Countries with hot weather have reported cases of COVID-19. To protect yourself, make sure you clean your hands frequently and thoroughly and avoid touching your eyes, mouth, and nose.",


})

})

app.get('/global',(req,res)=>{

    global((error,data)=>{
      
        if(error)
         return res.send(error);
        res.send(data);
    })
})


app.get('/location',(req,res)=>{

    if(!req.query.address)
    {
        return res.send({error:"You must provide the address"})
    }
    location(req.query.address,(error,data)=>{

        if(error)
        {
           
         return res.send(error)
        }

        district(req.query.address,(error,{districts,disconfirm,disactive}={})=>{

            
            res.send({
                active:data.active,
                confirmed:data.confirmed,
                deaths:data.deaths,
                deltaconfirmed:data.deltaconfirmed,
                deltadeaths:data.deltadeaths,
                deltarecovered:data.deltarecovered,
                recovered:data.recovered,
                districts:districts,
                disconfirm:disconfirm,
                disactive:disactive,
               
            })

        })
       
       



       
    })

    

})


app.get('*',(req,res)=>{
    res.render("404",{
        title:"Error",
    
        name:"Vandana Gupta"
    })
})

app.listen(port,()=>{
    console.log("Connected")
})