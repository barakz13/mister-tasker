export function makeId(length = 4) {
  var text = '';
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export function getDate(timestamp) {
  console.log(timestamp);
  return new Date(timestamp.seconds * 1000).toLocaleTimeString([], {
    timeStyle: 'short',
  });
}

export function getTime(timestamp) {
  return new Date(timestamp.seconds * 1000).toString().split(' ')[4];
}
