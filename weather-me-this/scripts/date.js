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


const date = new Date();

getTime();

console.log(dateInfo.timeNow);

dateInfo.todayDate = date.toDateString();

console.log(dateInfo.todayDate);


const today = new Date();

const todayDay = today.getDate();

console.log(todayDay);

const tmw = todayDay + 1;

const tmwDay = today.setDate(tmw);

