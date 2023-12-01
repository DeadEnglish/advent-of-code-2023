import {
	dayOneSolutionOne,
	dayOneSolutionTwo,
} from "./solutions/day-one/index";

interface Solution {
	Day: number;
	"Solution One": string | number | null;
	"Solution Two": string | number | null;
}

const solutions: Solution[] = [
	{
		Day: 1,
		"Solution One": dayOneSolutionOne(),
		"Solution Two": dayOneSolutionTwo(),
	},
	// {
	// 	Day: 2,
	// 	"Solution One": dayOneSolutionOne(),
	// 	"Solution Two": dayOneSolutionTwo(),
	// },
	// {
	// 	Day: 3,
	// 	"Solution One": dayOneSolutionOne(),
	// 	"Solution Two": dayOneSolutionTwo(),
	// },
	// {
	// 	Day: 4,
	// 	"Solution One": dayOneSolutionOne(),
	// 	"Solution Two": dayOneSolutionTwo(),
	// },
];

console.table(solutions);
