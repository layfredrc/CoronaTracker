// Your web app's Firebase configuration
var firebaseConfig = {
	apiKey: "AIzaSyDb-Vj_8Ej21Eul6p878XHWmpBe5XNBnAc",
	authDomain: "coronatracker-67aae.firebaseapp.com",
	databaseURL: "https://coronatracker-67aae.firebaseio.com",
	projectId: "coronatracker-67aae",
	storageBucket: "coronatracker-67aae.appspot.com",
	messagingSenderId: "804146612879",
	appId: "1:804146612879:web:80a8d5440768df9a7e3efa",
	measurementId: "G-RN7ZVMWYCG"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

function signUp() {
	var email = document.getElementById("email");
	var password = document.getElementById("password");

	const promise = auth.createUserWithEmailAndPassword(
		email.value,
		password.value
	);
	promise.catch(e => alert(e.message));

	alert("Signed Up");
}

function signIn() {
	var email = document.getElementById("email");
	var password = document.getElementById("password");

	const promise = auth.signInWithEmailAndPassword(email.value, password.value);
	promise.catch(e => alert(e.message));
	alert("Signed In");
	window.location.href = "map.html";
}

function signOut() {
	auth.signOut();
	alert("Signed Out");
}

auth.onAuthStateChanged(function(user) {
	if (user) {
		var email = user.email;
		confirm("Active User " + email);

		//Take user to a different or home page
		window.location.href = "map.html";
		//is signed in
	} else {
		alert("No Active User");
		//no user is signed in
	}
});
