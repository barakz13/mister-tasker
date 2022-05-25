function execute(task) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) resolve(parseInt(Math.random() * 100));
      //  throw some more random errors like in the image above
      else {
        const errors = [
          'High Temparture',
          'Out of bamias',
          'Joy will not be here',
          'Puki disapeared',
        ];
        const idx = _getRandomInt(errors.length);
        reject(errors[idx]);
      }
    }, 5000);
  });
}

// Creating queue.
function createQueue() {
  const items = [];
  return {
    print() {
      console.log('Queue:', items);
    },
    enqueue(item) {
      items.unshift(item);
    },
    dequeue() {
      return items.pop();
    },
    peekFront() {
      return items[0];
    },
    peekEnd() {
      return items[items.length - 1];
    },
    get length() {
      return items.length;
    },
    isEmpty() {
      return items.length == 0;
    },
  };
}

function _getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
export const externalService = {
  execute,
  createQueue,
};
