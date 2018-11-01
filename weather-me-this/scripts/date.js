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

const date2 = 1541217600

var dateTwo = new Date(date2 * 1000).toString().split(' ');

const dayTwoDay = dateTwo[0]; // MON
const dayTwoMonth = dateTwo[1] + " " + dateTwo[2]; // MONTH + DAY


// console.log(dayTwoDay);
// console.log(dayTwoMonth);




/// TEST DATE & DAY FUNCTION


const weather = new Map();

weather.set('day1DateRaw', 1541131200 );
weather.set('day2DateRaw', 1541217600);
weather.set('day3DateRaw', 1541304000);
weather.set('day4DateRaw', 1541394000);
weather.set('day5DateRaw', 1541480400);

function fetchModalDates() {
	for (let i = 0; i <= 5; ++i) {
		const date = weather.get(`day${i}DateRaw`);
		const dateString = new Date(date * 1000).toString().split(' ');
		const dateDay = dateString[0]; // MON
		const dateDate = dateString[1] + " " + dateString[2]; // MONTH + DAY
		
		weather.set(`day${i}Day`, dateDay);
		weather.set(`day${i}Date`, dateDate );
	}
}

fetchModalDates();

console.log(weather);