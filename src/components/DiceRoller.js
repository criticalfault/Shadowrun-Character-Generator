
export default function DiceRoller() {

    const APPSYNC_HOST = "c6uwmanv3jcifoxpl5cgkvbei4.appsync-api.us-east-1.amazonaws.com";
    const APPSYNC_REALTIME_HOST = "c6uwmanv3jcifoxpl5cgkvbei4.appsync-realtime-api.us-east-1.amazonaws.com";
    const APPSYNC_API_KEY = "da2-umxlkuc4orgyzgaiplao4fvwey";

    function encodeAppSyncCredentials() {
        const creds = {
        host: APPSYNC_HOST,
        "x-api-key": APPSYNC_API_KEY,
        };
        const b64Creds = window.btoa(JSON.stringify(creds));

        return b64Creds;
    }

    function getWebsocketUrl() {
        const header = encodeAppSyncCredentials(APPSYNC_HOST, APPSYNC_API_KEY);
        const payload = window.btoa(JSON.stringify({}));

        const url = `wss://${APPSYNC_REALTIME_HOST}/graphql?header=${header}&payload=${payload}`;

        return url;
    }

  function startSubscription(websocket) {
    const subscribeMessage = {
      id: window.crypto.randomUUID(),
      type: "start",
      payload: {
        data: JSON.stringify({
          query: `subscription GetMessagesSub {
                    subscribeToMessages {
                        message
                    }
                }`,
        }),
        extensions: {
          authorization: {
            "x-api-key": APPSYNC_API_KEY,
            host: APPSYNC_HOST,
          },
        },
      },
    };
    websocket.send(JSON.stringify(subscribeMessage));
  }

  function handleMessage(message) { 
    const messagesList = document.getElementById("messages");
    const msgElem = document.createElement("div");
    msgElem.className =
      "p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4 my-2";
    const msgTextElem = document.createElement("div");
    msgTextElem.className = "text-xl font-medium text-black";
    msgTextElem.innerHTML = message;
    msgElem.appendChild(msgTextElem);
    messagesList.appendChild(msgElem);

    document.getElementById("noMsg").style.display = "none";
  }

  const url = getWebsocketUrl();

  const websocket = new WebSocket(url, ["graphql-ws"]);

  websocket.addEventListener("open", () => {
    websocket.send(
      JSON.stringify({
        type: "connection_init",
      })
    );
  });

  websocket.addEventListener("message", (event) => {
    let message = JSON.parse(event.data);
    console.log(message);

    switch (message.type) {
        case "connection_ack":
            startSubscription(websocket);
        break;
        // case "start_ack":
        //     console.log("start_ack");
        // break;
        case "error":
            console.error(message);
        break;
        case "data":
            handleMessage(message.payload.data.subscribeToMessages.message);
        break;
        default:
        break;
    }
  });

  return (
    <div className="container p-52">
        <h1 className={"text-3xl my-2"}>AppSync Realtime Dice Roller</h1>
        <div id="messages">
            <div id="noMsg" className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
            <div className="text-xl font-medium text-black">No messages</div>
            </div>
        </div>
    </div>
    )
}