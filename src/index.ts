import { dayOneAnswers } from "./solutions/day-one/index";
import { dayTwoAnswers } from "./solutions/day-two/index";

interface Solution {
	Day: number;
	solutionOne: string | number | null;
	solutionTwo: string | number | null;
}

const solutions: Solution[] = [
	{
		Day: 1,
		...dayOneAnswers(),
	},
	{
		Day: 2,
		...dayTwoAnswers(),
	},
	// {
	// 	Day: 3,
	// ...dayThreeAnswers(),
	// },
	// {
	// 	Day: 4,
	// 	"Solution One": dayOneSolutionOne(),
	// 	"Solution Two": dayOneSolutionTwo(),
	// },
];

console.table(solutions);
