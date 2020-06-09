
let countryEl=document.querySelector(".country .name");
let totalCasesEl=document.querySelector(".total-cases .value");
let newCasesEl=document.querySelector(".total-cases .new-value");
let recoveredEl=document.querySelector(".recovered .value");
let newRecoveredEl=document.querySelector(".recovered .new-value");
let deathsEl=document.querySelector(".deaths .value");
let newDeathsEl=document.querySelector(".deaths .new-value");


let drawCan=document.getElementById("linear_chart").getContext("2d"); 
let drawCan2=document.getElementById("linear_chart2").getContext("2d"); 
let drawCan3=document.getElementById("bar_chart").getContext("2d");
let drawCan4=document.getElementById("bar_chart2").getContext("2d");
let drawCan5=document.getElementById("pie_Chart").getContext("2d");

//Stats var
let total_cases_list=[],total_recovery_list=[],
	total_deaths_list=[], formatedDate=[];
let app_data=[];

//let country_code = String(geoplugin_countryCode());
let country_code="GB";
let user_country;
country_list.forEach(country =>{
if(country.code==country_code){
	user_country=country.name;
}

})

function fetchStats(user_country){
total_cases_list=[],total_recovery_list=[],total_deaths_list=[],app_data=[],formatedDate=[];	
fetch(`https://covid19-monitor-pro.p.rapidapi.com/coronavirus/cases_by_days_by_country.php?country=${user_country}`, {
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "covid19-monitor-pro.p.rapidapi.com",
			"x-rapidapi-key": "7e269ec140msh8a5df9cfc21b4b4p1c1e3ejsn9aba26afc6e0"

		}
	})

.then (response=>{
	 return response.json();
})
.then(data=>{
	dates=Object.keys(data);
	dates.forEach(date => {
		let data1=data[date];
		app_data.push(data1);
		formatedDate.push(formatDate(date));
		total_cases_list.push(parseInt(data1.total_cases.replace(/,/g, "")));
		total_deaths_list.push(parseInt(data1.total_deaths.replace(/,/g, "")));
		total_recovery_list.push(parseInt(data1.total_recovered.replace(/,/g, "")));
		
	});

	
})
.then( () => {
	updateUI();
})
.catch( error =>{
	alert(error);
})
}
 fetchStats(user_country);

 //Update function

 function updateUI(){
	 updateStates();
	axisLinearChart();
 }

 function updateStates(){
let last_entry = app_data[app_data.length-1];
let before_last_entry = app_data[app_data.length-2];
countryEl.innerHTML=last_entry.country_name;
totalCasesEl.innerHTML=last_entry.total_cases;
newCasesEl.innerHTML=`new ${last_entry.new_cases||0}`;
recoveredEl.innerHTML=last_entry.total_recovered||0;
newRecoveredEl.innerHTML=`new ${parseInt((last_entry.total_recovered.replace(/,/g ,""))-parseInt(before_last_entry.total_recovered.replace(/,/g ,"")))||0}`;

deathsEl.innerHTML=last_entry.total_deaths;
newDeathsEl.innerHTML=`new ${last_entry.new_deaths || 0}`;

 }
 let my_chart;
 let myDoughnutChart;
 let myBarChart;
 let myBarChart2;
 let myPieChart;
 function axisLinearChart(){

	if(my_chart){
		my_chart.destroy();
	}
	if(myDoughnutChart){
		myDoughnutChart.destroy();
	}
	if(myBarChart){
		myBarChart.destroy();
	}
	if(myBarChart2){
		myBarChart2.destroy();
	}
	if(myPieChart){
		myPieChart.destroy();
	}
	let last_entry = app_data[app_data.length-1];
	my_chart = new Chart(drawCan, {
		type: 'line',
		data: {
			datasets: [{
				label: 'Cases',
				data: total_cases_list,
				fill: false,
				borderColor : "#f47100",
				backgroundColor:"#f47100"
			},{
				label: 'Recovered',
				data: total_recovery_list,
				fill: false,
				borderColor : "#09af00",
				backgroundColor:"#09af00"
			},{
				label: 'Deaths',
				data: total_deaths_list,
				fill: false,
				borderColor : "#D50000",
				backgroundColor:"#D50000"
			}
			
		],
			labels: formatedDate
		},
		options: {
			responsive:true,
			maintainAspectRatio : false
		}
	});

    let totalCases1=parseInt(last_entry.total_cases.replace(/,/g ,""));
	let totalRecovery1=parseInt(last_entry.total_recovered.replace(/,/g ,""));
    let totalDeaths1=parseInt(last_entry.total_deaths.replace(/,/g ,""));
	
	myDoughnutChart = new Chart(drawCan2, {
		
		type: 'doughnut',
		data:{
			datasets: [{
				
			data:[
				totalCases1,
				
			
				
				totalRecovery1,
				totalDeaths1],

				//borderColor:["#f47100","#09af00","#D50000"],
				backgroundColor:["#f47100","#09af00","#D50000"]
		
			},
			
			
		],
			labels: ["Total cases","Recovered","Deaths"],

			
		},
		options: {
			responsive:true,
			maintainAspectRatio : false,
			animateRotate:false,
			animateScale:true
		}
	});

   myBarChart = new Chart(drawCan3, {
    type: 'bar',
    data: { labels: formatedDate,
    datasets: [{
      label:"Total Cases",
      borderColor:"#fff",
      backgroundColor:"#f47100",
        barPercentage: 0.5,
        barThickness: 3,
        maxBarThickness: 8,
        minBarLength: 2,
        data: total_cases_list,
       
    }]
},
    options: {
			responsive:true,
			maintainAspectRatio : false
		}
});

myBarChart2 = new Chart(drawCan4, {
    type: 'bar',
    data: { labels: formatedDate,
    datasets: [{
      label:"Total Recovery",
      borderColor:"#fff",
      backgroundColor:"#09af00",
        barPercentage: 0.5,
        barThickness: 3,
        maxBarThickness: 8,
        minBarLength: 2,
        data: total_recovery_list,
       
    }]
},
    options: {
			responsive:true,
			maintainAspectRatio : false
		}
});

myPieChart = new Chart(drawCan5, {
		type: 'pie',
		data:{
			datasets: [{
				
			data:[
				totalCases1,
				
			
				
				totalRecovery1,
				totalDeaths1],

				//borderColor:["#f47100","#09af00","#D50000"],
				backgroundColor:["#f47100","#09af00","#D50000"]
		
			},
			
			
		],
			labels: ["Total cases","Recovered","Deaths"],

			
		},
		options: {
			responsive:true,
			maintainAspectRatio : false,
			animateRotate:false,
			animateScale:true
		}
	});
	console.log(typeof(totalRecovery1));

 }

 //Months
 const months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

 function formatDate(dateString){
let date=new Date(dateString);
return `${date.getDate()} ${months[date.getMonth()]}`;
 }
