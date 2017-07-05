$(document).ready(function() {
	$('#envoi').on('click',function(e){
		console.log("jnkljdlkj");
	 var repourl=document.getElementById("searchRepo").value,
		//make request to GitHub !
			user=document.getElementById("idUser").value;
			//choose the user to folow 
			var dd=document.getElementById("dateDeb").value;
			console.log(dd);
			var df=document.getElementById("dateFin").value;  

			 if(df < dd){ // si la date finale < la date initiale
          	$('#dateFin').css({ // on rend le champ rouge
     	        borderColor : 'red',
        	color : 'red'  
	       
	    			});

             }
    else{//console.log(df);
	$('#dateFin').css({ // si tout est bon, on le rend vert
	    borderColor : 'green',
	    color : 'green'
	});


      	//	let df=h.target.value;
			console.log(df);
			var nb=0;

		$.ajax({
			url:'https://api.github.com/repos/'+repourl,
			data:{
				client_id:'a6293b7226ac2290bbd8',
				client_secret:'6fbd146d951d8add65bd8c79465d6749574474d9'
			}
		}).done(function(repos){
			$.ajax({
				url:'https://api.github.com/repos/'+repourl+'/commits',
				data:{
				client_id:'a6293b7226ac2290bbd8',
				client_secret:'6fbd146d951d8add65bd8c79465d6749574474d9',
				sort:'created: asc',
				per_page:1000
			}
			}).done(function(commits){
				var aux=0;

					//var i=0;
					var auth=[];
//setTimeout(function() {

					$('#commits').empty();
				$.each(commits,function(index,repo){
					//auth.push(repo.commit.author.name) ;

					if ((user==repo.commit.author.name) || (user=="All"))
					{
						// if(dd>df)
						// 	{alert("jvkfvjkc")}
							//else
						if((dd<repo.commit.author.date) &&(df>repo.commit.author.date))
						{

				//console.log(new Date(commits.commit.author.date).format("dd/MM/yyyy hh:mm TT") ) ;
				aux++;

					$('#commits').append(`

				 
                               
                                        <tr>
                                        <th>
                                            <div class="panel-heading">
                                                  <h3 class="page-header" > ${repo.commit.message} </h3>
                                                </div>

                                            <ul >
                                                <li class="list-group-item"> <strong> <u> author name :     </u></strong>  ${repo.commit.author.name} </li>
                                                <li class="list-group-item"> <strong> <u> email:     </u></strong> ${repo.commit.author.email}</li>
                                                <li class="list-group-item"> <strong> <u> date:      </u></strong>     `+ new Date(repo.commit.author.date).toDateString()+`  </li>

                                            </ul>

                                        </th>
                                        <th>
                                            
                                                <a href="${repo.html_url}" target="_blank"  class="btn btn-success">Commit Page </a>


                                        </th>
                                          
                                        </tr>
                     
                                  
						`);				
				}
			}
			//}
				});
	
				console.log('text'+aux);
				nb=aux;
				bool=true;

				/*		var text = "<ul>";
					for (var i = 0; i < auth.length; i++) {
					    text += "<li>" + auth[i] + "</li>";
					}

					for (var i = auth.length - 1; i >= 0; i--) {
						auth[i]
					}*/

			});

	//		setTimeout(function() {

			$('#repos').html(`

					<div class="col-md-7">
					<div class="well">
							<div class="row">

								<div class="col-md-7">
									<strong>Repos Results : </strong> 
									<br>
									<br>
									<h3 class="page-header" > 	<strong> ${repos.name}</strong>  </h3>
				<h4> Description : ${repos.description}</h4>     
								</div>
								<br>
								<br>
								
						
								<div class="col-md-7">
								<div class="col-md-5">
									<span class="label label-default">Forks : ${repos.forks_count} </span>
									<span class="label label-success">Updated at : `+ new Date(repos.updated_at).toDateString()+` </li> </span>
									<span class="label label-primary">Open Issues : ${repos.open_issues_count} </span>

								</div>

							
								<div class="col-md-7">

								<a href="${repos.html_url}" target="_blank"  class="btn btn-primary pull-right">Repo Page </a>

								</div>
								</div>

							</div>

					</div>	
					</div>



                    <div class="col-md-7">
                        <div class="card">
                            <div class="header">
 <table class="table table-hover table-striped">
                                    <thead>
                                        <th>

                                            
                                        </th>
                              
                              

                                    
                                    </thead>
                                    <tbody>
				

				<div id="commits">	</div>
				  </tbody>
                                </table>
                                </div>
                                </div>
                                </div>

                           
					


				`);

	//	}, 600);


//}, 10000);

		
		});

		// console.log(e.target.value); 
	}
	});
	});
