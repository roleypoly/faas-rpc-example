package function

import (
	"context"
	"fmt"

	proto "github.com/roleypoly/faas-rpc-example/proto/greeter"
	"google.golang.org/grpc"
)

// GreeterService is a partial implementation of a full Greeter.
type GreeterService struct {
	proto.UnimplementedGreeterServer // important details since we only create one function total.
}

// Register adds the function/service to the grpc server.
func Register(server *grpc.Server) {
	proto.RegisterGreeterServer(server, &GreeterService{})
}

// SayHelloAgain says hello... again!
func (*GreeterService) SayHelloAgain(ctx context.Context, req *proto.HelloRequest) (*proto.HelloReply, error) {
	return &proto.HelloReply{
		Message: fmt.Sprintf("hello again, %s! you're really cool!", req.Name),
	}, nil
}
