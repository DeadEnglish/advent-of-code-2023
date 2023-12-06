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
	return "todo";
};

export const daySixAnswers = () => {
	return {
		solutionOne: solutionOne(),
		solutionTwo: solutionTwo(),
	};
};
