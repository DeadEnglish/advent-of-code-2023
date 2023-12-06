import { readAndSplitFile } from "../../helpers/readFile.helper";

const races = readAndSplitFile("day-six").split("\n");
const times = races[0].split(":")[1].split(/\D+/).filter(Boolean).map(Number);
const distance = races[1].split(":")[1].split(/\D+/).filter(Boolean).map(Number);

const solutionOne = () => {
	return times.reduce((acc, curr, currIndex) => {
		let canWin = 0;
		for (let i = 0; i < curr; i++) {
			if (i === 0) continue;
			const travelSpeed = 1 * i;
			const timeRemaining = curr - i;
			if (travelSpeed * timeRemaining > distance[currIndex]) {
				canWin++;
			}
		}
		return acc * canWin;
	}, 1);
};

const solutionTwo = () => {
	const totalTime = Number(
		races[0]
			.split(":")[1]
			.split(/\D+/)
			.filter(Boolean)
			.reduce((acc, curr) => acc + curr, "")
	);
	const totalDistance = Number(
		races[1]
			.split(":")[1]
			.split(/\D+/)
			.filter(Boolean)
			.reduce((acc, curr) => acc + curr, "")
	);

	let canWin = 0;
	for (let i = 0; i < totalTime; i++) {
		if (i === 0) continue;
		const travelSpeed = 1 * i;
		const timeRemaining = totalTime - i;
		if (travelSpeed * timeRemaining > totalDistance) {
			canWin++;
		}
	}

	return canWin;
};

export const daySixAnswers = () => {
	return {
		solutionOne: solutionOne(),
		solutionTwo: solutionTwo(),
	};
};
