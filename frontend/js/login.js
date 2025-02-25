import User from './user.js'


document.addEventListener("DOMContentLoaded", () => {
	console.log("hello");
	document.getElementById("loginForm").addEventListener("submit", async (event) => {
		console.log("hello");
		event.preventDefault();

		const username = document.getElementById("username").value;
		const password = document.getElementById("password").value;

		const user = await User.create(username, password);

		if (!user) {
			console.error("User could not be logged in due to some error");
		}

		//window.location.href = "www.google.com";
	})
})
