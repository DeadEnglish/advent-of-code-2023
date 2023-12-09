import { readFile } from "../../helpers/readFile.helper";

interface Hand {
	cardValues: number[];
	bid: number;
	rank: number;
}

const cards = readFile("day-7").split("\n");

const cardOrder = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
const part2CardOrder = ["J", "2", "3", "4", "5", "6", "7", "8", "9", "T", "Q", "K", "A"];

const createHandRank =
	(isPart2: boolean = false) =>
	(cards: string): number => {
		const cardCount: { [card: string]: number } = {};

		let joker = 0;
		cards.split("").forEach((card) => {
			cardCount[card] = (cardCount[card] || 0) + 1;
		});

		if (isPart2) {
			joker = cardCount["J"] || 0;
			delete cardCount["J"];
		}

		const orderedCount = Object.values(cardCount).sort((a, b) => b - a);

		return ((orderedCount[0] || 0) + joker) * 5 + (orderedCount[1] || 0);
	};

const parseHand =
	(isPart2: boolean = false) =>
	(cards: string, bid: string): Hand => ({
		cardValues: cards.split("").map((card) => (isPart2 ? part2CardOrder.indexOf(card) : cardOrder.indexOf(card))),
		bid: Number(bid),
		rank: createHandRank(isPart2)(cards),
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
			return parseHand()(cards, bid);
		})
		.sort(sortHands)
		.reduce((acc, curr, currIndex) => acc + curr.bid * (currIndex + 1), 0);
};

const solutionTwo = () => {
	return cards
		.map((card) => {
			const [cards, bid] = card.split(" ");
			return parseHand(true)(cards, bid);
		})
		.sort(sortHands)
		.reduce((acc, curr, currIndex) => acc + curr.bid * (currIndex + 1), 0);
};

export const daySevenAnswers = () => {
	return {
		solutionOne: solutionOne(),
		solutionTwo: solutionTwo(),
	};
};
