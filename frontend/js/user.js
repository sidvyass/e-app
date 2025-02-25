class User {
	constructor(username, password) {
		this.username = username;
		this.password = password;
		this.headers = null;
		this.is_logged_in = false;
		this.url = "http://127.0.0.1:8000/";
	}

	async login(username, password) {
		const url = "http://127.0.0.1:8000/login";

		var user_data = new URLSearchParams();
		user_data.append("username", username);
		user_data.append("password", password);

		try{
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: user_data,
			})

			if (!response.ok) {
				console.error(`Login failed with response status ${response.status}`);
				return null;
			} else if (response.status == 401) {
				console.error("Login failed. Incorrect Username or password")
				return null;
			}

			const headers_dict = await response.json()

			if (!headers_dict["access_token"]) {
				console.error("Server did not return an access token");
				return null;
			}

			this.headers = {"Authorization": "Bearer " + headers_dict["access_token"]};
			this.is_logged_in = true;
			console.log("Log in successful.");

			return this;

		} catch (error) {
			console.error(error.message);
			return null;
		}
	}

	async makeGetRequest(url_extension) {
		if (!this.is_logged_in) {
			console.error("Unauthorized user.");
			return null;
		}

		const url = `${this.url}${url_extension}`;

		try {
			const response = await fetch(url, {
				method: "GET",
				headers: this.headers,
			})

			if (!response.ok) {
				console.error(`Login failed with response status ${response.status}`);
				return null;
			}

			return await response.json();

		} catch (error) {
			console.error(error.message);
			return null;
		}
	}

	static async create(username, password) {
		const user = new User(username, password);
		return await user.login();
	}

}

export default User;
