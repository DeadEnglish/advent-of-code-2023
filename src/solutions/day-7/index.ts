import { readAndSplitFile } from "../../helpers/readFile.helper";

interface Hand {
	cardValues: number[];
	bid: number;
	rank: number;
}

const cards = readAndSplitFile("day-seven").split("\n");

const cardOrder = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];

const createHandRank = (cards: string): number => {
	const cardCount: { [card: string]: number } = {};

	cards.split("").forEach((card) => {
		cardCount[card] = (cardCount[card] || 0) + 1;
	});

	const orderedCount = Object.values(cardCount).sort((a, b) => b - a);

	return orderedCount[0] * 5 + (orderedCount[1] || 0);
};

const parseHand = (cards: string, bid: string): Hand => ({
	cardValues: cards.split("").map((card) => cardOrder.indexOf(card)),
	bid: Number(bid),
	rank: createHandRank(cards),
});

const sortHands = (cardA: Hand, cardB: Hand) => {
	if (cardA.rank !== cardB.rank) return cardA.rank - cardB.rank;

	for (let i = 0; i <= cardA.cardValues.length; i++) {
		if (cardA.cardValues[i] !== cardB.cardValues[i]) {
			return cardA.cardValues[i] - cardB.cardValues[i];
		}
	}

	return 0;
};

const solutionOne = () => {
	return cards
		.map((card) => {
			const [cards, bid] = card.split(" ");
			return parseHand(cards, bid);
		})
		.sort(sortHands)
		.reduce((acc, curr, currIndex) => acc + curr.bid * (currIndex + 1), 0);
};

const solutionTwo = () => {
	return "todo";
};

export const daySevenAnswers = () => {
	return {
		solutionOne: solutionOne(),
		solutionTwo: solutionTwo(),
	};
};
