//Loshan Moonsamy
//Lingeshvirin@gmail.com
//Hetzner application
$(document).ready(function(){

console.log("ready");

//event to catch username
$('#searchUser').on('keyup', function(e){
let username = e.target.value;

//Make request to github
$.ajax({
  url:'https://api.github.com/users/'+username,
  data:{
    client_id:'76fd1f8a6fef520eb617',
    client_secret:'611025889dc5a9fefcbdfbc699fb7eed5f77a2cd'
  }
}).done(function(user){

//make another request for repo data
$.ajax({
  url:'https://api.github.com/users/'+username+'/repos',
  data:{
    client_id:'76fd1f8a6fef520eb617',
    client_secret:'611025889dc5a9fefcbdfbc699fb7eed5f77a2cd',
    sort: 'created: asc', //sort by latest
    per_page: 5 //Limit to 5
  }
}).done(function(repos){
  //loop through each repo
$.each(repos, function(index, repo){
$('#repos').append(`
  <div class="well">
  <div class="row">
    <div class="col-md-7">
    <strong>${repo.name}</strong>: ${repo.description}
    </div>

    <div class="col-md-3">
    <span class="label label-default">Forks: ${repo.forks_count}</span>
    <span class="label label-primary">Watchers: ${repo.watchers_count}</span>
    <span class="label label-success">Stars: ${repo.stargazers_count}</span>
    </div>

    <div class="col-md-2">
    <a target="_blank" class="btn btn-danger btn-block" href="${repo.html_url}">View Repo</a>
    </div>

  </div>
  </div>

  `);
});
});

//brings back the user data
$('#profile').html(`
  <div class="panel panel-default">
                        <div class="panel-heading">
                          <h3 class="panel-title">${user.name}</h3>
                        </div>
  <div class="panel-body">
    <div class="row">
                <div class="col-md-3">
                <img class="thumbnail avatar" src="${user.avatar_url}">
                <a target="_blank" class="btn btn-primary btn-block" href="${user.html_url}">View profile</a>
                </div>
                <div class="col-md-9">
                <span class="label label-default">Public Repos: ${user.public_repos}</span>
                <span class="label label-primary">Public Gists: ${user.public_gists}</span>
                <span class="label label-success">Public Followers: ${user.followers}</span>
                <span class="label label-info">Public Following: ${user.following}</span>
                <br><br>
                <ul class="list-group">
                <li class="listgroup-item">Company: ${user.company}</li>
                <li class="listgroup-item">Website/blog: ${user.blog}</li>
                <li class="listgroup-item">Location: ${user.location}</li>
                <li class="listgroup-item">Member Since: ${user.created_at}</li>
                </ul>
                </div>
    </div>
    </div>
  </div>


<h3 class="page-header">Repositories</h3>
<div id="repos"</div>

`);
});

});


});
