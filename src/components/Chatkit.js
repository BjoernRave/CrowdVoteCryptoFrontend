import Chatkit from "@pusher/chatkit";

const tokenProvider = new Chatkit.TokenProvider({
  url:
    "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/14365dc4-4d69-4490-b321-bc0b65c2a2fc/token"
});

const chatManager = new Chatkit.ChatManager({
  instanceLocator: "v1:us1:14365dc4-4d69-4490-b321-bc0b65c2a2fc",
  userId: "zarazas",
  tokenProvider: tokenProvider
});

chatManager
  .connect()
  .then(currentUser => {
    console.log("Connected as user ", currentUser);
  })
  .catch(error => {
    console.error("error:", error);
  });
