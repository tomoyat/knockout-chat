var socket = io.connect("http://192.168.33.10:3000");

function comment(_text, _name) {
  var self = this;
  self.text = _text;
  self.name = " @" + _name;
};


function chatViewModel() {
  var self = this;
  
  self.comments = ko.observableArray();
  self.userName = ko.observable("");
  self.newComment = ko.observable("");


  self.addComment = function() {
    if (self.newComment() === "" || self.userName() === "") { return; }
    socket.emit("msg", {
      text : self.newComment(),
      name : self.userName()
    }, function() {
      self.newComment("");
    });
  };
  socket.on("msg", function(data) {
    self.comments.push(new comment(data.text, data.name));
  });
};

ko.applyBindings(new chatViewModel());
