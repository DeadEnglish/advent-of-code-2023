import { dayOneAnswers } from "./solutions/day-1/index";
import { dayTwoAnswers } from "./solutions/day-2/index";
import { dayThreeAnswers } from "./solutions/day-3/index";
import { dayFourAnswers } from "./solutions/day-4/index";
import { daySixAnswers } from "./solutions/day-6/index";
import { daySevenAnswers } from "./solutions/day-7/index";

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
		solutionOne: "very un optimized",
		solutionTwo: "very un optimized",
	},
	{
		Day: 6,
		...daySixAnswers(),
	},
	{
		Day: 7,
		...daySevenAnswers(),
	},
];

console.table(solutions);
