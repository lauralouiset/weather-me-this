const dateInfo = {
	day1: "",
	day2: "",
	day3: "",
	day4: "",
	day5: "",
}


const getTime = function() {

	const date = new Date();
	let hours = date.getHours();
	const mins = date.getMinutes();

	AMorPM = (hrs) => {
		if (hrs >= 12) {
			hours = (hrs - 12);
			this.AMorPM = "PM";
		} else {
			this.AMorPM = "AM";
		}
	}

	AMorPM(hours);
	dateInfo.timeNow = `${hours}:${mins} ${AMorPM}`
}


getTime();

console.log(dateInfo.timeNow);

var tdy = new Date();
var tomorrow = new Date(tdy.getTime() + (24 * 60 * 60 * 1000));


console.log(tdy.getUTCHours());

console.log(tomorrow);