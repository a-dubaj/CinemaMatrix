import admin from 'firebase-admin';
import serviceAccount from '../cinemamatrix-325c2-firebase-adminsdk-q2rce-473d11c53c.json';
// Initialize firebase admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'gs://cinemamatrix-325c2.appspot.com',
});
// Cloud storage
const bucket = admin.storage().bucket();

module.exports = {
    bucket,
};