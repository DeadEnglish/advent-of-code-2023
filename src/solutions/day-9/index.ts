import { readFile } from "../../helpers/readFile.helper";

const lines = readFile("day-9").split("\n");

const mapLines = lines.map((line) => {
	return line.split(" ").map(Number);
});

const findDifference = (numbers: number[]): number[] => {
	return numbers
		.map((number, index) => {
			if (index <= numbers.length) {
				return numbers[index + 1] - number;
			}
		})
		.filter((num) => !isNaN(num!)) as number[];
};

const findNextSequenceValue = (numbers: number[]): number => {
	if (numbers.every((num) => num === numbers[0])) {
		return numbers[0];
	}

	const difference = findDifference(numbers);
	return numbers[numbers.length - 1] + findNextSequenceValue(difference);
};

const solutionOne = () => {
	return mapLines.map(findNextSequenceValue).reduce((acc, curr) => acc + curr, 0);
};

const solutionTwo = () => {
	return mapLines
		.map((line) => line.reverse())
		.map(findNextSequenceValue)
		.reduce((acc, curr) => acc + curr, 0);
};

export const dayNineAnswers = () => {
	return {
		solutionOne: solutionOne(),
		solutionTwo: solutionTwo(),
	};
};
