import * as restify from "restify";
import { IApiController } from "./../app/apicontrollers/IApiController";
import { IInitializable } from "./IInitializable";

export class ApiServer implements IInitializable {

  public name: string = "ApiServer";

  public restifyServer?: restify.Server;

  constructor(
    public apiControllers: IApiController[],
  ) { }

  public Initialize(): Promise<any> {
    this.restifyServer = restify.createServer();
    this.restifyServer.use(restify.plugins.acceptParser(this.restifyServer.acceptable));
    this.restifyServer.use(restify.plugins.queryParser());
    this.restifyServer.use(restify.plugins.gzipResponse());
    this.restifyServer.use(restify.plugins.bodyParser());

    this.apiControllers.forEach((apiController) => {
      if (this.restifyServer !== undefined) {
        apiController.register(this.restifyServer);
      }
    });

    console.log("rest server starting...");

    return new Promise((resolve, reject) => {
      if (this.restifyServer !== undefined) {
        this.restifyServer.listen(process.env.api_port, () => {
          if (this.restifyServer !== undefined) {
            console.log("%s is online on %s", this.restifyServer.name, this.restifyServer.url);
          }
          resolve();
        });
      }

    });
  }

}
