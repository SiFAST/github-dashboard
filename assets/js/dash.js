type = ['','info','success','warning','danger'];
var aux,all,auxP,allP;
var comms=[];
var pulls=[];

// *************** pour ajouter un nouvel utilisateur , il faut ajouter son id dans le tableau ci dessous : *********************
var users=["aminmagdich","fatmaBouchekoua","hibatallahAouadni","salmamoakhar","nesrineabdmouleh","basma-yangui-prestashop","Azouz-Jribi","MounirBoukhris"];
//8 users

function toDate(dateStr) {
  if(dateStr.length>10)
  {
    dateStr = dateStr.substr(0,10);
  }
    const [year, month, day] = dateStr.split("-");
    return new Date(year, month - 1, day);
}

$('#envoi').on('click',function(e){
 //demo.initChartist();
 //  var repourl="aminemzid/PlanningDesGardesMedicales";
      // user=document.getElementById("idUser").value;

      var dd = document.getElementById("dateDeb").value;
      
      console.log(dd);
      var df = document.getElementById("dateFin").value;  
     
      var rep=document.getElementById("searchRepo").value;
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

        //  let df=h.target.value;
       console.log(df);


        all=0;
        allP=0;
     

      $.ajax({
        url:'https://api.github.com/repos/'+rep+'/commits?page=1&per_page=10000',
        data:{
        client_id:'a6293b7226ac2290bbd8',
        client_secret:'6fbd146d951d8add65bd8c79465d6749574474d9',
        sort:'created: asc',
        per_page:10000
      }
      }).done(function(commits){
         var i=0;
        console.log('init'+i);


     $.each(commits,function(index,repo){
          
       

var authDate = toDate(repo.commit.author.date);

         
         
            if( (toDate(dd).getTime()<authDate.getTime()) && (toDate(df).getTime()>authDate.getTime())  ) 
            {
              if (users.includes(repo.commit.author.name))
              {

              all++;

                 console.log('all  '+all);
            }
          }

        });
      

      users.forEach(function(element) {
         aux=0;
          

        $.each(commits,function(index,repo){
           // all=commits.length;

            if( (toDate(dd).getTime()<authDate.getTime()) && (toDate(df).getTime()>authDate.getTime())  ) 
            {
            if(element==repo.commit.author.name) 
            {
              aux++; 
              console.log('aux= ldekhel '+aux);               
            }
              }
        });



        console.log('aux= '+aux);
        console.log('all= '+all);
        console.log('i= '+i);
    
       comms[i]=10;
        //comms[i]=(aux/all*100).toFixed(2) ;

        console.log('comm'+comms[i]);
        i++;
      
         
      });
      });

       $.ajax({
        url:'https://api.github.com/repos/'+rep+'/pulls?state=all?page=1&per_page=10000',
        data:{
        client_id:'a6293b7226ac2290bbd8',
        client_secret:'6fbd146d951d8add65bd8c79465d6749574474d9',
        sort:'created: asc',
        per_page:10000
      }
      }).done(function(pulls){
         var i=0;
       


     $.each(pulls,function(index,repo){
          
            if((toDate(dd)<toDate(repo.created_at)) &&(toDate(df)>toDate(repo.created_at)))
            {
              allP++;                
            }

        });
      

      users.forEach(function(element) {
         auxP=0;
          

        $.each(pulls,function(index,repo){
           // all=commits.length;

           if((toDate(dd)<toDate(repo.created_at)) &&(toDate(df)>toDate(repo.created_at)))
           {
            if(element==repo.user.login) 
            {
              auxP++;                
            }
          }

        });
  
        //  console.log('all^pp'+allP);
       // console.log('text^ppp'+auxP);




// il y a un problème avec la bibliothèque des charts 
        pulls[i]=(auxP/all*100).toFixed(2) ;
        i++;
      
         
      });

         });
       





// demo.initChartist();

$('#dash').html(`

                     
         <div class="row">
                    <div class="col-md-6">
                        <div class="card">
         
                            <div class="header">
                                <h4 class="
                                title">Commits </h4>
                                <p class="category">${rep} </p>
                            </div>
                            <div class="content">
                                <div id="chartPreferences" class="ct-chart ct-perfect-fourth"></div>




                 <div class="footer">
                                    <div class="legend">
                                        <i class="fa fa-circle text-info"></i> Amir
                                        <i class="fa fa-circle text-danger"></i> Imen
                                        <i class="fa fa-circle text-warning"></i> Unsubscribe
                                    </div>
                                    <hr>
                                  
                                </div>

                            </div>
                        </div>
                    </div>




                  <div class="col-md-6">
                        <div class="card">
                            <div class="header">
                                <h4 class="title">Pulls: </h4>
                                <p class="category">${rep} </p>
                            </div>
                            <div class="content">
                                <div id="chartPreferencesPull" class="ct-chart ct-perfect-fourth"></div>

                                <div class="footer">
                                    <div class="legend">
                                        <i class="fa fa-circle text-info"></i> Amir
                                        <i class="fa fa-circle text-danger"></i> Imen
                                        <i class="fa fa-circle text-warning"></i> Unsubscribe
                                    </div>
                                    <hr>
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



 <dir id="repos"></dir>
                       

  `);

 demo.initChartist();
 demo2.initChartist();


  }

  });



demo = {

    initPickColor: function(){
        $('.pick-class-label').click(function(){
            var new_class = $(this).attr('new-class');  
            var old_class = $('#display-buttons').attr('data-class');
            var display_div = $('#display-buttons');
            if(display_div.length) {
            var display_buttons = display_div.find('.btn');
            display_buttons.removeClass(old_class);
            display_buttons.addClass(new_class);
            display_div.attr('data-class', new_class);
            }
        });
    },
    
    initChartist: function(){    
        
        var dataSales = {
          labels: ['LUNDI', 'MARDI', 'MERCREDI', 'JEUDI', 'VENDREDI'],
          series: [
             [287, 385, 490, 492, 554],
            [67, 152, 143, 240, 287],
            [23, 113, 67, 108, 190]
          ]
        };
        
        var optionsSales = {
          lineSmooth: false,
          low: 0,
          high: 600,
          showArea: true,
          height: "245px",
          axisX: {
            showGrid: false,
          },
          lineSmooth: Chartist.Interpolation.simple({
            divisor: 3
          }),
          showLine: false,
          showPoint: false,
        };
        
        var responsiveSales = [
          ['screen and (max-width: 640px)', {
            axisX: {
              labelInterpolationFnc: function (value) {
                return value[0];
              }
            }
          }]
        ];
    
        Chartist.Line('#chartHours', dataSales, optionsSales, responsiveSales);
        
    
        var dataPreferences = {
            series: [
                [25, 30, 20, 25]
            ]
        };
        
        var optionsPreferences = {
            donut: true,
            donutWidth: 50,
            startAngle: 0,
            total: 100,
            showLabel: false,
            axisX: {
                showGrid: false
            }
        };
 


          Chartist.Pie('#chartPreferences', dataPreferences, optionsPreferences);
                
                Chartist.Pie('#chartPreferences', {
        
                   labels: [comms[0]+ '%',comms[1]+'%',comms[2]+ '%',comms[3]+ '%',comms[4]+ '%',comms[5]+ '%',comms[6]+ '%',comms[7]+ '%'],
                  series: [comms[0],comms[1], comms[2],comms[3],comms[4],comms[5],comms[6],comms[7]] 

                });   
     },    
   
    
    
	showNotification: function(from, align){
    	color = Math.floor((Math.random() * 4) + 1);
    	
    	$.notify({
        	icon: "pe-7s-gift",
        	message: "Welcome to <b>Light Bootstrap Dashboard</b> - a beautiful freebie for every web developer."
        	
        },{
            type: type[color],
            timer: 4000,
            placement: {
                from: from,
                align: align
            }
        });
	}

    
}


demo2 = {

    initPickColor: function(){
        $('.pick-class-label').click(function(){
            var new_class = $(this).attr('new-class');  
            var old_class = $('#display-buttons').attr('data-class');
            var display_div = $('#display-buttons');
            if(display_div.length) {
            var display_buttons = display_div.find('.btn');
            display_buttons.removeClass(old_class);
            display_buttons.addClass(new_class);
            display_div.attr('data-class', new_class);
            }
        });
    },
    
    initChartist: function(){    
        
        var dataSales = {
          labels: ['LUNDI', 'MARDI', 'MERCREDI', 'JEUDI', 'VENDREDI'],
          series: [
             [287, 385, 490, 492, 554],
            [67, 152, 143, 240, 287],
            [23, 113, 67, 108, 190]
          ]
        };
        
        var optionsSales = {
          lineSmooth: false,
          low: 0,
          high: 600,
          showArea: true,
          height: "245px",
          axisX: {
            showGrid: false,
          },
          lineSmooth: Chartist.Interpolation.simple({
            divisor: 3
          }),
          showLine: false,
          showPoint: false,
        };
        
        var responsiveSales = [
          ['screen and (max-width: 640px)', {
            axisX: {
              labelInterpolationFnc: function (value) {
                return value[0];
              }
            }
          }]
        ];
    
        Chartist.Line('#chartHours', dataSales, optionsSales, responsiveSales);
        
    
        var dataPreferences = {
            series: [
                [25, 30, 20, 25]
            ]
        };
        
        var optionsPreferences = {
            donut: true,
            donutWidth: 50,
            startAngle: 0,
            total: 100,
            showLabel: false,
            axisX: {
                showGrid: false
            }
        };
 


          Chartist.Pie('#chartPreferencesPull', dataPreferences, optionsPreferences);
                
                Chartist.Pie('#chartPreferencesPull', {
        

                   labels: [pulls[0]+ '%',pulls[1]+'%',pulls[2]+ '%',pulls[3]+ '%',pulls[4]+ '%',pulls[5]+ '%',pulls[6]+ '%',pulls[7]+ '%'],
                  series: [pulls[0],pulls[1], pulls[2],pulls[3],pulls[4],pulls[5],pulls[6],pulls[7]] 
                });   
     },    
   
    
    
  showNotification: function(from, align){
      color = Math.floor((Math.random() * 4) + 1);
      
      $.notify({
          icon: "pe-7s-gift",
          message: "Welcome to <b>Light Bootstrap Dashboard</b> - a beautiful freebie for every web developer."
          
        },{
            type: type[color],
            timer: 4000,
            placement: {
                from: from,
                align: align
            }
        });
  }

    
}

