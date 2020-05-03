

var select = document.querySelector("#state");


const active=document.querySelector('#active')
const confirmed=document.querySelector('#confirmed')
const deaths=document.querySelector('#deaths')

const recovered=document.querySelector('#recovered')
const info=document.querySelector(".info")
const dataShow=document.querySelector('.data-show')
var ctx = document.getElementById('myChart').getContext('2d');

function myFunction() {
    var ctx1=document.getElementById('myChart1').getContext('2d');

    fetch('/global')
    .then((res)=>res.json())
    .then((data)=>{
        myChart1.data.labels=data.dateData
          myChart1.data.datasets[0].data=data.confirmedData
          
          myChart1.update()

    })
    .catch((Error)=>{
        console.log(Error)
    })

var myChart1 = new Chart(ctx1, {
type: 'line',
data: {

  labels: [],
  datasets: [{
      label: ' Total Confimed cases of India ',
      data:[],
     

     barWidth:20,
      backgroundColor: 
        
          'rgba(255, 159, 64, 0.2)',
     
      borderWidth: 2,
     
      hoverBorderColor:"rgba(255, 99, 132, 1)",
      hoverBackgroundColor:"rgba(255, 159, 64, 0.2)"
  }]
},
options: {
  
  
      responsive:true,
      maintainAspectRatio:false,
 
  
 

 
}
});


  
  
}




select.addEventListener('change',()=>{

    const location=select.options[select.selectedIndex].value;
  
    fetch('/location/?address='+encodeURIComponent(location))
    .then((res)=>{
        res.json()
        .then((data)=>{
          
            info.style.display="flex"
            dataShow.style.display="flex"
            active.textContent=data.active;
             confirmed.textContent=data.confirmed;
             deaths.textContent=data.deaths
          
            recovered.textContent=data.recovered
           
            myChart.data.labels=data.districts
            myChart.data.datasets[0].data=data.disconfirm
            myChart.options["title"]={display:true,text:"Confirmed cases of district of "+location}

            
      
            myChart.update()
       
          
            

        })
    })

    .catch((error)=>{
        active.textContent="Unable to find such location"
    })
   
})

    var myChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: {

            labels: [],
            datasets: [{
                label: 'Confirmed Cases',
                data:[],
               
               
                backgroundColor:'rgba(255, 99, 132, 0.2)',
                // backgroundColor: [
                //     'rgba(255, 99, 132, 0.2)',
                //     'rgba(54, 162, 235, 0.2)',
                //     'rgba(255, 206, 86, 0.2)',
                //     'rgba(75, 192, 192, 0.2)',
                //     'rgba(153, 102, 255, 0.2)',
                //     'rgba(255, 159, 64, 0.2)'
                // ],
                // borderColor: [
                //     'rgba(255, 99, 132, 1)',
                //     'rgba(54, 162, 235, 1)',
                //     'rgba(255, 206, 86, 1)',
                //     'rgba(75, 192, 192, 1)',
                //     'rgba(153, 102, 255, 1)',
                //     'rgba(255, 159, 64, 1)'
                // ],
                borderWidth: 2,
               maxBarWidth:40,
                hoverBorderColor:"rgba(255, 99, 132, 1)",
                hoverBackgroundColor:"rgba(255, 159, 64, 0.2)"
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            
                responsive:true,
                maintainAspectRatio:false,
           
            
           
        
           
        }
    });

    // labels: ["Surgical Mask","Vaccum cleaner bag","Tea towel","Cotton mix","Antimicrobial Pillowcase","Linen","Pillowcase","Silk","100% cotton T-shirt","T-shirt"],
    //         datasets: [{
    //             label: 'Best household material for making a mask',
    //             data:[96.4,94.4,83.2,74.6,65.6,60.0,61.3,58.0,69.4,62.3],
               
   
  
