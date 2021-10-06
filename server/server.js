const express = require("express");
const serverLog = require("./lib/serverLog");
const statusCodes = require("./lib/statusCodes");
require("dotenv").config({ path: `${__dirname}/dev.env` });
const signUpHelp = require("./lib/auth/signUp");
const authUsersHelp = require("./lib/auth/authUsers");

//Import models
const commentsModel = require("./models/comments_models");
const confirmationModel = require("./models/confirmation_models");
const consultationModel = require("./models/consultation_models");
const doctorModel = require("./models/doctor_models");
const patientsModel = require("./models/patients_models");
const relationshipsModel = require("./models/relationships_models");
const sectionModel = require("./models/section_models");

//Server config
const path = require("path");
const app = express();
const port = serverLog.port; // Default port is 3000

const { auth } = require("express-openid-connect");
app.use(
	auth({
		auth0Logout: true,
		issuerBaseURL: process.env.ISSUER_BASE_URL,
		baseURL: process.env.BASE_URL,
		clientID: process.env.CLIENT_ID,
		secret: process.env.SECRET,
	})
);

app.use(express.static("client")); //Serves our static files used for the client
app.use(express.json()); //Allows us to respond with JSON
app.use(serverLog.sMsg.req); //Automatically sends messages to the console

/* --- ROUTES --- */
app.get("/", (req, res) => {
	//check if logged in
	console.log(req.oidc.isAuthenticated());
	if (req.oidc.isAuthenticated()) {
		console.log(req.oidc.user);
		let userId = req.oidc.user.sub;
		signUpHelp.isFirstSignUp(userId).then((res) => {
			if (res) {
				authUsersHelp.getMetaData(userId).then((res) => {
					if (res.role === "patient") {
						patientsModel.patientCreate(req.oidc.user.sub, res.name);
					}
				});
			}
		});
		res.redirect("/home");
	} else {
		res.redirect("/login");
	}
});

app.get("/addconsultation", (req, res) => {
	res.sendFile(path.join(__dirname, "../client/views/addconsultation.html"));
});

app.get("/patientview", (req, res) => {
	res.sendFile(path.join(__dirname, "../client/views/patientview.html"));
});

app.get("/hpview", (req, res) => {
	res.sendFile(path.join(__dirname, "../client/views/hpview.html"));
});

app.get("/landing", (req, res) => {
	res.sendFile(path.join(__dirname, "../client/views/landing.html"));
});

app.get("/callback", (req, res) => {
	console.log(req.oidc);
	res.send("logged in");
});

app.get("/home", (req, res) => {
	res.sendFile(path.join(__dirname, "../client/views/home.html"));
});

/* --- API ROUTES --- */
app.get("/api/", (req, res) => {
	res.json(statusCodes.success());
});

/* --- SERVER LISTEN --- */
app.listen(port, (_) => serverLog.startup(port));
