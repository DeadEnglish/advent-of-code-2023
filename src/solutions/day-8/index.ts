import { readAndSplitFile } from "../../helpers/readFile.helper";

const [directions, map] = readAndSplitFile("day-eight").split("\n\n");
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

	let stepCount = 0;
	let destinationFound = false;

	// can't force those
	while (!destinationFound) {
		splitDirections.forEach((direction) => {
			nodes.forEach((node, index) => {
				const nextNode = getNextDestination(node, direction, map);
				nodes[index] = nextNode;
			});
			stepCount++;

			if (nodes.every((node) => /Z$/.test(node))) {
				destinationFound = true;
			}
		});
	}

	return stepCount;
};

export const dayEightAnswers = () => {
	return {
		solutionOne: "todo",
		solutionTwo: solutionTwo(),
	};
};
