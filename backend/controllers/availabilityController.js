const {admin,db}=require("../firebaseConnection");

exports.createAvailability = async (req, res, next) => {
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
}

exports.getAvailability = async (req, res, next) => {
    const userId = req.params.instructorId;  // Instructor ID from URL parameter
  
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
        return res.status(200).json({
          status: "fail",
          message: `No availability found for instructorId: ${userId}`,
          length:0
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
}

exports.getAvailabilityOfUser = async (req, res, next) => {
  const userId = req.params.userId;  // Instructor ID from URL parameter

  if (!userId) {
    return res.status(400).json({
      status: "fail",
      message: "Please provide 'userId' in the request parameters.",
    });
  }

  try {
    // Step 1: Fetch the Availability document for the given userId
    const availabilityRef = db.collection("Availability");
    const availabilityQuery = await availabilityRef
      .where("instructorId", "==", userId)
      .get();

    if (availabilityQuery.empty) {
      return res.status(200).json({
        status: "fail",
        message: `No availability found for userId: ${userId}`,
        length:0
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
      return res.status(200).json({
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
}