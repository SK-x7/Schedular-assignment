const { getFirestore } = require('firebase-admin/firestore');
let admin=require("firebase-admin");
let serviceAccount=require("./serviceAccountKey.json");

admin.initializeApp({
    credential:admin.credential.cert(serviceAccount)
})

const db=getFirestore();

module.exports = { admin, db };

