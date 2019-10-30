//GPA DECLARE VARS
var total_course;
var total_units = 0;
var total_scores = 0;
var gpa;
var course_code_array;
var scores_array;
var unit_array;
var point_array;
var oc_array;
var total_point = 0;
course_code_array = [];
scores_array = [];
unit_array = [];
point_array = [];
oc_array = [];

let oc_list = 0;

var i = 1;



//CGPA DECLARE VARS

var total_semester;
var aggregrate_units = 0;
var aggregrate_scores = 0;
var cgpa = 0;
var total_cummulative_point = 0;

var semester = 1;
var course = 1;
var semester_course;
var semester_gpa;
semester_course = [];
semester_gpa = [];



	var myApp=new Framework7({
		modalTitle: 'Point Calculator',
        material: true,
        pushState : true
    });
	
	var $$=Dom7;
	var mainView=myApp.addView('.view-main',{dynamicNavbar:true});
	//


	myApp.onPageInit('gpa',function(page){

		$$('.create-page').on('click',function(){
			createContentPage();
		});

		$$('#add-course').on('click', function (e) {
	    	
	    	if(i >= 15){
	    		//modal
	    		myApp.alert('Maximum course is 15', 'Error!');
	    		//modal
	    		return false;
	    	}else{
	    		i+=1;
				var j = '<li class="added sc'+i+'"><div class="item-content"><div class="item-inner">';
				/*j += '<p>Course '+i+'</p><div class="row"><div class="col-50">';
				j += '<div class="item-input item-input-field">';
				j += '<input type="text" class="course_in course'+i+'" placeholder="Course Code"></div></div>';*/
				j += '<p>Course '+i+'</p><div class="row">';
				j += '<div class="col-60"><div class="item-input item-input-field">';
				j += '<input type="number" placeholder="Score" class="score_in score'+i+'" maxlength="2">';
				j += '</div></div><div class="col-40"><div class="item-input item-input-field">';
				j += '<input type="number" class="unit_in unit'+i+'" maxlength="1" class="form-control" required="" placeholder="Unit">';
				j += '</div></div></div></div></div></li>';				

				$$(".course-list").append(j);
				//$$('.score'+i).focus();
	    	}
	    	
	    	//$$('course1').val('23');
		});

		$$('.back-link').on('click', function (e) {
			i = 1;
		});

		$$('.calculate-gp').on('click', function (e) {
			e.preventDefault();

			for(var k = 1; k<= i; k++){
				//console.log($("[data-course='"+k+"']").val());
				//add course,score and unit to array
				//course_code_array[k] = $$('.course'+k).val();
				scores_array[k] = $$('.score'+k).val();
				unit_array[k] = $$('.unit'+k).val();

				if(isNaN(scores_array[k])){
					myApp.alert('Kindly enter a numeric value in all text box', 'Error');
					return false;
					//
				}

				if(isNaN(unit_array[k])){
					myApp.alert('Kindly enter a numeric value in all text box', 'Error');
					return false;
					//
				}

				if(scores_array[k] == ""){
					myApp.alert('Please fill all fields', 'Error');
					return false;
				}

				if(unit_array[k] == ""){
					myApp.alert('Please fill all fields', 'Error');
					return false;
				}

				var this_point = units(parseFloat($$('.score'+k).val())) * parseFloat($$('.unit'+k).val());
				point_array[k] = this_point;
				total_point += point_array[k];
				total_units += parseFloat($$('.unit'+k).val());
				total_scores += parseFloat($$('.score'+k).val());
			}

			gpa = total_point/total_units;
			gpa = Math.round(gpa * 100) / 100;

			var semesterGrade = grades(gpa);
			myApp.alert('Your Semester GPA is '+gpa+'<br> Semester Grade is '+semesterGrade, 'GPA Result');

			/*
			RETURN VARIABLES
			 */
			total_units = 0;
			total_scores = 0;
			total_point = 0;
			course_code_array = [];
			scores_array = [];
			unit_array = [];
			point_array = [];
			i = 1;

			//$$('.added').remove();
			$$('.score1').val('');
			$$('.unit1').val('');
		});

		/*$$('.compute-sem').on('click',function(e){			
            myApp.prompt('How many semester?', function (value) {
                if(value > 0){
                	sessionStorage.setItem("semesters",value);
                }else{
                	sessionStorage.setItem("semesters",1);
                }
            });         	
		});*/
	});


	myApp.onPageInit('cgpa',function(page){
		ii = 1;
		$$("#add-semester-course").on('click', function (e) {
			//myApp.alert("Hi");
			
			if(ii >= 15){
	    		//modal
	    		myApp.alert('Maximum course is 15', 'Error!');
	    		//modal
	    		return false;
	    	}else{
	    		ii+=1;
				var j = '<li class="added sc'+ii+'"><div class="item-content"><div class="item-inner">';
				/*j += '<p>Course '+i+'</p><div class="row"><div class="col-50">';
				j += '<div class="item-input item-input-field">';
				j += '<input type="text" class="course_in course'+i+'" placeholder="Course Code"></div></div>';*/
				j += '<p>Course '+ii+'</p><div class="row">';
				j += '<div class="col-60"><div class="item-input item-input-field">';
				j += '<input type="number" placeholder="Score" class="score_in score_'+semester+'_'+ii+'" maxlength="2">';
				j += '</div></div><div class="col-40"><div class="item-input item-input-field">';
				j += '<input type="number" class="unit_in unit_'+semester+'_'+ii+'" maxlength="1" class="form-control" required="" placeholder="Unit">';
				j += '</div></div></div></div></div></li>';				

				$$(".course-list").append(j);
				//$$('.score_'+semester+'_'+ii).focus();
	    	}
		});

		//add-semester
		$$(".add-semester").on('click', function (e) {
			e.preventDefault();
			if(semester == 6){
				myApp.alert("Maximum of 6 semesters","Error");
				return false;
			}

			for(var k = 1; k<= ii; k++){
				//console.log($("[data-course='"+k+"']").val());
				//add course,score and unit to array
				//course_code_array[k] = $$('.course'+k).val();
				scores_array[k] = $$('.score_'+semester+'_'+k).val();
				unit_array[k] = $$('.unit_'+semester+'_'+k).val();

				if(isNaN(scores_array[k])){
					myApp.alert('Kindly enter a numeric value in all text box', 'Error');
					return false;
					//
				}

				if(isNaN(unit_array[k])){
					myApp.alert('Kindly enter a numeric value in all text box', 'Error');
					return false;
					//
				}

				if(scores_array[k] == ""){
					myApp.alert('Please fill all fields', 'Error');
					return false;
				}

				if(unit_array[k] == ""){
					myApp.alert('Please fill all fields', 'Error');
					return false;
				}

				var this_point = units(parseFloat($$('.score_'+semester+'_'+k).val())) * parseFloat($$('.unit_'+semester+'_'+k).val());
				point_array[k] = this_point;
				total_cummulative_point += point_array[k];
				aggregrate_units += parseFloat($$('.unit_'+semester+'_'+k).val());
				
				var c_gpa = total_cummulative_point/aggregrate_units;
				semester_gpa[semester] = Math.round(c_gpa * 100) / 100;				
			}

			/*console.log("Total Point = "+ total_cummulative_point);
			console.log("aggregrate_units = "+aggregrate_units);
			console.log("GPA = "+semester_gpa[semester]);*/

			//myApp.alert("Cummulative GPA is "+semester_gpa[semester]);



			semester_course[semester] = ii;
			ii = 1;
			semester += 1;
			//ii++;
			

			var j = '<li class="added sc'+ii+'"><div class="item-content"><div class="item-inner">';
			/*j += '<p>Course '+i+'</p><div class="row"><div class="col-50">';
			j += '<div class="item-input item-input-field">';
			j += '<input type="text" class="course_in course'+i+'" placeholder="Course Code"></div></div>';*/
			j += '<p>Course '+ii+'</p><div class="row">';
			j += '<div class="col-60"><div class="item-input item-input-field">';
			j += '<input type="number" placeholder="Score" class="score_in score_'+semester+'_'+ii+'" maxlength="2">';
			j += '</div></div><div class="col-40"><div class="item-input item-input-field">';
			j += '<input type="number" class="unit_in unit_'+semester+'_'+ii+'" maxlength="1" class="form-control" required="" placeholder="Unit">';
			j += '</div></div></div></div></div></li>';				

			$$(".course-list").html(j);
			//$$('.score_'+semester+'_'+i).focus();
			$$("#semester_name").html(semester);
		});


		$$(".calculate-cgpa").on('click',function(e){
			e.preventDefault();
			for(var k = 1; k<= ii; k++){
				//console.log($("[data-course='"+k+"']").val());
				//add course,score and unit to array
				//course_code_array[k] = $$('.course'+k).val();
				scores_array[k] = $$('.score_'+semester+'_'+k).val();
				unit_array[k] = $$('.unit_'+semester+'_'+k).val();

				if(isNaN(scores_array[k])){
					myApp.alert('Kindly enter a numeric value in all text box', 'Error');
					return false;
					//
				}

				if(isNaN(unit_array[k])){
					myApp.alert('Kindly enter a numeric value in all text box', 'Error');
					return false;
					//
				}

				if(scores_array[k] == ""){
					myApp.alert('Please fill all fields', 'Error');
					return false;
				}

				if(unit_array[k] == ""){
					myApp.alert('Please fill all fields', 'Error');
					return false;
				}

				var this_point = units(parseFloat($$('.score_'+semester+'_'+k).val())) * parseFloat($$('.unit_'+semester+'_'+k).val());
				point_array[k] = this_point;
				total_cummulative_point += point_array[k];
				aggregrate_units += parseFloat($$('.unit_'+semester+'_'+k).val());
				
				var c_gpa = total_cummulative_point/aggregrate_units;
				semester_gpa[semester] = Math.round(c_gpa * 100) / 100;
			}
			var gpaGrade = grades(semester_gpa[semester]);
			myApp.alert("Your Cummulative GPA is "+semester_gpa[semester]+"<br>CGPA Grade is "+ gpaGrade, 'CGPA Result');

			//RETURN ALL VARS
			aggregrate_units = 0;
			aggregrate_scores = 0;

			total_cummulative_point = 0;

			semester = 1;
			ii = 1;
			semester_course = [];
			semester_gpa = [];


			var j = '<li class="added sc'+ii+'"><div class="item-content"><div class="item-inner">';			
			j += '<p>Course '+ii+'</p><div class="row">';
			j += '<div class="col-60"><div class="item-input item-input-field">';
			j += '<input type="number" placeholder="Score" class="score_in score_'+semester+'_'+ii+'" maxlength="2">';
			j += '</div></div><div class="col-40"><div class="item-input item-input-field">';
			j += '<input type="number" class="unit_in unit_'+semester+'_'+ii+'" maxlength="1" class="form-control" required="" placeholder="Unit">';
			j += '</div></div></div></div></div></li>';				

			$$(".course-list").html(j);
			//$$('.score_'+semester+'_'+i).focus();
			$$("#semester_name").html(semester);
			

			
		});

		$$(".back-link-cgpa").on('click', function (e) {			
			e.preventDefault();
			semester = 1;
			$$("#add-semester-course").click();
		});
	});


	myApp.onPageInit('nd1_1',function(page){
		//alert("Ko shi lo...");

		$.ajax({
			url: 'data/nd1_1.json',
			dataType: 'json',
			type: 'get',
			success: function (f) {
				let c = f.regular;
				let the_str = "";
				for(var k = 0; k < c.length; k++){

					var r = `<li>
	          <div class="item-content">
	             <div class="item-inner">
	             	<p>`+c[k].courseCode+`</p>
	                <div class="row">
	                	<div class="col-60">
			                <div class="item-input">
			                   <input type="number" placeholder="Score" class="score_in score1" maxlength="2">
			                </div>
	                	</div>

	                	<div class="col-40">			                
			                <div class="unit_in unit1">`+c[k].courseUnit+`</div>			               
	                	</div>
	                </div>
	             </div>
	          </div>
	       </li>`;

					//console.log(r);

                    the_str += r;
                    i += 1;
				}

				$$("#the-courses").append(the_str);
            }
		});


        $$('.calculate-gp').on('click', function (e) {
            e.preventDefault();


            let k = 0;
            $(".score_in").each(function( index ) {
                //console.log( index + ": " + $( this ).val() );


                //console.log( $(".unit_in").eq(index).val() );


                scores_array[k] = $(".score_in").eq(index).val();
                unit_array[k] = $(".unit_in").eq(index).text()

                if(isNaN(scores_array[k])){
                    myApp.alert('Kindly enter a numeric value for all scores', 'Error');
                    return false;
                    //
                }

                if(isNaN(unit_array[k])){
                    myApp.alert('Kindly enter a numeric value in all text box', 'Error');
                    return false;
                    //
                }

                if(scores_array[k] == ""){
                    myApp.alert('Please fill all fields', 'Error');
                    return false;
                }

                if(unit_array[k] == ""){
                    myApp.alert('Please fill all fields', 'Error');
                    return false;
                    return;
                }

                let the_score = $(".score_in").eq(index).val();
                let the_unit = $(".unit_in").eq(index).text();

                if(the_score == ""){
                    myApp.alert('Please fill all fields', 'Error');
                    return false;
                    return;
                }

                var this_point = units(parseFloat(the_score)) * parseFloat(the_unit);

                if(this_point == 0){
                    oc_list += 1;
                }
                point_array[k] = this_point;
                total_point += point_array[k];
                total_units += parseFloat(the_unit);
                total_scores += parseFloat(the_score);
            });
            //return;


            gpa = total_point/total_units;
            gpa = Math.round(gpa * 100) / 100;

            var semesterGrade = grades(gpa);
            if(oc_list == 0) {
                myApp.alert('Your Semester GPA is ' + gpa + '<br> Semester Grade is ' + semesterGrade, 'GPA Result');
            }else{
                myApp.alert('Your Semester GPA is ' + gpa + '<br> Semester Grade is ' + semesterGrade, 'GPA Result' + '<br>Outstanding courses : '+oc_list);
            }

            /*
            RETURN VARIABLES
             */
            total_units = 0;
            total_scores = 0;
            total_point = 0;
            course_code_array = [];
            scores_array = [];
            unit_array = [];
            point_array = [];
            oc_list = 0;
            i = 1;

            //$$('.added').remove();
            $$('.score1').val('');
            //$$('.unit1').val('');
        });
	});



myApp.onPageInit('all-level',function(page){
    $(".next-class").on("click",function (e) {
        sessionStorage.setItem("file", $(this).data("file"));
        sessionStorage.setItem("names", $(this).data("names"));
    })
});


myApp.onPageInit('all_gpa',function(page){
    //alert("Ko shi lo...");

    let file = sessionStorage.getItem("file")+".json";
    let level = sessionStorage.getItem("names");

    $(".file_name").html(level);
    $.ajax({
        url: 'data/'+file,
        dataType: 'json',
        type: 'get',
        success: function (f) {
            let c = f.regular;
            let the_str = "";
            for(var k = 0; k < c.length; k++){

                var r = `<li>
	          <div class="item-content">
	             <div class="item-inner">
	             	<p>`+c[k].courseCode+`</p>
	                <div class="row">
	                	<div class="col-60">
			                <div class="item-input">
			                   <input type="number" placeholder="Score" class="score_in score1" maxlength="2">
			                </div>
	                	</div>

	                	<div class="col-40">			                
			                <div class="unit_in unit1">`+c[k].courseUnit+`</div>			               
	                	</div>
	                </div>
	             </div>
	          </div>
	       </li>`;

                //console.log(r);

                the_str += r;
                i += 1;
            }

            $$("#the-courses").append(the_str);
        }
    });


    $$('.calculate-gp').on('click', function (e) {
        e.preventDefault();


        let k = 0;
        let is_error = false;
        $(".score_in").each(function( index ) {
            //console.log( index + ": " + $( this ).val() );


            //console.log( $(".unit_in").eq(index).val() );


            scores_array[k] = $(".score_in").eq(index).val();
            unit_array[k] = $(".unit_in").eq(index).text()

            if(isNaN(scores_array[k])){
                myApp.alert('Kindly enter a numeric value for all scores', 'Error');
                is_error = true;
                return false;
                //
            }

            /*if(isNaN(unit_array[k])){
                myApp.alert('Kindly enter a numeric value in all text box', 'Error');
                return false;
                //
            }*/

            if(scores_array[k] == ""){
                myApp.alert('Please fill all fields', 'Error');
                is_error = true;
                return false;
            }

            /*if(unit_array[k] == ""){
                myApp.alert('Please fill all fields', 'Error');
                return false;
                return;
            }*/

            let the_score = $(".score_in").eq(index).val();
            let the_unit = $(".unit_in").eq(index).text();

            if(is_error == true){
                myApp.alert('Please fill all fields', 'Error');
                return false;
                return;
            }

            var this_point = units(parseFloat(the_score)) * parseFloat(the_unit);

            if(this_point == 0){
                oc_list += 1;
            }
            point_array[k] = this_point;
            total_point += point_array[k];
            total_units += parseFloat(the_unit);
            total_scores += parseFloat(the_score);
            k++;
        });
        //return;

        if(is_error == true){
            myApp.alert('Please fill all fields', 'Error');
            return false;
            return;
        }


        gpa = total_point/total_units;
        gpa = Math.round(gpa * 100) / 100;

        var semesterGrade = grades(gpa);
        if(oc_list == 0) {
            myApp.alert('Your Semester GPA is ' + gpa + '<br> Semester Grade is ' + semesterGrade, 'GPA Result');
        }else{
            myApp.alert('Your Semester GPA is ' + gpa + '<br> Semester Grade is ' + semesterGrade +'<br>Outstanding courses : '+oc_list, 'GPA Result');
        }

        /*
        RETURN VARIABLES
         */
        is_error = false;
        total_units = 0;
        total_scores = 0;
        total_point = 0;
        course_code_array = [];
        scores_array = [];
        unit_array = [];
        point_array = [];
        oc_list = 0;
        i = 1;

        //$$('.added').remove();
        $$('.score1').val('');
        //$$('.unit1').val('');
    });
});



myApp.onPageInit('all_cgpa',function(page){
    //alert("Ko shi lo...");

    let file = sessionStorage.getItem("file")+"cgpa.json";
    let level = sessionStorage.getItem("names");

    $(".file_name").html(level+" CGPA");
    $.ajax({
        url: 'data/'+file,
        dataType: 'json',
        type: 'get',
        success: function (f) {
            let c = f.regular;
            let the_str = "";
            for(var k = 0; k < c.length; k++){

                var r = `<li>
	          <div class="item-content">
	             <div class="item-inner">
	             	<p>`+c[k].courseCode+`</p>
	                <div class="row">
	                	<div class="col-60">
			                <div class="item-input">
			                   <input type="number" placeholder="Score" class="score_in score1" maxlength="2">
			                </div>
	                	</div>

	                	<div class="col-40">			                
			                <div class="unit_in unit1">`+c[k].courseUnit+`</div>			               
	                	</div>
	                </div>
	             </div>
	          </div>
	       </li>`;

                //console.log(r);

                the_str += r;
                i += 1;
            }

            $$("#the-courses").append(the_str);
        }
    });

    let is_error = false;
    $$('.calculate-gp').on('click', function (e) {
        e.preventDefault();


        let k = 0;
        $(".score_in").each(function( index ) {
            //console.log( index + ": " + $( this ).val() );


            //console.log( $(".unit_in").eq(index).val() );


            scores_array[k] = $(".score_in").eq(index).val();
            unit_array[k] = $(".unit_in").eq(index).text()

            if(isNaN(scores_array[k])){
                myApp.alert('Kindly enter a numeric value for all scores', 'Error');
                is_error = true;
                return false;
                //break;
                //
            }

            /*if(isNaN(unit_array[k])){
                myApp.alert('Kindly enter a numeric value in all text box', 'Error');
                return false;
                //
            }*/

            if(scores_array[k] == ""){
                myApp.alert('Please fill all fields', 'Error');
                is_error = true;
                return false;
            }

            /*if(unit_array[k] == ""){
                myApp.alert('Please fill all fields', 'Error');
                return false;
                return;
            }*/

            let the_score = $(".score_in").eq(index).val();
            let the_unit = $(".unit_in").eq(index).text();

            if(is_error == true){
                myApp.alert('Please fill all fields', 'Error');
                return false;
                return;
            }

            var this_point = units(parseFloat(the_score)) * parseFloat(the_unit);

            if(this_point == 0){
                oc_list += 1;
            }
            point_array[k] = this_point;
            total_point += point_array[k];
            total_units += parseFloat(the_unit);
            total_scores += parseFloat(the_score);
            k++;
        });
        //return;

        if(total_scores == 0){
            //myApp.alert('Kindly enter a numeric value for all scores', 'Error');
            return false;
        }


        gpa = total_point/total_units;
        gpa = Math.round(gpa * 100) / 100;

        var semesterGrade = grades(gpa);
        if(oc_list == 0) {
            myApp.alert('Your CGPA is ' + gpa + '<br> Grade is ' + semesterGrade, 'GPA Result');
        }else{
            myApp.alert('Your GPA is ' + gpa + '<br> Grade is ' + semesterGrade + '<br>Outstanding courses : '+oc_list, 'GPA Result');
        }

        /*
        RETURN VARIABLES
         */
        is_error = false;
        total_units = 0;
        total_scores = 0;
        total_point = 0;
        course_code_array = [];
        scores_array = [];
        unit_array = [];
        point_array = [];
        oc_list = 0;
        i = 1;

        //$$('.added').remove();
        $$('.score1').val('');
        //$$('.unit1').val('');
    });
});

	function units(score){
	var ct;	
	if((score>=75) && (score<=100)){
		ct=4.00;
	}
	else if(score>=70 && score<=74){
		ct=3.50;
	}
	else if(score>=65 && score<=69){
		ct=3.25;
	}
	else if(score>=60 && score<=64){
		ct=3.00;
	}
	else if(score>=55 && score<=59){
		ct=2.75;
	}
	else if(score>=50 && score<=54){
		ct=2.50;
	}
	else if(score>=45 && score<=49){
		ct=2.25;
	}
	else if(score>=40 && score<=44){
		ct=2.00;
	}
	else{
		ct=0.00;
	}
	return ct;
}

function grades(status){
	if((status >= 0) && (status < 2.5)){
		return "Pass";
	}
	else if((status >= 2.5) && (status < 3.0)){
		return "Lower Credit";
	}
	else if((status >= 3.0) && (status < 3.5)){
		return "Upper Credit";
	}
	else if((status >= 3.5) && (status <= 4.0)){
		return "Distinction";
	}
}