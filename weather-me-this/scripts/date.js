svg = {
	moonphases : 'moonphasesvg',
	otherweather : 'otherweathersvg'
}

weather = new Map();

weather.set(`day1icon`, `moonphases`);
weather.set(`day2icon`, `otherweather`)

weather.set(`day1svg`, svg.moonphases);
weather.set(`day2svg`, svg.otherweather);

console.log(weather);


const outputWeather = () => {

			for (let i = 1; i <= 2; ++i){
			const icon = 	weather.get(`day${i}Icon`);
			this.weather.set(`day${i}SVG`, svg[icon]);	
			}

}
