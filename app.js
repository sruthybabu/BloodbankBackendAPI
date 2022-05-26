const Express=require("express")
const Bodyparser=require("body-parser")
const Mongoose=require("mongoose")
const req = require("express/lib/request")
const res = require("express/lib/response")



var app=Express()
app.use(Bodyparser.urlencoded({extended:true}))
app.use(Bodyparser.json())
app.use((req, res, next) => { 
    res.setHeader("Access-Control-Allow-Origin", "*");  
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"   ); 
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS"   ); 
    next(); });

var bloodModel=Mongoose.model("bloods",

new Mongoose.Schema({
    name:String,
    address:String,
    bloodGroup:String,
    mobileNo:String,
    userName:String,
    password:String
})
)
Mongoose.connect("mongodb+srv://sruthybabu:sruthy4599@cluster0.bip6a.mongodb.net/bloodDb")

app.post("/api/bloodadd",(req,res)=>{
    var getName=req.body.name
    var getAddress=req.body.address
    var getBloodgroup=req.body.bloodGroup 
    var getMobileno=req.body.mobileNo
    var getUsername=req.body.userName 
    var getPassword=req.body.password
    data={"name":getName,"address":getAddress,"bloodGroup":getBloodgroup,"mobileNo":getMobileno,"userName":getUsername,"password":getPassword}
    let myblood= new bloodModel(data)
    myblood.save((error,data)=>{
        if(error)
        {
            res.send({"status":"error","data":error})
        }
        else
        {
            res.send({"status":"success","data":data})
        }
    })

    
})


app.get("/api/bloodview",(req,res)=>{
    bloodModel.find(
        (error,data)=>{
            if(error)
            {
                res.send({"status":"error"})
            }
            else
            {
                res.send(data)
            }

        }
    )

    
})

app.listen(5007,()=>{
    console.log("Server Running")
})