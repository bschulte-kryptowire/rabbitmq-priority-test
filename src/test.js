const amqplib = require("amqplib");

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

(async () => {
  const queue = "test-priority-queue";

  const conn = await amqplib.connect("amqp://localhost");

  const listenerCh = await conn.createChannel();
  listenerCh.prefetch(1);

  listenerCh.consume(queue, (msg) => {
    if (msg !== null) {
      setTimeout(() => {
        console.log(
          "- [RECEIVE]:",
          msg.content.toString(),
          " Priority: ",
          msg.properties.priority
        );
        listenerCh.ack(msg);
      }, 5000);
    } else {
      console.log("Consumer cancelled by server");
    }
  });

  const senderCh = await conn.createChannel();
  let count = 1;
  setInterval(() => {
    const priority = getRandomIntInclusive(0, 10);

    console.log(
      `  * [SEND] Message count (${count}) with priority ${priority}`
    );
    senderCh.sendToQueue(queue, Buffer.from(`Message ${count}`), {
      priority,
    });
    count += 1;
  }, 1000);
})();
