/// made by mohamed khounti
// in 6/29/2020
$(document).ready(()=>{
    
 let times = 2;
 let = links = [''];

//get jobs
 $(".send").click( (e)=> { 
     //e.preventDefault();
     $(".card").remove();
  
     let jobTitle = $(".jobsTitle").val();
     let jobCity = $(".jobsCity").val();
    
    httpGet(jobTitle,jobCity);
     times--;
 
     
 });
// get job details
$(document).on('click', '.mylink', (e) =>{
    e.preventDefault();
    let linko =$(".mylink").attr("href");
    let uri_enc = encodeURIComponent(linko);
    let uri_dec = decodeURIComponent(uri_enc);
    getjobinfo(uri_enc);
    console.log(uri_enc);
  
}) ;



 function httpGet(job, city)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){ 
        $(".card").remove();
             data = JSON.parse(xmlHttp.responseText);
            for(let i = 0;i< data.Title.length; i++ ){
                $(".row").append('<div class="card">'+
                '<h5 class="card-header">'+data.Title[i] +'</h5>'+
                '<div class="card-body">'+
                '<h5 class="card-title">'+data.city[i] +'</h5>'+
                '<p class="card-text">'+data.summary [i] +'</p>'+
                '<h6 class="card-title"> '+data.date[i] +'</h6>'+
                '<a  href="'+data.link[i] +'" class="btn btn-primary mylink">search</a>'+
                ' </div> </div>');
                
             }
            }
            
    }
    xmlHttp.open("GET", "https://lkhedma.herokuapp.com/jobs/"+job+"/"+city, true); // true for asynchronous 
    xmlHttp.send(null);
  
}


function getjobinfo(link)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){ 
       
             data = JSON.parse(xmlHttp.responseText);
             $(".card").remove();
             let uri_enc = encodeURIComponent(data.link);
             let uri_dec = decodeURIComponent(uri_enc);
             $(".row").append('<div class="card">'+
             '<h5 class="card-header">'+data.title +'</h5>'+
             '<div class="card-body">'+
             '<p class="card-text">'+data.Description +'</p>'+
             
             '<a  href="'+uri_dec  +'" class="btn btn-primary ">Apply</a>'+
             ' </div> </div>');



            }
            
    }
    xmlHttp.open("POST", "https://lkhedma.herokuapp.com/details/", true); // true for asynchronous 
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    let formatetlink = "url="+link;
    xmlHttp.send(formatetlink);
  
}





})