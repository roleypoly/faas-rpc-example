package function

import (
	"context"
	"strings"
	"testing"

	proto "github.com/roleypoly/faas-rpc-example/proto/greeter"
)

func TestSayHello(t *testing.T) {
	service := &GreeterService{}

	response, err := service.SayHello(context.TODO(), &proto.HelloRequest{
		Name: "Katie",
	})
	if err != nil {
		t.Error("it failed!", err)
	}

	if !strings.Contains(response.Message, "Katie") {
		t.Error("wrong message!")
	}
}
