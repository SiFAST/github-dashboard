$(document).ready(function() {



	$('#searchUser').on('keyup',function(e){
				let username=e.target.value;

		//make request to GitHub ! 

		$.ajax({
			url:'https://api.github.com/users/'+username,
			data:{
				client_id:'a6293b7226ac2290bbd8',
				client_secret:'6fbd146d951d8add65bd8c79465d6749574474d9'
			}
		}).done(function(user){
			$.ajax({
				url:'https://api.github.com/users/'+username+'/repos',
				data:{
				client_id:'a6293b7226ac2290bbd8',
				client_secret:'6fbd146d951d8add65bd8c79465d6749574474d9',
				sort:'created: asc',
				per_page:5
			}
			}).done(function(repos){
				$.each(repos,function(index,repo){
					$('#repos').append(`
						<div class="well">
							<div class="row">
								<div class="col-md-7">
									<strong> ${repo.name}</strong> ${repo.description}

								</div>
								<div class="col-md-3">
									<span class="label label-default">Forks : ${repo.forks_count} </span>
									<span class="label label-primary">Watchers : ${repo.watchers_count}</span>
									<span class="label label-success">Stars : ${repo.stargazers_count}</span>

								</div>
								<div class="col-md-2">

									<a href="${repo.html_url}" target="_blank"  class="btn btn-default">Repo Page </a>

								</div>
							</div>
						</div>

						`);
				});

			//	console.log( ${repo.name});

			});

			$('#profile').html(`
				

				<div class="panel panel-default">
 				 <div class="panel-heading">
  				  <h3 class="panel-title">${user.name}</h3>
  				</div>
  				<div class="panel-body">
  				<div class="row">
  				<div class="col-md-3">

  				<img class="thumbnail avatar" src=${user.avatar_url}" height="200" width="250">
  				<a target="_blank" class="btn btn-primary btn-block" href="${user.html_url}"> View profile </a>
  				</div>
  				<div class="col-md-9">
	  				<span class="label label-default">Public Repos : ${user.public_repos} </span>
					<span class="label label-primary">Public Gists : ${user.public_gists}</span>
					<span class="label label-success">Followers : ${user.followers}</span>
					<span class="label label-info">following : ${user.following}</span>
					<br> <br>

					<ul class="list-group">
						<li class="list-group-item"> <strong> <u> Company:</u></strong> ${user.company}   </li>
						<li class="list-group-item"> <strong> <u>Website / Blog:</u></strong> <a href="${user.blog} " target="_blank" > ${user.blog} </a></li>
						<li class="list-group-item"><strong> <u> Location:</u></strong> ${user.location}  </li>
						<li class="list-group-item">  <strong> <u> Member since: </u></strong>`+ new Date(user.created_at).toDateString()+` </li>

					</ul>

  				</div>
  				</div>
 				  
 				 </div>
				</div>
				<h3 class="page-header" > Latest Repos </h3>
				<div id="repos">	</div>


				`);
			//${user.name}
			//console.log(user); 

		});

		// console.log(e.target.value); 
	});
});