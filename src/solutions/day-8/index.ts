import { readFile } from "../../helpers/readFile.helper";

const [directions, map] = readFile("day-8").split("\n\n");
const splitDirections = directions.split("");
const splitMap = map.split("\n");

interface Map {
	destination: string;
	directions: string[];
}

const mapTheMap = (currentMap: string[]) =>
	currentMap.map((line) => {
		const [destination, directions] = line.split(" = ");
		return { destination, directions: directions.replace(/[\(\)]/g, "").split(", ") };
	});

const getNextDestination = (currentDestination: string, instruction: string, map: Map[]): string => {
	const directionIndex = instruction === "R" ? 1 : 0;
	return map.find((destination) => destination.destination === currentDestination)!.directions[directionIndex]!;
};

const gcd = (a: number, b: number): number => {
	return b === 0 ? a : gcd(b, a % b);
};

const lcm = (a: number, b: number): number => {
	return (a * b) / gcd(a, b);
};

const findLCM = (numbers: number[]): number => {
	if (numbers.length < 2) {
		throw new Error("At least two numbers are required");
	}

	let result = numbers[0];

	for (let i = 1; i < numbers.length; i++) {
		result = lcm(result, numbers[i]);
	}

	return result;
};

const solutionOne = () => {
	const map = mapTheMap(splitMap);
	const startDestination = "AAA";
	const finalDestination = "ZZZ";

	let stepCount = 0;
	let nextDestination = "";
	let destinationFound = false;

	while (!destinationFound) {
		splitDirections.forEach((direction) => {
			const currentDest = stepCount === 0 ? startDestination : nextDestination;
			nextDestination = getNextDestination(currentDest, direction, map);
			stepCount++;

			if (nextDestination === finalDestination) {
				destinationFound = true;
			}
		});
	}

	return stepCount;
};

const solutionTwo = () => {
	const map = mapTheMap(splitMap);
	const nodes = map.filter((direction) => /A$/.test(direction.destination)).map((direction) => direction.destination);

	const stepsToEnd: number[] = [];

	nodes.forEach((node) => {
		let stepCount = 0;
		let nextDestination = "";

		while (!/Z$/.test(nextDestination)) {
			splitDirections.forEach((direction) => {
				const currentDest = stepCount === 0 ? node : nextDestination;
				nextDestination = getNextDestination(currentDest, direction, map);
				stepCount++;
			});
		}

		stepsToEnd.push(stepCount);
	});

	return findLCM(stepsToEnd);
};

export const dayEightAnswers = () => {
	return {
		solutionOne: solutionOne(),
		solutionTwo: solutionTwo(),
	};
};
