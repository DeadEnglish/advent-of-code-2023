import { readAndSplitFile } from "../../helpers/readFile.helper";

const almanac = readAndSplitFile("day-five").split("\n\n");

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
			rangeLength,
		};
	});
});

const solutionOne = () => {
	const locationsFromSeed = seeds.map((seed) => {
		return parsedStages.reduce((curr, stage) => {
			const currStage = stage.find(
				(stage) => stage.sourceStart <= curr && stage.sourceStart + stage.rangeLength >= curr
			);
			if (!currStage) return curr;
			return currStage.destinationStart + (curr - currStage.sourceStart);
		}, seed);
	});

	return Math.min(...locationsFromSeed);
};
const solutionTwo = () => {
	const seedRanges = seeds
		.map((seed, index) => {
			if ((index + 1) % 2 === 0) return;
			return [seed, seeds[index + 1]];
		})
		.filter(Boolean) as number[][];

	const checkSeed = (seed: number) => seedRanges.some(([start, end]) => seed >= start && seed <= start + end);

	const isPotentialSeed = (location: number) => {
		return parsedStages
			.slice()
			.reverse()
			.reduce((curr, stage) => {
				const currStage = stage.find(
					(stage) => stage.destinationStart <= curr && stage.destinationStart + stage.rangeLength > curr
				);
				if (!currStage) return curr;
				return currStage.sourceStart + (curr - currStage.destinationStart);
			}, location);
	};

	let location = 0;
	let loopCount = 0;

	while (location === 0) {
		const seed = isPotentialSeed(loopCount);
		if (!seed) continue;

		if (checkSeed(seed)) {
			location = loopCount;
			break;
		}
		loopCount++;
	}
	return location;
};

export const dayFiveAnswers = () => {
	return {
		solutionOne: solutionOne(),
		solutionTwo: solutionTwo(),
	};
};
