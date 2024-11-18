const { admin, db } = require("../firebaseConnection");

exports.createBooking=async (req,res,next)=>{
    console.log(req.body)
    const bookingData=req.body.bookingData;
    try {
        
    
    const bookingsRef=await db.collection("Bookings").add({
        ...bookingData,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    })
    
    console.log(bookingsRef);
    if (bookingsRef) {
        // Document found, retrieve data
        const event=(await (await bookingsRef).get()).data();
    
        return res.status(200).json({status:"success",message:"Slot Booked!!",event});
      } else {
        // Document does not exist
        console.log("No Event found with this ID");
        return res.status(404).json({status:"fail",message:"Error fetching booking"});
      }
      
      
    } catch (error) {
        console.log("🔴")
        console.log(error);
        return res.status(404).json({status:"fail",message:"Error creating event"});
    }
}

exports.getBookingsOfEvent = async (req,res,next)=>{
    console.log(req.body)
  
    const instructorId=req.body.instructorId;
    try {
      // Query the Bookings collection based on instructorId and eventId
      const bookingQuery = await db.collection("Bookings")
        .where("instructorId", "==", req.params.instructorId)
        .where("eventId", "==", req.params.eventId)
        .get();
  
      if (bookingQuery.empty) {
        // No bookings found
        return res.status(200).json({
          status: "success",
          message: "There is no booking yet for this event.",
          length: 0,
        });
      }
  
      // Map through the results and prepare the response
      const bookings = bookingQuery.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
  
      return res.status(200).json({
        status: "success",
        message: "Booking retrieved successfully",
        length: bookings.length,
        bookings // Sending as an array in case there are multiple bookings with the same criteria
      });
  
    } catch (error) {
      console.error("Error retrieving booking:", error);
      return res.status(500).json({
        status: "error",
        message: "Error retrieving booking",
        error: error.message
      });
    }
  }
  
  
  
  exports.getBookingsOfUser = async (req,res,next)=>{
    try {
      // Query the Bookings collection based on instructorId and eventId
      const bookingQuery = await db.collection("Bookings")
        .where("studentId", "==", req.params.studentId)
        .get();
  
      if (bookingQuery.empty) {
        // No bookings found
        return res.status(200).json({
          status: "success",
          message: "There is no booking yet from this user.",
          length: 0,
        });
      }
      
      
      const eventIds = bookingQuery.docs.map((doc) => doc.data().eventId);
      console.log(eventIds);
      
      const events = [];
    for (const eventId of eventIds) {
      const eventDoc = await db.collection("Events").doc(eventId).get();
      if (eventDoc.exists) {
        events.push({ id: eventDoc.id, ...eventDoc.data() });
      }
    }
      // Map through the results and prepare the response
      // const bookings = bookingQuery.docs.map(doc => ({
      //   id: doc.id,
      //   ...doc.data()
      // }));
  
      return res.status(200).json({
        status: "success",
        message: "Bookings retrieved successfully",
        length: events.length,
        events,
        // bookings // Sending as an array in case there are multiple bookings with the same criteria
      });
  
    } catch (error) {
      console.error("Error retrieving booking:", error);
      return res.status(500).json({
        status: "error",
        message: "Error retrieving booking",
        error: error.message
      });
    }
  }