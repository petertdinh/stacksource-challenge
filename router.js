'use strict';

module.exports = (app) => {
	const zipCodes = {};

	app.get('/', (req, res) => {
		res.send(
			`Welcome to my ZIP code API, built with NodeJS. All commands are done via endpoints (/insert/#, /delete/#, /has/#, /display)`
			);
	});

	app.get('/insert/*', (req, res) => {
		const zip = req.params[0];
		//regex to check that all characters are numbers
		if (/^\d+$/.test(zip) && zip.length === 5) {
			zipCodes[zip] = true;
			res.send(`${zip} has been successfully added!`);
		} else {
			res.send(`You didn't enter a valid ZIP code, womp. Try again.`);
		}
	});

	app.get('/delete/*', (req, res) => {
		delete zipCodes[req.params[0]];
	});

	app.get('/has/*', (req, res) => {
		if(zipCodes[req.params[0]]) {
			res.send(true);
		} else {
			res.send(false);
		}
	});

	app.get('/display', (req, res) => {
		const zips = Object.keys(zipCodes).map((code) => {
			return Number(code);
		}).sort();
		const display = [];
		//to group the zip codes together
		for(let i = 0; i < zips.length; i++) {
				if(zips[i] === zips[i+1] - 1 && zips[i] === zips[i+2] - 2) {
					display.push(String(zips[i]));
					display.push('-');
					for(let j = i + 1; j < zips.length; j++) {
						if(zips[j] !== zips[j-1] + 1) {
							display.push(String(zips[j-1]));
							i = j - 1;
							break;
						}
					}
				} else {
					display.push(zips[i]);
				}
		}
		let displayString = '';
		//to give it back to the user in a readable string
		for(let i = 0; i < display.length; i++) {
			if(display[i+1] === '-') {
				//checking to see if a comma needs to be placed
				i + 2 !== display.length - 1 ? displayString += ` ${display[i]}-${display[i+2]},` : displayString += `${display[i]}-${display[i+2]}`
				i += 2;
			} else {
				i !== display.length - 1 ? displayString += ` ${display[i]},` : displayString += ` ${display[i]}`
			}
		}
		res.send(displayString);
	});
}
