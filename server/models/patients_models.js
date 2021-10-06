const { dbQuery } = require("../lib/dbQuery.js");

function patientsGetAll() {
	let sql = "select * from patients;";
	return dbQuery(sql)
		.then((res) => {
			console.log(res.rows);
			return res.rows;
		})
		.catch((err) => {
			console.log("little problem");
		});
}
function patientCreate(id, name) {
	let sql = "insert into patients (id, full_name) values ($1,$2);";
	return dbQuery(sql, [id, name])
		.then((res) => {
			console.log(res.rows);
			return res.rows;
		})
		.catch((err) => {
			console.log("little problem");
		});
}
function patientsGetId(id) {
	//  it is working but just remember the ID is text not integer
	let sql = "select * from patients where id = $1;";
	return dbQuery(sql, [id])
		.then((res) => {
			console.log(res.rows);
			return res.rows;
		})
		.catch((err) => {
			console.log(err);
		});
}
module.exports = {
	patientsGetAll,
	patientCreate,
	patientsGetId,
};
