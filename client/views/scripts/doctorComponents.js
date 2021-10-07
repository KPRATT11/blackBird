import component from "./../../lib/cmpParse.js";

import truePatientById from "../../lib/userDisplay.js";
const consultationDiv = document.querySelector(".consultations");
const sideBar = document.querySelector(".sidebar");
const adder = document.querySelector(".adder");
truePatientById().then((res) => {
	let patients = res.data.message;
	console.log(res);
	patients.forEach((patient) => {
		component("PatientSelector", { name: patient.full_name }, 1).then((comp) => {
			comp.classList.add("patient_selector");
			sideBar.appendChild(comp);
			return;
		});
	});
});
adder.addEventListener("click", () => {
	adderModal.open();
});

var adderModal = new tingle.modal({
	stickyFooter: false,
	closeMethods: ["overlay", "button", "escape"],
	closeLabel: "Close",
	cssClass: ["custom-class-1", "custom-class-2"],
	onOpen: function () {
		console.log("modal open");
	},
	onClose: function () {
		console.log("modal closed");
	},
	beforeClose: function () {
		// here's goes some logic
		// e.g. save content before closing the modal
		return true; // close the modal
		return false; // nothing happens
	},
});

var modal = new tingle.modal({
	stickyFooter: false,
	closeMethods: ["overlay", "button", "escape"],
	closeLabel: "Close",
	cssClass: ["custom-class-1", "custom-class-2"],
	onOpen: function () {
		console.log("modal open");
	},
	onClose: function () {
		console.log("modal closed");
	},
	beforeClose: function () {
		// here's goes some logic
		// e.g. save content before closing the modal
		return true; // close the modal
		return false; // nothing happens
	},
});

component("ConsultationLink", {}, 0).then((comp) => {
	comp.classList.add("component");
	comp.classList.add("consultation_link");
	comp.classList.add("rounded");
	comp.addEventListener("click", (e) => {
		modal.open();
	});
	consultationDiv.appendChild(comp);
	return;
});

//-------------------------------------------------------------------------------------------------------------
