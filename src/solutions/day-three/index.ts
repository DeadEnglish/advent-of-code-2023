import { readAndSplitFile } from "../../helpers/readFile.helper";

const adjacentCoords = [
	[0, -1],
	[0, 1],
	[-1, 0],
	[1, 0],
	[-1, -1],
	[-1, 1],
	[1, -1],
	[1, 1],
];
const digitRegex = new RegExp(/[0-9]/);

const isDigit = (char: string) => digitRegex.test(char);
const isSymbol = (char: string) => char !== "." && !isDigit(char);
const isGear = (char: string) => char === "*";

const schematic = readAndSplitFile("day-three").split("\n");

const solutionOne = () => {
	let schematicTotal = 0;

	for (let i = 0; i < schematic.length; i++) {
		const row = schematic[i];
		let hasAdjacentSymbol = false;
		let numberAsString = "";

		for (let rowIndex = 0; rowIndex < row.length; rowIndex++) {
			const char = row[rowIndex];
			if (isDigit(char)) {
				numberAsString = numberAsString + char;

				const adjacentRows = adjacentCoords.map(([x, y]) => {
					const adjacentRow = schematic[i + y];
					if (!adjacentRow) return;
					return adjacentRow[rowIndex + x];
				});

				const adjacentSymbols = adjacentRows.filter(
					(adj) => adj && isSymbol(adj)
				).length;

				if (adjacentSymbols !== 0) {
					hasAdjacentSymbol = true;
				}

				if (rowIndex === row.length - 1) {
					if (hasAdjacentSymbol) {
						schematicTotal += parseInt(numberAsString);
					}
				}
			} else {
				if (hasAdjacentSymbol) {
					schematicTotal += parseInt(numberAsString);
				}
				hasAdjacentSymbol = false;
				numberAsString = "";
			}
		}
	}

	return schematicTotal;
};

interface NumberCoord {
	number: string;
	start: number;
	end: number;
	row: number;
}

interface SymbolCoord {
	row: number;
	index: number;
}

export const createCoordinates = (rows: string[]) => {
	const numbers: NumberCoord[] = [];
	const symbols: SymbolCoord[] = [];

	for (let i = 0; i < rows.length; i++) {
		const row = rows[i];
		for (let charIndex = 0; charIndex < row.length; charIndex++) {
			const char = row[charIndex];
			if (char === ".") continue;

			if (isDigit(char)) {
				const currentNumberIndex = numbers.findIndex(
					({ end, row }) => i === row && end === charIndex - 1
				);
				if (currentNumberIndex > -1) {
					numbers[currentNumberIndex].end = charIndex;

					numbers[currentNumberIndex].number =
						numbers[currentNumberIndex].number + char;
				} else {
					numbers.push({
						number: char,
						start: charIndex,
						end: charIndex,
						row: i,
					});
				}
			}

			if (isGear(char)) {
				symbols.push({
					index: charIndex,
					row: i,
				});
			}
		}
	}

	return { numbers, symbols };
};

const solutionTwo = () => {
	// Get all the numbers with co-ordinates & row
	// Get all gear co-ordinates & row
	// get all adjacent co-ordinates to gear
	// if match with number co-ordinates, use that number

	const { numbers, symbols } = createCoordinates(schematic);

	let gearRatio = 0;

	symbols.forEach((symCoord) => {
		const { index, row } = symCoord;
		const adjacentNumbers = numbers.filter(
			(numCoord) =>
				numCoord.row >= row - 1 &&
				numCoord.row <= row + 1 &&
				numCoord.start - 1 <= index &&
				numCoord.end + 1 >= index
		);

		if (adjacentNumbers.length === 2) {
			gearRatio +=
				parseInt(adjacentNumbers[0].number) *
				parseInt(adjacentNumbers[1].number);
		}
	}, 0);

	return gearRatio;
};

export const dayThreeAnswers = () => {
	return {
		solutionOne: solutionOne(),
		solutionTwo: solutionTwo(),
	};
};
