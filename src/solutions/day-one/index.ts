import { readAndSplitFile } from "../../helpers/readFile.helper";

const numberMap: { [key: string]: number } = {
	twone: 21,
	sevenine: 79,
	oneight: 18,
	threeight: 38,
	nineight: 98,
	fiveight: 58,
	eighthree: 83,
	eightwo: 82,
	one: 1,
	two: 2,
	three: 3,
	four: 4,
	five: 5,
	six: 6,
	seven: 7,
	eight: 8,
	nine: 9,
};

const getCalibration = (lines: string[]) => {
	return lines
		.map((line) => {
			const handleFind = (val: string) => !isNaN(parseInt(val));

			const firstNum = line.split("").find(handleFind);

			const lastNum = line.split("").reverse().find(handleFind);

			if (!firstNum || !lastNum) {
				throw new Error("No numbers found");
			}

			return parseInt(firstNum + lastNum);
		})
		.reduce((acc, curr) => acc + curr, 0);
};

export const dayOneSolutionOne = (): number => {
	const calibrationLines = readAndSplitFile("day-one").split("\n");

	return getCalibration(calibrationLines);
};

export const dayOneSolutionTwo = (): number | string => {
	let calibrationString = readAndSplitFile("day-one");

	for (const [key, value] of Object.entries(numberMap)) {
		calibrationString = calibrationString.replaceAll(key, value.toString());
	}

	return getCalibration(calibrationString.split("\n"));
};
