import { PokerCardSuite, PokerCardValue } from "./PokerCard";

export class PokerCardDuplicate {
    public value: PokerCardValue;
    public count: number;
    private suites: {
        [index: string]: boolean,
    };

    constructor(value: PokerCardValue) {
        this.value = value;
        this.count = 1;
        // Set all suites to false
        this.suites = {};
        for (const key in PokerCardSuite) {
            if (PokerCardSuite.hasOwnProperty(key)) {
                this.suites[key] = false;
            }
        }
    }

    public setSuite(suite: PokerCardSuite) {
        this.suites[suite] = true;
    }

    public getSuite(suite: PokerCardSuite) {
        return this.suites[suite];
    }
}
