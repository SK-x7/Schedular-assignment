const { getFirestore } = require('firebase-admin/firestore');
const express = require('express');
let admin=require("firebase-admin");
let serviceAccount=require("./serviceAccountKey.json")
const cors=require("cors")
// const {} = require("firebase")
// const app = initializeApp();
const app=express();

app.use(express.json())
app.use(cors());
app.listen(4000,()=>console.log("app running on 4000"));
// initializeApp(app);
admin.initializeApp({
    credential:admin.credential.cert(serviceAccount)
})
const db=getFirestore();

// console.log(db);


app.get("/",(req,res,next)=>{
    return res.status(200).json({status:"successs",message:"Everything fine here,app runnning successfully"});
})

app.get("/getAllUsers",async (req,res,next)=>{
    
    
    const users=await db.collection("Users").get();
    const usersList=users.docs.map((doc)=>({
        id:doc.id,
        ...doc.data()
    }))
    console.log(users);
    return res.status(200).json({
        status:"success",
        message:"Users found successfully",
        usersList
    });
})

app.post("/checkUserInDb",async (req,res,next)=>{
    console.log(req.body)
    try {
    const users=await db.collection("Users").where("clerkUserId","==",req.body.userId).get();
    console.log(users);
    if (!users.empty) {
        // Document found, retrieve data
        const user =users.docs[0];
        const userData=await user.data();
        const userId = user.id;
        console.log("User data:", userData,userId);
        
        return res.status(200).json({status:"success",message:"User found",userData,userId});
      } else {
        // Document does not exist
        console.log("No user found with this ID");
        return res.status(200).json({status:"fail",message:"User not found"});
      }
      
    }catch (error) {
        return res.status(404).json({status:"fail",message:"error checking user"}) 
        // throw new Error(error);
      }
})

app.post("/createUser",async (req,res,next)=>{
    console.log(req.body)
    const userData=req.body.userData;
    try {
        
    
    const userRef=await db.collection("Users").add({
        ...userData,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    })
    
    console.log(userRef);
    if (userRef) {
        // Document found, retrieve data
        const user=(await (await userRef).get()).data();
    
        return res.status(200).json({status:"success",message:"User found",user});
      } else {
        // Document does not exist
        console.log("No user found with this ID");
        return res.status(404).json({status:"fail",message:"Error creating user"});
      }
      
      
    } catch (error) {
        console.log("🔴")
        console.log(error);
        return res.status(404).json({status:"fail",message:"Error creating user"});
    }
})


app.post("/createEvent",async (req,res,next)=>{
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
})


app.get("/getAllEvents",async (req,res,next)=>{
    
    
    const eventsRef=await db.collection("Events").get();
    const allEvents=eventsRef.docs.map((doc)=>({
        id:doc.id,
        ...doc.data()
    }))
    console.log(allEvents);
    return res.status(200).json({
        status:"success",
        message:"Users found successfully",
        length:allEvents.length,
        allEvents,
    });
})

app.get("/getAllEvents/:id",async(req,res,next)=>{
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
})


app.post("/createAvailability/:userId", async (req, res, next) => {
  const { userId } = req.params;
  const { timeGap, availabilityData } = req.body;

  if (!userId) {
    return res.status(404).json({
      status: "fail",
      message: "Please provide instructor id in params",
    });
  }

  if (!timeGap) {
    return res.status(404).json({
      status: "fail",
      message: "Please provide instructor timeGap",
    });
  }

  const availabilityRef = db.collection("Availability");
  const dayAvailabilityRef = db.collection("Day_availability");

  let availabilityId;

  try {
    // Step 1: Check if the availability document exists for the instructor
    const existingDocQuery = await availabilityRef
      .where("instructorId", "==", userId)
      .get();

    if (!existingDocQuery.empty) {
      // If a document exists, update its timeGap
      const existingDocId = existingDocQuery.docs[0].id;
      await availabilityRef.doc(existingDocId).update({
        timeGap: timeGap,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      availabilityId = existingDocId; // Use the existing availabilityId
      console.log(`Updated existing availability for instructorId: ${userId}`);
    } else {
      // If no document exists, create a new availability document
      const newAvailabilityDoc = await availabilityRef.add({
        instructorId: userId,
        timeGap: timeGap,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      availabilityId = newAvailabilityDoc.id;
      console.log(`Created new availability for instructorId: ${userId}`);
    }

    // If no availabilityData exists or it’s invalid, send a success response early
    if (!availabilityData || !Array.isArray(availabilityData)) {
      return res.status(200).json({
        status: "success",
        message: "Availability Time gap updated successfully.",
      });
    }

    // Step 2: Filter duplicates based on day, startTime, and endTime
    const uniqueAvailabilityData = availabilityData.filter((value, index, self) => {
      return index === self.findIndex((t) => (
        t.day === value.day && t.startTime === value.startTime && t.endTime === value.endTime
      ));
    });

    // Step 3: Delete all existing Day_availability records for this availabilityId
    const dayAvailabilityQuery = await dayAvailabilityRef
      .where("availabilityId", "==", availabilityId)
      .get();

    const batch = db.batch();
    dayAvailabilityQuery.forEach((doc) => {
      batch.delete(doc.ref);
    });

    // Now handle the creation of new availability for each day
    const updatedAvailabilityData = [];
    uniqueAvailabilityData.forEach((availability) => {
      updatedAvailabilityData.push({
        day: availability.day,
        startTime: availability.startTime,
        endTime: availability.endTime,
        status: availability.status || "available",
      });
    });

    // Set the updated availability data in the Day_availability document
    const dayAvailabilityDocRef = dayAvailabilityRef.doc(availabilityId);

    // Here, we are directly setting the data without using arrayUnion
    batch.set(dayAvailabilityDocRef, {
      availabilityId: availabilityId,
      availabilityData: updatedAvailabilityData,
    });

    // Commit the batch operation to ensure all updates and deletes happen atomically
    await batch.commit();

    // Return success response
    return res.status(200).json({
      status: "success",
      message: "Availability updated successfully.",
    });
  } catch (error) {
    console.error("Error in creating/updating availability:", error);
    return res.status(500).json({
      status: "fail",
      message: "Error occurred while creating/updating availability.",
      error: error.message,
    });
  }
});

app.get("/getAvailability/:id", async (req, res, next) => {
  const userId = req.params.id;  // Instructor ID from URL parameter

  if (!userId) {
    return res.status(400).json({
      status: "fail",
      message: "Please provide instructor id in the request parameters.",
    });
  }

  try {
    // Step 1: Fetch the Availability document for the given userId
    const availabilityRef = db.collection("Availability");
    const availabilityQuery = await availabilityRef
      .where("instructorId", "==", userId)
      .get();

    if (availabilityQuery.empty) {
      return res.status(404).json({
        status: "fail",
        message: `No availability found for instructorId: ${userId}`,
      });
    }

    const availabilityDoc = availabilityQuery.docs[0];
    const timeGap = availabilityDoc.data().timeGap;
    const availabilityId = availabilityDoc.id;  // The availabilityId is the document ID

    // Step 2: Fetch the corresponding Day_availability document
    const dayAvailabilityRef = db.collection("Day_availability");
    const dayAvailabilityQuery = await dayAvailabilityRef
      .where("availabilityId", "==", availabilityId)
      .get();

    if (dayAvailabilityQuery.empty) {
      return res.status(404).json({
        status: "fail",
        message: `No day availability found for availabilityId: ${availabilityId}`,
      });
    }

    // Step 3: Extract the availabilityData from the Day_availability document
    const dayAvailabilityDoc = dayAvailabilityQuery.docs[0];
    const availabilityData = dayAvailabilityDoc.data().availabilityData;

    // Step 4: Combine the timeGap and availabilityData in the required format
    const response = {
      timeGap: timeGap,
      availabilityData: availabilityData,
    };

    // Step 5: Return the response
    return res.status(200).json({
      status: "success",
      message: "Availability fetched successfully.",
      data: response,
    });

  } catch (error) {
    console.error("Error fetching availability:", error);
    return res.status(500).json({
      status: "fail",
      message: "Error occurred while fetching availability.",
      error: error.message,
    });
  }
});



