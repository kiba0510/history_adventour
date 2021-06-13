const signupform = document.querySelector('#signup-form'); 


signupform.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.querySelector('#signup-email').value;
    const password = document.querySelector('#signup-password').value;

    console.log(email, password)

    firebase.auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        
    console.log('sign up')
     });
});

// Login

const signinForm = document.querySelector('#login-form');

signinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.querySelector('#login-email').value;
    const password = document.querySelector('#login-password').value;
    console.log(email, password);

    firebase.auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        
    console.log('sign In')
     });

})

// Logout

const logout = document.querySelector('#logout');

logout.addEventListener('click', (e) =>{
    e.preventDefault();
    firebase.auth().signOut().then(() => {
        console.log(('sign out'))
    })
})

// Events 
// list for auth states changed

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        console.log('auth: sign in')
        firebase.firestore().collection('users')
        .get()
        .then((QuerySnapshot) => {
            console.log(QuerySnapshot.docs);
        });
        
    } else {
        console.log('auth: sing out' )
    }
})
