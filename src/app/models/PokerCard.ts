export enum PokerCardSuite {
    SPADES, HEARTS, DIAMONDS, CLUBS,
}

export enum PokerCardValue {
    TWO = 2, THREE, FOUR, FIVE, SIX, SEVEN, HEIGHT, NINE, TEN, JACK, QUEEN, KING, ACE,
}

export class PokerCard {
    public suite: PokerCardSuite;
    public value: PokerCardValue;

    constructor(cardString: string) {
        const valueString = cardString.charAt(0);
        const suiteString = cardString.charAt(1);

        switch (suiteString) {
            case "S": {
               this.suite = PokerCardSuite.SPADES;
               break;
            }
            case "H": {
                this.suite = PokerCardSuite.HEARTS;
                break;
             }
             case "D": {
                this.suite = PokerCardSuite.DIAMONDS;
                break;
             }
             default: {
                this.suite = PokerCardSuite.CLUBS;
                break;
             }
         }

        switch (valueString) {
            case "T": {
               this.value = PokerCardValue.TEN;
               break;
            }
            case "J": {
               this.value = PokerCardValue.JACK;
               break;
            }
            case "Q": {
               this.value = PokerCardValue.QUEEN;
               break;
            }
            case "K": {
               this.value = PokerCardValue.KING;
               break;
            }
            case "A": {
               this.value = PokerCardValue.ACE;
               break;
            }
            default: {
                // conversion to Integer
                this.value = +valueString;
                break;
            }
         }
    }
}
