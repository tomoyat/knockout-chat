/*
 * socket
 */

exports.listen = function(server) {
  var io = require('socket.io').listen(server);
  io.sockets.on('connection', function(socket) {
    socket.on('msg', function(data) {
      io.sockets.emit('msg', data);
    });
  });
  return io;
}
