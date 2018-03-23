import * as os from "os";
import { PokerHandComparatorApiController } from "./app/apicontrollers/PokerHandComparatorApiController";
import { ApiServer } from "./infrastructure/ApiServer";
import { IInitializable } from "./infrastructure/IInitializable";

const servers: IInitializable[] = new Array<IInitializable>();
servers.push(new ApiServer([
  new PokerHandComparatorApiController(),
]));

const initAll = async (server: IInitializable) => {
  console.log("%s - Initializing poker REST API...", server.name);
  await server.Initialize();
  console.log("%s - Poker REST API initialized", server.name);
};

servers.forEach(initAll);
