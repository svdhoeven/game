/**
 * Created by peter on 2/7/17.
 */

class MessageBus {
    constructor() {
        this.channels = new Map();
        this.recursionCounter = 0;
    }

    subscribe(channel, callback, scope) {
        if (!this.channels.has(channel)) {
            this.channels.set(channel, {
                queue: [],
                subscribers: []
            });
        }
        this.channels.get(channel).subscribers.push({
            callback: callback,
            scope: scope
        });
    }

    unsubscribe(channel, callback) {
        // TODO
    }

    send(channel, message) {
        this.recursionCounter++;

        if (this.channels.has(channel)) {
            let _channel = this.channels.get(channel);
            _channel.queue.push(message);
        }

        if (this.recursionCounter == 1) {
            let remainingMessages = 0;
            do {
                for (let _channel of this.channels.values()) {
                    while (_channel.queue.length > 0) {
                        let _message = _channel.queue.shift();
                        _channel.subscribers.forEach(function (subscriber) {
                            subscriber.callback.apply(subscriber.scope, [_message]);
                        });
                    }
                }
                remainingMessages = 0;
                for (let _channel of this.channels.values()) {
                    remainingMessages += _channel.queue.length;
                }
            } while (remainingMessages > 0);
        }

        this.recursionCounter--;
    }
}

export default MessageBus = new MessageBus();