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
			range: sourceStart + rangeLength - 1,
		};
	});
});

const solutionOne = () => {
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
	const splitSeeds = [
		...new Set(
			seeds
				.flatMap((seed, index) => {
					if (index % 2 === 0) return;
					const start = seeds[index - 1];
					const finish = seeds[index - 1] + seed;
					return Array.from({ length: finish - start + 1 }, (_, a) => a + start);
				})
				.map(Number)
				.filter(Boolean)
		),
	];

	console.log({ seedTotal: splitSeeds.length });

	const locationsFromSeed = splitSeeds.map((seed) => {
		return parsedStages.reduce((curr, stage) => {
			const currStage = stage.find((stage) => stage.sourceStart <= curr && stage.range >= curr);
			if (!currStage) return curr;
			return currStage.destinationStart + (curr - currStage.sourceStart);
		}, seed);
	});

	return Math.min(...locationsFromSeed);
};

export const dayFiveAnswers = () => {
	return {
		solutionOne: solutionOne(),
		solutionTwo: solutionTwo(),
	};
};
