import { readAndSplitFile } from "../../helpers/readFile.helper";

type Colours = "red" | "green" | "blue";

const GAME_REGEX = new RegExp(/Game [0-9]{1,3}:/);

const maxCubes: Record<Colours, number> = {
	red: 12,
	green: 13,
	blue: 14,
};

const gameLines = readAndSplitFile("day-two").split("\n");

const invalidGame = (draws: string[][]) =>
	draws.some((draw) =>
		draw.some((cube) => {
			const [number, colour] = cube.trim().split(" ");
			if (parseInt(number) > maxCubes[colour as Colours]) {
				return true;
			}
		})
	);

const getAllDrawsOfAColour = (draws: string[][], colour: Colours) =>
	draws.flatMap((draw) =>
		draw
			.filter((cube) => cube.trim().split(" ")[1] === colour)
			.flatMap((cube) => parseInt(cube.trim().split(" ")[0]))
	);

const solutionOne = () => {
	let validHandsInValidGames: number = 0;

	gameLines.forEach((line, index) => {
		const game = line.split(GAME_REGEX)[1];
		const sets = game.split(";");
		const draws = sets.map((set) => set.trim().split(","));

		if (invalidGame(draws)) return;

		validHandsInValidGames += index + 1;
	});

	return validHandsInValidGames;
};

const solutionTwo = () => {
	let totalCubePower: number = 0;

	gameLines.forEach((line, index) => {
		const game = line.split(GAME_REGEX)[1];
		const sets = game.split(";");
		const draws = sets.map((set) => set.trim().split(","));

		const maxRed = Math.max(...getAllDrawsOfAColour(draws, "red"));
		let maxGreen = Math.max(...getAllDrawsOfAColour(draws, "green"));
		let maxBlue = Math.max(...getAllDrawsOfAColour(draws, "blue"));

		totalCubePower += maxRed * maxGreen * maxBlue;
	});

	return totalCubePower;
};

export const dayTwoAnswers = () => {
	return {
		solutionOne: solutionOne(),
		solutionTwo: solutionTwo(),
	};
};
