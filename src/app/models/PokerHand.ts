import { PokerCard, PokerCardSuite, PokerCardValue } from "./PokerCard";
import { PokerCardDuplicate } from "./PokerCardDuplicate";

export enum PokerFigures {
    HIGHCARD = 1,
    PAIR,
    TWOPAIRS,
    THREEOFAKIND,
    STRAIGHT,
    FLUSH,
    FULLHOUSE,
    FOUROFAKIND,
    STRAIGHTFLUSH,
    ROYALFLUSH,
}

export class PokerHand {
    /**
     * The set of cards in the this.cards.
     * Always 5 cards
     */
    public cards: PokerCard[];
    /**
     * The best figure which can be found in the this.cards.
     */
    public bestFigure: PokerFigures;

    constructor(cardsString: string) {
        // explode into array and convert to poker cards
        this.cards = cardsString.split(" ").map((str) => new PokerCard(str));

        // order cards by rank
        this.cards.sort((a, b) => a.value - b.value);

        // find the bestFigure
        this.bestFigure = this.getBestFigure();
    }

    /**
     * The result of your poker hand compare can be one of these 3 options:
     * Win should return the integer `1`
     * Loss should return the integer `2`
     * Tie should return the integer `3`
     * Sidenote : would have prefered > 0 = WIN, < 0 = LOSE, 0 = tie
     * @param challengerHand opponent hand
     */
    public compareWith(challengerHand: PokerHand) {
        const scoreDifference = this.bestFigure - challengerHand.bestFigure;
        if (scoreDifference > 0) { return 1; }
        if (scoreDifference < 0) { return 2; }
        if (scoreDifference === 0) { return 3; }
    }
    private getBestFigure() {
        const duplicates = this.findCardsWithSameValues();

        const isStraight =
            this.cards[0].value === this.cards[1].value - 1
            && this.cards[0].value === this.cards[2].value - 2
            && this.cards[0].value === this.cards[3].value - 3
            && this.cards[0].value === this.cards[4].value - 4;

        const allWithSameSuite =
            (this.cards[0].suite === this.cards[1].suite)
            && (this.cards[0].suite === this.cards[2].suite)
            && (this.cards[0].suite === this.cards[3].suite)
            && (this.cards[0].suite === this.cards[4].suite);

        // We test figures by most "powerful" figures to least powerful figures
        // test ROYALFLUSH & STRAIGHTFLUSH
        if (isStraight && allWithSameSuite) {
            if (this.cards[0].value === PokerCardValue.TEN) {
                return PokerFigures.ROYALFLUSH;
            } else {
                return PokerFigures.STRAIGHTFLUSH;
            }
        }
        // test FOUROFAKIND
        if (duplicates.length === 1
            && duplicates[0].count === 4
            && duplicates[0].getSuite(PokerCardSuite.HEARTS)
            && duplicates[0].getSuite(PokerCardSuite.CLUBS)
            && duplicates[0].getSuite(PokerCardSuite.SPADES)
            && duplicates[0].getSuite(PokerCardSuite.DIAMONDS)) {
            return PokerFigures.FOUROFAKIND;
        }
        // test FULLHOUSE
        if (duplicates.length === 2 && (duplicates[0].count + duplicates[1].count) === 5) {
            return PokerFigures.FULLHOUSE;
        }
        // test STRAIGHT
        if (isStraight) {
            return PokerFigures.STRAIGHT;
        }
        // test FLUSH
        if (allWithSameSuite) {
            return PokerFigures.FLUSH;
        }
        // test THREEOFAKIND
        if (duplicates.length === 1 && duplicates[0].count >= 3) {
            return PokerFigures.THREEOFAKIND;
        }
        // test TWOPAIRS
        if (duplicates.length === 2 && (duplicates[0].count + duplicates[1].count) === 4) {
            return PokerFigures.TWOPAIRS;
        }
        // test PAIR
        if (duplicates.length >= 1 && duplicates[0].count >= 2) {
            return PokerFigures.PAIR;
        }
        return PokerFigures.HIGHCARD;
    }

    /**
     * Browse the game to find cards with same value.
     * For each set, record the count of cards and the figures which can be found in the set
     */
    private findCardsWithSameValues() {
        const duplicates: PokerCardDuplicate[] = [];
        const foo: { [index: string]: { message: string } } = {};
        for (let i = 0; i < 4; i++) {
            if (this.cards[i].value === this.cards[i + 1].value) {
                // If the duplicate is not saved yet, create one
                if (!duplicates[this.cards[i].value]) {
                    duplicates[this.cards[i].value] = new PokerCardDuplicate(this.cards[i].value);
                }

                duplicates[this.cards[i].value].count++;
                // Save card suites
                duplicates[this.cards[i].value].setSuite(this.cards[i].suite);
                duplicates[this.cards[i].value].setSuite(this.cards[i + 1].suite);
            }
        }

        // Make the indexes start from 0 to array size - 1 (previously was value => Duplicate)
        return duplicates.filter((item) => true);
    }

}
