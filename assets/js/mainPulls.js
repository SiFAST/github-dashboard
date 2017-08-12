$(document).on('click2', '[data-config-toggle]', function(){
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
		}).done(function(getPulls){

				
			
			$.ajax({
				url:'https://api.github.com/repos/'+repourl+'/pulls?state=all&page=1&per_page=100',
				data:{
				client_id:'a6293b7226ac2290bbd8',
				client_secret:'6fbd146d951d8add65bd8c79465d6749574474d9',
				//sort:'created: asc',
				//per_page:10000
			}
			}).done(function(pulls){
				var aux=0;

					$('#pulls').empty();

			
				$.each(pulls,function(index,pull){

					if ((user==pull.user.login) || ((user=="All")&&(users.includes(pull.user.login))))
					{
						if((dd<pull.created_at) &&(df>pull.created_at))
						{
							aux++;

					$('#pulls').append(`

                                <tr>
                                        <td>
                                                  ${pull.title} 
                                        </td>
                                        <td>
                                               ${pull.user.login} 
                                        </td>
                                        <td>
                                              <a href="${pull.user.html_url}" target="_blank"  class="btn btn-primary">View Profile </a>
                                        </td>
                                        <td>
                                                  `+ new Date(pull.created_at).toDateString()+`  
                                        </td>
                                        <td>
                                        	 ${pull.state} 
                                        </td>

                                        <td>
                                                <a href="${pull.html_url}" target="_blank"  class="btn btn-success">Pull Page </a>
                                        </td>
                                </tr>
						`);									
				}
			}

				});



	 $('#myTable2').DataTable();
				console.log('text'+aux);	

			});

		
	

	//		setTimeout(function() {

			$('#getPulls').html(`
	

                                  <div class="card"   >

  								
								<div class="alert alert-info panel-heading" data-config-toggle="click2">
                                    <span class="center-block">Click Here To Show / Hide Pulls</span>
                                </div>

                            <div class="header" data-panel-toggle="click2" >
                            <h3 class="text-danger"> Repo Pulls :  </h3>


					<table class="display" id="myTable2">
			                          <thead>
                                    	<tr>
                                       <th>   Pull Message  </th>
                                        <th> Author Name </th>
                                        <th> Profile Link </th>
                                        <th> Creation Date </th>
                                        <th> State </th>
                                        <th>  Pull Page  </th>
                                        </tr>                          
                                    </thead>

                                     <tfoot>
                                    	<tr>
                                       <th>   Pull Message  </th>
                                        <th> Author Name </th>
                                        <th> Profile Link </th>
                                        <th> Creation Date </th>
                                           <th> State </th>
                                        <th>  Pull Page  </th>
                                        </tr>                           
                                    </tfoot>

                                    <tbody id="pulls">
									
				  				</tbody>
                                </table>
                                </div>
                                </div>
                            
				`);

		});

		// console.log(e.target.value); 
	}

	});
	


























