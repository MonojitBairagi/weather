import express from "express"
import bodyParser from "body-parser"
import axios from "axios"
const app=express();
const port=3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}))
app.post("/weather",async(req,res)=>{
    console.log(req.body);
    const lat=req.body.lattitude;
    const lon=req.body.longitude;
    try{  
        if(req.body.name) nam=req.body.name;
        else nam="Kolkata";
        const response=await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${nam}&APPID=9a711b0b8586c49d0631715d70e23346&units=metric`);
        console.log(response.data);
        const result=response.data;
        var nam;
      
        res.render("index.ejs",{
            name:nam,
            temp:result.main.temp,
            rain:result.weather[0].description,
            feels:result.main.feels_like,
            max:result.main.temp_max,
            min:result.main.temp_min,
            Humidity:result.main.humidity,
            Pressure:result.main.pressure,
            speed:result.wind.speed,
        })
    }  
    catch(error){
        console.log(error);
    }
    
})
app.listen(port,()=>{
    console.log(`listening on ${port}`);
})
