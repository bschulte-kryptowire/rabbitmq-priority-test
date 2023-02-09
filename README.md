# RabbitMQ Priority Test

Small repo to test out RabbitMQ's priority system. Assumes a queue named "test-priority-queue" has been created locally with a definition similar to:

```
...
{
    "name": "test-priority-queue",
    "vhost": "/",
    "durable": true,
    "auto_delete": false,
    "arguments": {
        "x-max-priority": 10
    }
},
...
```

## Running

After RabbitMQ is set up locally, run with `npm start`. This will simulate sending messages with random priority and how a queue that would get backed up with work would handle it.

The `channel.prefetch` method is very important as if this isn't set to `1` then the consumer will try to get all the messages even if it hasn't ack'd the first message.

### Sample output

```
  * [SEND] Message count (1) with priority 9
  * [SEND] Message count (2) with priority 4
  * [SEND] Message count (3) with priority 8
  * [SEND] Message count (4) with priority 7
  * [SEND] Message count (5) with priority 6
  * [SEND] Message count (6) with priority 1
- [RECEIVE]: Message 1  Priority:  9
  * [SEND] Message count (7) with priority 7
  * [SEND] Message count (8) with priority 6
  * [SEND] Message count (9) with priority 0
  * [SEND] Message count (10) with priority 7
  * [SEND] Message count (11) with priority 1
- [RECEIVE]: Message 3  Priority:  8
  * [SEND] Message count (12) with priority 10
  * [SEND] Message count (13) with priority 2
  * [SEND] Message count (14) with priority 5
  * [SEND] Message count (15) with priority 6
  * [SEND] Message count (16) with priority 8
- [RECEIVE]: Message 4  Priority:  7
  * [SEND] Message count (17) with priority 0
  * [SEND] Message count (18) with priority 8
  * [SEND] Message count (19) with priority 0
  * [SEND] Message count (20) with priority 6
  * [SEND] Message count (21) with priority 4
- [RECEIVE]: Message 12  Priority:  10
```
