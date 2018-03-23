import * as restify from "restify";
import { PokerFigures, PokerHand } from "../models/PokerHand";
import { IApiController } from "./IApiController";

export class PokerHandComparatorApiController implements IApiController {
  public register(server: restify.Server): void {

    // expose API end POST pokerhand
    server.post("/pokerhand", (req, res, next) => {

      console.log(req.params);

      /**
       * Check request pattern
       * The characteristics of the string of cards are:
       * A space is used as card seperator
       * Each card consists of two characters
       * The first character is the value of the card, valid characters are: `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `T`(en), `J`(ack), `Q`(ueen), `K`(ing), `A`(ce)
       * The second character represents the suit, valid characters are: `S`(pades), `H`(earts), `D`(iamonds), `C`(lubs)
       */
      const handRegex = /([2-9TJQKA][SHDC]\s*){5}/i;
      if (req.body.hand1 === undefined || req.body.hand2 === undefined || !handRegex.test(req.body.hand1) || !handRegex.test(req.body.hand2)) {
        res.send(400,
          {
            message: "Please provide a hand1 and hand2 parameters in your request.\
          The characteristics of the string of cards are:\
          A space is used as card seperator\
          Each card consists of two characters\
          The first character is the value of the card, valid characters are: `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `T`(en), `J`(ack), `Q`(ueen), `K`(ing), `A`(ce)\
          The second character represents the suit, valid characters are: `S`(pades), `H`(earts), `D`(iamonds), `C`(lubs)",
          });
        return next();
      }

      // Create the two hand objects
      const hand1 = new PokerHand(req.body.hand1);
      const hand2 = new PokerHand(req.body.hand2);
      const result = hand1.compareWith(hand2);
      let message = "";
      switch (result) {
        case 1:
          message = "Hand 1 won";
          break;
        case 2:
          message = "Hand 2 won";
          break;
        case 3:
          message = "Tie";
          break;
      }

      res.send(
        {
          hand1Figure: PokerFigures[hand1.bestFigure],
          hand2Figure: PokerFigures[hand2.bestFigure],
          message,
          result,
        },
      );

      next();
    });
  }
}
