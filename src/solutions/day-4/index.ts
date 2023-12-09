import { readFile } from "../../helpers/readFile.helper";

const games = readFile("day-4").split("\n");

const getWinningAndDrawnNumbers = (gameString: string) => {
	const game = gameString.split(":")[1];
	const [winningNumbers, drawnNumbers] = game.split("|").map((item) => item.split(" ").filter(Boolean));

	return { winningNumbers, drawnNumbers, playCount: 1 };
};

const solutionOne = () => {
	return games.reduce((acc, curr) => {
		const { winningNumbers, drawnNumbers } = getWinningAndDrawnNumbers(curr);
		const winnersCount = drawnNumbers.filter((number) => winningNumbers.includes(number)).length;
		if (winnersCount === 0) return acc;
		if (winnersCount === 1) return acc + 1;
		return acc + Math.pow(2, winnersCount - 1);
	}, 0);
};

const solutionTwo = () => {
	const gamesWithWins = games.map((game) => getWinningAndDrawnNumbers(game));

	gamesWithWins.forEach((game, index) => {
		const { winningNumbers, drawnNumbers, playCount } = game;
		const winnersCount = drawnNumbers.filter((number) => winningNumbers.includes(number)).length;

		if (winnersCount === 0) return;

		Array.from({ length: winnersCount }).forEach((_, wins) => {
			const cardIndex = index + wins + 1;
			if (gamesWithWins[cardIndex]) gamesWithWins[cardIndex].playCount += playCount;
		});
	});

	return gamesWithWins.reduce((acc, curr) => acc + curr.playCount, 0);
};

export const dayFourAnswers = () => {
	return {
		solutionOne: solutionOne(),
		solutionTwo: solutionTwo(),
	};
};
