const express = require('express');
const app=express();

const cors=require("cors")

const bookingRouter=require("./routes/bookingRoute");
const userRouter=require("./routes/userRoute");
const eventRouter=require("./routes/eventRoute");
const availabilityRouter=require("./routes/availabilityRoute");

app.use(cors());
app.use(express.json())

app.listen(4000,()=>console.log("app running on 4000"));

app.use("/api/v1/bookings",bookingRouter);
app.use("/api/v1/users",userRouter);
app.use("/api/v1/events",eventRouter);
app.use("/api/v1/availability",availabilityRouter);

app.get("/",(req,res,next)=>{
    return res.status(200).json({status:"successs",message:"Everything fine here,app runnning successfully"});
})




