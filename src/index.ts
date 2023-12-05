import { dayOneAnswers } from "./solutions/day-1/index";
import { dayTwoAnswers } from "./solutions/day-2/index";
import { dayThreeAnswers } from "./solutions/day-3/index";
import { dayFourAnswers } from "./solutions/day-4/index";
import { dayFiveAnswers } from "./solutions/day-5/index";

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
	{
		Day: 3,
		...dayThreeAnswers(),
	},
	{
		Day: 4,
		...dayFourAnswers(),
	},
	{
		Day: 5,
		...dayFiveAnswers(),
	},
];

console.table(solutions);
