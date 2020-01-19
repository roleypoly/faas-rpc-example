// package: greeter
// file: greeter/greeter.proto

var greeter_greeter_pb = require("../greeter/greeter_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Greeter = (function () {
  function Greeter() {}
  Greeter.serviceName = "greeter.Greeter";
  return Greeter;
}());

Greeter.SayHello = {
  methodName: "SayHello",
  service: Greeter,
  requestStream: false,
  responseStream: false,
  requestType: greeter_greeter_pb.HelloRequest,
  responseType: greeter_greeter_pb.HelloReply
};

Greeter.SayHelloAgain = {
  methodName: "SayHelloAgain",
  service: Greeter,
  requestStream: false,
  responseStream: false,
  requestType: greeter_greeter_pb.HelloRequest,
  responseType: greeter_greeter_pb.HelloReply
};

exports.Greeter = Greeter;

function GreeterClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

GreeterClient.prototype.sayHello = function sayHello(requestMessage, metadata) {
  return new Promise((resolve, reject) => {
    grpc.unary(Greeter.SayHello, {
      request: requestMessage,
      host: this.serviceHost,
      metadata: metadata,
      transport: this.options.transport,
      debug: this.options.debug,
      onEnd: function (response) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          reject(err);
        } else {
          resolve(response.message);
        }
      }
    });
  });
};

GreeterClient.prototype.sayHelloAgain = function sayHelloAgain(requestMessage, metadata) {
  return new Promise((resolve, reject) => {
    grpc.unary(Greeter.SayHelloAgain, {
      request: requestMessage,
      host: this.serviceHost,
      metadata: metadata,
      transport: this.options.transport,
      debug: this.options.debug,
      onEnd: function (response) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          reject(err);
        } else {
          resolve(response.message);
        }
      }
    });
  });
};

exports.GreeterClient = GreeterClient;

