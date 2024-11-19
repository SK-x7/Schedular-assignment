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
  
  
  exports.getBookingsOfUser = async (req, res, next) => {
    try {
      // Query the Bookings collection based on studentId
      const bookingQuery = await db
        .collection("Bookings")
        .where("studentId", "==", req.params.studentId)
        .get();
  
      if (bookingQuery.empty) {
        // No bookings found
        return res.status(200).json({
          status: "success",
          message: "There is no booking yet from this user.",
          length: 0,
          userBookings: [],
        });
      }
  
      // Extract event IDs and prepare bookings array
      const bookings = bookingQuery.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      const eventIds = bookings.map(booking => booking.eventId);
  
      // Fetch event details for each eventId
      const userBookings = [];
      for (const booking of bookings) {
        const eventDoc = await db.collection("Events").doc(booking.eventId).get();
        if (eventDoc.exists) {
          // Combine event data with corresponding booking data
          userBookings.push({
            id: booking.id,
            ...eventDoc.data(),
            additionalInfo:booking.additionalInfo,
            startTime: booking.startTime,
            endTime: booking.endTime,
          });
        }
      }
  
      return res.status(200).json({
        status: "success",
        message: "Bookings retrieved successfully",
        length: userBookings.length,
        userBookings,
      });
    } catch (error) {
      console.error("Error retrieving booking:", error);
      return res.status(500).json({
        status: "error",
        message: "Error retrieving booking",
        error: error.message,
      });
    }
  };
  
  exports.deleteBooking=async function name(req,res,next) {
    try{
      
    
    console.log(req.params.bookingId);
    if(!req.params.bookingId){
      res.status(404).json({
        status: "fail",
        message:"Please provide bookingId in url params to delete a booking.",
      })
    }
    
    const bookingDocRef = db.collection('Bookings').doc(req.params.bookingId);
    
    const bookingToDelete = await bookingDocRef.get();
    if (!bookingToDelete.exists) {
      console.log(`Booking with ID: ${req.params.bookingId} does not exist.`);
      return res.status(404).json({
        status:"fail",
        isDeleted:false,
        message: `Booking with ID: ${req.params.bookingId} does not exist`
      })
    }
    
    await bookingDocRef.delete();
    
    res.status(200).json({
      status: "success",
      isDeleted: true,
      message:`Booking with ID: ${req.params.bookingId} deleted successfully`,
    })
    
  }catch(e){
      res.status(500).json({
        status: "error",
        message:`${e.message}`
      })
  }
    
  }
  