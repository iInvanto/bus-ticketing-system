import Express, { Handler, json, urlencoded } from "express";
import http, { Server } from "http";
import cors from "cors";
import { ConfigImpl } from "./infrastructure/Config";
import https from "https";
import { v1Controller } from "./v1";

interface RouteDefinitions {
  [path: string]: Handler;
}

class ExpressServer {
  configs = new ConfigImpl();

  private routes(): RouteDefinitions {
    return {
      "/api": v1Controller(),
    };
  }

  private async bootstrap(routes: RouteDefinitions) {
    const app = Express();

    // Apply middleware
    app.use(json(this.configs.bodyParserConfig));
    app.use(cors(this.configs.corsConfig));
    app.use(urlencoded(this.configs.urlEncodedConfig));

    // Apply routes
    Object.keys(routes).forEach((path) => app.use(path, routes[path]));

    return app;
  }

  async start(): Promise<Server> {
    const app = await this.bootstrap(this.routes());

    const { appConfig } = this.configs;

    const { env, host, port, ssl } = appConfig;

    const onReady = () => {
      console.info(
        `server listening on http${
          ssl.enabled ? "s" : ""
        }://${host}:${port}, in ${env}`
      );
    };

    if (ssl.enabled) {
      const { key, cert } = ssl;

      if (!key || !cert) {
        throw new Error(
          `Application has SSL enabled, but no key or cert have been provided!`
        );
      }

      return https.createServer({ key, cert }, app).listen(port, host, onReady);
    }

    return http.createServer(app).listen(port, onReady);
  }
}

const server = new ExpressServer();

server.start();
