import * as http from"http";

class Main {
    constructor() {
      // set up HTTP server
      const server: http.Server = http.createServer(
          (request: http.IncomingMessage, response: http.ServerResponse) =>
              this.requestHandler(request, response));
      server.listen('5000');
    }

    private requestHandler(request: http.IncomingMessage,
                           response: http.ServerResponse): void {
      response.end('Hello world');
    }
}

const main = new Main();