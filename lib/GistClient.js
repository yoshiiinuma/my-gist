var request = require('superagent');

var GistClient = (function() {
  var list = function(userName) {
    request.get('https://api.github.com/users/' + userName + '/gists')
      .set('Accept', 'application/vnd.github.v3+json')
      .end(function(err, res) {
        if (err) {
          console.log(err);
          return false;
        } else if (!res.ok) {
          console.log(res);
          return false;
        } else {
          var json = JSON.parse(JSON.stringify(res.body));
          if (json.length == 0) {
            console.log([]);
          }
          for(let v of json) {
            console.log(v.html_url + ' ' + v.id + ': ' + v.description)
          }
        }
        return true;
      });
  }

  var post = function(token, desc, data) {
    request.post('https://api.github.com/gists')
      .set('Accept', 'application/vnd.github.v3+json')
      .set('Authorization', 'token ' + token)
      .send({'description': desc})
      .send({'public':true})
      .send(data)
      .end(function(err, res) {
        if (err) {
          console.log(err);
          return false;
        } else if (!res.ok) {
          console.log(res);
          return false;
        } else {
          var v = JSON.parse(JSON.stringify(res.body));
          console.log('CREATED: ' + v.html_url + ' ' + v.id + ': ' + v.description)
        }
        return true;
      });
  }

  var deletePost = function(token, gistId) {
    request.del('https://api.github.com/gists/' + gistId)
      .set('Accept', 'application/vnd.github.v3+json')
      .set('Authorization', 'token ' + token)
      .end(function(err, res) {
        if (err) {
          console.log(err);
          return false;
        } else if (!res.ok) {
          console.log(res);
          return false;
        } else {
          let r = JSON.stringify(res.body);
          console.log('DELETED: ' + gistId)
        }
        return true;
      });
  }

  return {
    list: list,
    post: post,
    deletePost, deletePost
  };
})();

module.exports = GistClient;
