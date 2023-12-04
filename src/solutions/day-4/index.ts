import { readAndSplitFile } from "../../helpers/readFile.helper";

const games = readAndSplitFile("day-four").split("\n");

const solutionOne = () => {
	return games.reduce((acc, curr) => {
		const game = curr.split(":")[1];
		const [winningNumbers, drawnNumbers] = game.split("|").map((item) => item.split(" ").filter(Boolean));
		const winnersCount = drawnNumbers.filter((number) => winningNumbers.includes(number)).length;

		if (winnersCount === 0) return acc;
		if (winnersCount === 1) return acc + 1;
		return acc + Math.pow(2, winnersCount - 1);
	}, 0);
};

const solutionTwo = () => {
	return "todo";
};

export const dayFourAnswers = () => {
	return {
		solutionOne: solutionOne(),
		solutionTwo: solutionTwo(),
	};
};
