import React from 'react';
import { GreeterClient, HelloRequest, HelloReply } from '@rpc/greeter';

const greeter = new GreeterClient("http://localhost:8081")

const App: React.FC = () => {
  const [ timesPressed, setTimesPressed ] = React.useState(0);
  const [ message, setMessage ] = React.useState("");
  const [ name, setName ] = React.useState("Katie");

  
  React.useEffect(() => {
    const update = async () => {
      if (timesPressed > 0) {
        const request = new HelloRequest();
        request.setName(name);
  
        const rpc = (timesPressed % 2 === 1 ? greeter.sayHello(request) : greeter.sayHelloAgain(request));
        const message: HelloReply = await rpc;
        setMessage(message.getMessage());
      }
    }
    update();
  }, [ timesPressed, name ]);

  return <div style={{ padding: '2em' }}>
    <div>
      <label htmlFor="name">
        What's your name?
      </label><br />
      <input name="name" value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={() => setTimesPressed(timesPressed + 1)}>Send</button>
    </div>

    { message && <p>{message}</p> }
  </div>

}

export default App;
