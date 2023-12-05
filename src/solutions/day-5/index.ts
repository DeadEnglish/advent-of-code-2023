import { readAndSplitFile } from "../../helpers/readFile.helper";

const almanac = readAndSplitFile("day-five").split("\n\n");

const solutionOne = () => {
	const seeds = almanac[0].split(":")[1].trim().split(" ").map(Number);
	const stages = almanac.slice(1).map((stage) =>
		stage
			.split("\n")
			.slice(1)
			.map((line) => line.split(" ").map(Number))
	);

	const parsedStages = stages.map((stage) => {
		return stage.map((line) => {
			const [destinationStart, sourceStart, rangeLength] = line;
			return {
				destinationStart,
				sourceStart,
				range: sourceStart + rangeLength - 1,
			};
		});
	});

	const locationsFromSeed = seeds.map((seed) => {
		return parsedStages.reduce((curr, stage) => {
			const currStage = stage.find((stage) => stage.sourceStart <= curr && stage.range >= curr);
			if (!currStage) return curr;
			return currStage.destinationStart + (curr - currStage.sourceStart);
		}, seed);
	});

	return Math.min(...locationsFromSeed);
};
const solutionTwo = () => {
	return "todo";
};

export const dayFiveAnswers = () => {
	return {
		solutionOne: solutionOne(),
		solutionTwo: solutionTwo(),
	};
};
