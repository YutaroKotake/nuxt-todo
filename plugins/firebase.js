import firebase from 'firebase'

// .envから使用するfirebaseのIDを取得
const config = {
  projectId: process.env.FIREBASE_PROJECT_ID
}

if(!firebase.apps.length){
  firebase.initializeApp(config)
}

export default firebase
