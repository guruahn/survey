import { database, firebaseAuth , datetimeFormat} from '../config/constants'
import moment from 'moment';

export function auth (email, pw) {
  return firebaseAuth().createUserWithEmailAndPassword(email, pw)
    .then(saveUser)
    .catch((error) => {
      console.log('Oops', error)
      alert(error.message)
    })
}

export function logout () {
  return firebaseAuth().signOut()
}

export function login (email, pw) {
  return firebaseAuth().signInWithEmailAndPassword(email, pw)
    .catch((error) => {
      alert(error.message)
    })
}

export function saveUser (user) {
  console.log('SaveUser', user.uid)
  const updates = {};
  updates['/users/' + user.uid] = {
    email: user.email,
    uid: user.uid,
    emailVerified: user.emailVerified,
    displayName: user.displayName,
    photoURL: user.photoURL,
    phoneNumber: user.phoneNumber,
    insertDatetime: moment().format(datetimeFormat)
  };
  return database.ref().update(updates)
    .then(() => user)
}
