// Initialize Firebase with your service account credentials
const admin = require('firebase-admin');

const serviceAccount = {
  "type": "service_account",
  "project_id": "sih-project-beb6e",
  "private_key_id": "3d3d8179b75d11cb670efb8c464dd54c6b5b5650",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCTEHfedjAqdsTS\n6l/gU/bqhSymzRlLj6tZNPcDaCwVi2loYxPgRkvVlIIKAE7723fdefLTOYK7mJfP\n15QItZRp6Gkn3G45L+4I3tPpyHN4ZcANHWVKx4tIaazk1qIKwrXaN2nGFIZ8URlD\nI/Wd1Two35Uvd98al9HB1g+rh8cFKZHy3g3WsOtE3nbmRlpk8SczxK8nNfByeWxJ\n29yHvVoqELsWQZggpPncTQgh78VDgFhfsQU2at4Dhz3sfJDQNu+N25RlaGzAq/Af\nmp7xNifAn1gB5npItSDpTk0OljgqCHgaN3v7rB//awiAph5XBW5gUUDW50md9UdR\nAeiX1UgDAgMBAAECggEAHMW+DgIljklKXNGKDIOg7WU8xS2fY08qgPuB0GLTLSvn\nZYrs2pYmRBUYFAjXayMXIne3cGfyEe3a1ckhp0qPTOExoaDY18tu0MF3yGd1X/rY\nRjiYFrdPos06DFOJxH0vww/QW/asESp0vNQOO+D6Miz8LRtQxQ0q9reAvViFMZcS\neiWM+85LfeWXq85quP4u93+6fn+LoRQidOQ50IL50syta975oZzkF0YdzAccHuB9\nYk2Yqk3x49B4FS6kd7IWj+JIzoByNiMdo0PdSWTM7WoHxhC+UGJVAEmBW7Gya9be\nQXyX0Bg5MkINRE8X29+mdGarzmJFn6vORDdS+ZydEQKBgQDLh4D61xFtB6oAP5jS\nJwrL1S760F9tdDk0rY3E80GsxgpIT/iIWOn5V0verzbbaXwcp2PsT24XGaGN2VWF\nUgF/lY6VyG3H7RF7qq3gFKmgGGIhp57VzEyDrAGdW8yUfqFYU3+8rOwgBjVIRTyG\nncvsOPjZmj9XFXCPyekuuTSRhQKBgQC4+mWtRCje/SxdtLtguLXrxIQD1omkKeaK\naGFx2aDi+6ytn1gqZxYNLKwWMsYq8KU7OZRQxKyXR8TJUYLGNJBvkjgi+ZhHVemu\n6J2roSEbrbDKN3MKVBCoXjFhXniyNrzQoAwYqQi6pJxDo5YSpyVBtBS3KJGqYODC\njGAt7nLl5wKBgB/bW9LnavDX7EIRskfimIwDGFFl4CnvsSyPpcsYEEWM0fszmUEu\nOaEvis6WOk3pmuWZRcitPhwbhPAA/qPZjCZ+ME09jAFpF/11X7XdRheq+WEvLWtl\niOxrNe19eu4bTAHZP/s2TddNYXWocKrZdBvLZxgYTqXA01eOURNhJdtJAoGBAKHk\nlMSWWOcA0amZmj1GrAGS1q+9Pm3tNhaA0HgiLos6FaFHSpSh8EzLgjlTatj+EL7K\n4CHoX91vNK21pyztqFPdtz/1Du+wI3uvnv8tYJqm44m4CflKJeIVvkYntp7TBWHa\nEXwrxLYFh7YzIA9nNlZQ06iR2xsw+sWKskrA3NKVAoGAA0pZb+o6pnB+rmZKN1UW\nrgACbxj9cYoloHR5EnS4w8aZbom+2jb3RoSNwx8a1H8FpTfW5wIRWHDDbCRSXeIN\nOH04JLeG5hgQKHZUuMg9H6TNnhV1Z64hSXMAwncEu0mVb5yBbNJaKaANjYniLGpd\nouBPDNMK3KcXF+41Z7sUuxY=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-mmnf0@sih-project-beb6e.iam.gserviceaccount.com",
  "client_id": "100879058467008417694",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-mmnf0%40sih-project-beb6e.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'YOUR_DATABASE_URL',
});

const auth = admin.auth();
const db = admin.firestore();

// The rest of your code (signUp, login functions, etc.) remains the same.

// Function to sign up a new user
function signUp() {
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const username = document.getElementById('signup-username').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            // Store user data in Firestore
            db.collection('users').doc(user.uid).set({
                username: username,
                email: email,
                password: password,
                // Add other user data here
            });

            // Redirect to home.html after successful registration
            window.location.href = 'home.html';
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // Handle registration errors
        });
}

// Function to log in an existing user
function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // User logged in successfully
            window.location.href = 'home.html'; // Redirect to home.html
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // Handle login errors
        });
}
