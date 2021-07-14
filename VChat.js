let mute = false;
let mystream;

let client = AgoraRTC.createClient({
  mode: "rtc",
  codec: "vp8",
});


client.init("2ab0d79f1b1649ed995e5864c40aefec");


client.join(
  "0062ab0d79f1b1649ed995e5864c40aefecIADBn+sV3ldm0YUuEEOl3PX9GmOhufNKIKNhVd+Tp8Qk4ytc5NEAAAAAEAC4541oQwbwYAEAAQBEBvBg",
  "Chat-app",
  null,
  (uid) => {

    let localStream = AgoraRTC.createStream({
      audio: true,
      video: true,
    });
    localStream.init(() => {
      mystream = localStream;
      localStream.play("local");
      client.publish(localStream);
    });
  }
);

client.on("stream-added", function (evt) {
  client.subscribe(evt.stream);
});

client.on("stream-subscribed", function (evt) {
  let stream = evt.stream;
  let streamId = String(stream.getId());
  let right = document.getElementById("remote");
  let div = document.createElement("div");
  div.id = streamId;
  right.appendChild(div);
  stream.play(streamId);
});

function muteAudio() {
  mystream.muteAudio();
}

function unmuteAudio() {
  mystream.unmuteAudio();
}



