$(document).on('click', '[data-config-toggle]', function(){
    var $this = $(this),
        data_panels = $this.data('config-toggle'),
        $slide1 = $('[data-panel-toggle=' + data_panels+ '].is-open'),
        $slide2 = $('[data-panel-toggle=' + data_panels+ ']:not(.is-open)');

    $slide1.slideUp(500);
    $slide2.delay(500).slideDown(500);
    $slide1.removeClass('is-open');
    $slide2.addClass('is-open');
});

var users=["aminmagdich","fatmaBouchekoua","hibatallahAouadni","salmamoakhar","nesrineabdmouleh","basma-yangui-prestashop","Azouz-Jribi","MounirBoukhris"];

	$('#envoi').on('click',function(e){

	 var repourl=document.getElementById("searchRepo").value,
		
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
				per_page:10000
			}
			}).done(function(commits){
				var aux=0;

					//var i=0;
					var auth=[];
					$('#commits').empty();
				$.each(commits,function(index,repo){
					

					if ((user==repo.commit.author.name) || ((user=="All")&&(users.includes(repo.commit.author.name))))
					{
						if((dd<repo.commit.author.date) &&(df>repo.commit.author.date))
						{

				//console.log(new Date(commits.commit.author.date).format("dd/MM/yyyy hh:mm TT") ) ;
				aux++;

					$('#commits').append(`

                                <tr>
                                        <td>
                                                  ${repo.commit.message} 
                                        </td>
                                        <td>
                                               ${repo.commit.author.name} 
                                        </td>
                                        <td>
                                              ${repo.commit.author.email} 
                                        </td>
                                        <td>
                                                  `+ new Date(repo.commit.author.date).toDateString()+`  
                                        </td>
                                        <td>
                                                <a href="${repo.html_url}" target="_blank"  class="btn btn-success">Commit Page </a>
                                        </td>
                                </tr>
						`);									
				}
			}

				});
	 $('#myTable').DataTable();
				console.log('text'+aux);
				nb=aux;
			

			});

	//		setTimeout(function() {

			$('#repos').html(`


				
					<div class="well">
							<div class="row">

								<div class="col-md-7">
									
									<h3 class="page-header" > 	<strong> ${repos.name}</strong>  </h3>
									<h4> Description : ${repos.description}</h4>     
								</div>
								<br>
								<br>

								<table class="display">
								<tr>
								<td> <span class="label label-default">Forks : ${repos.forks_count} </span> </td>
								<td>	<span class="label label-success">Updated at : `+ new Date(repos.updated_at).toDateString()+` </li> </span> </td>
								<td>	<span class="label label-primary">Open Issues : ${repos.open_issues_count} </span> </td>
								<td> <a href="${repos.html_url}" target="_blank"  class="btn btn-primary pull-right">Repo Page </a> </td>

								</tr>
								</table>
							</div>
					</div>	
					</div>

                        <div class="card"   >
                        

  								
								<div class="alert alert-info panel-heading" data-config-toggle="click">
                                    <span class="center-block">Click Here To Show / Hide Commits</span>
                                </div>

                            <div class="header" data-panel-toggle="click" >
                            <h3 class="text-danger"> Repo Commits :  </h3>

					<table class="display" id="myTable">
			                          <thead>
                                    	<tr>
                                       <th>   Commit Message  </th>
                                        <th> Author Name </th>
                                        <th> email </th>
                                        <th> date </th>
                                        <th>  Commit Page  </th>
                                        </tr>                          
                                    </thead>

                                     <tfoot>
                                    	<tr>
                                       <th>   Commit Message </th>
                                        <th> Author Name  </th>
                                        <th>Email </th>
                                        <th>  Date </th>
                                        <th>Commit Page </th>
                                        </tr>                          
                                    </tfoot>

                                    <tbody id="commits">

				  				</tbody>
                                </table>
                                </div>
                                </div>



                                <div id="getPulls"> </div>
                            
				`);

		});

		// console.log(e.target.value); 
	}
	});




