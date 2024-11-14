const { admin,db } = require("../firebaseConnection");

exports.getAllEvents = async(req,res,next)=>{
        try {
    const eventsRef=await db.collection("Events").get();
    if (!eventsRef.empty) {
        // Document found, retrieve data
        const events=eventsRef.docs.map((doc)=>({
            id: doc.id,
            ...doc.data()
        }))
        
        return res.status(200).json({status:"success",message:`All events found`,length:events.length,allEvents:events});
      } else {
        // Document does not exist
        console.log("No Events found");
        return res.status(200).json({status:"fail",message:"Events not found"});
      }
      
    }catch (error) {
        console.log(error);
        return res.status(404).json({status:"fail",message:"error fetching all events"}); 
        // throw new Error(error);
      }
}

exports.getEventsByInstructor = async(req,res,next)=>{
    console.log(req.params);
    if(!req.params.id)  return res.status(404).json({
        status:"fail",
        message:"Please provide instructor id in params"});
        
    try {
    const eventsRef=await db.collection("Events").where("instructorId","==",req.params.id).get();
    if (!eventsRef.empty) {
        // Document found, retrieve data
        const events=eventsRef.docs.map((doc)=>({
            id: doc.id,
            ...doc.data()
        }))
        
        return res.status(200).json({status:"success",message:`Events of instructor : ${req.params.id} found`,length:events.length,events});
      } else {
        // Document does not exist
        console.log("No Events found with this ID");
        return res.status(200).json({status:"fail",message:"Events not found"});
      }
      
    }catch (error) {
        console.log(error);
        return res.status(404).json({status:"fail",message:"error fetching events by this user"}); 
        // throw new Error(error);
      }
}


exports.createEvent=async (req,res,next)=>{
    console.log(req.body)
    const eventData=req.body.eventData;
    try {
        
    
    const eventRef=await db.collection("Events").add({
        ...eventData,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    })
    
    console.log(eventRef);
    if (eventRef) {
        // Document found, retrieve data
        const event=(await (await eventRef).get()).data();
    
        return res.status(200).json({status:"success",message:"Event found",event});
      } else {
        // Document does not exist
        console.log("No Event found with this ID");
        return res.status(404).json({status:"fail",message:"Error creating event"});
      }
      
      
    } catch (error) {
        console.log("🔴")
        console.log(error);
        return res.status(404).json({status:"fail",message:"Error creating event"});
    }
}










