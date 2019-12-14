var pageNow = 1;
var maxPage = 6;



function showNext() {
	$("#Page" + pageNow).removeClass('hideLast, showNext');
	$("#Page" + pageNow++).addClass('hideLast');   
	$("#Page" + pageNow).removeClass('showNext, hideLast');       
	$("#Page" + pageNow).removeClass('hideLast');
	$("#Page" + pageNow).addClass('showNext');
  if (pageNow == 2 || pageNow == 3  || pageNow == maxPage) {
    $("#btnRight").css("visibility", "hidden");
  }
  if (pageNow == 5) {
    drawChartDonut('chartdiv', selectedAnswers['q1'], chartQuestion1);
  }
  if (pageNow == 6) {
    drawSecondChart();
  }
  
  if (pageNow == 2) {
    $('.formPage2').addClass('view').removeClass('hide');
    $('.formPage3').addClass('hide').removeClass('view');
    $("#barColor").animate({
      width: "50%"
    },"slow"); 
    $("#barColor").css('background', '#e4a6b7');
    $('#bar').css("visibility", "visible");
  }
  else if (pageNow == 3) {
    $('.formPage3').addClass('view').removeClass('hide');
    $('.formPage2').addClass('hide').removeClass('view');
    $("#barColor").animate({
      width: "100%"
    },"slow");
    $("#barColor").css('background', '#b6afd6'); 
    $('#bar').css("visibility", "visible");
  }
  else 
    $('#bar').css("visibility", "hidden");
}

function showPrev() {
  $("#Page" + pageNow).removeClass('hideLast, showNext');
  $("#Page" + pageNow--).addClass('hideLast');   
  $("#Page" + pageNow).removeClass('showNext, hideLast');       
  $("#Page" + pageNow).removeClass('hideLast');
  $("#Page" + pageNow).addClass('showNext');
  if (pageNow == 1) {
    hiddenArrow();
  }

  if (pageNow == maxPage -1) {
    $("#btnRight").css("visibility", "visible");  
  }

  if (pageNow == 2) {
    $('.formPage2').addClass('view').removeClass('hide');
    $('.formPage3').addClass('hide').removeClass('view');
    $("#barColor").animate({
      width: "50%"
    },"slow"); 
    $("#barColor").css('background', '#e4a6b7');
    $('#bar').css("visibility", "visible");
  }
  else if (pageNow == 3) {
    $('.formPage3').addClass('view').removeClass('hide');
    $('.formPage2').addClass('hide').removeClass('view');
    $("#barColor").animate({
      width: "100%"
    },"slow");
    $("#barColor").css('background', '#b6afd6'); 
    $('#bar').css("visibility", "visible");
  }
  else 
    $('#bar').css("visibility", "hidden");
}

function showArrow() {
  $(".barButton").addClass('barFixBottom');  
}

function hiddenArrow() {
  $(".barButton").removeClass('barFixBottom');  
}

$("label").click(function(){  
	$("label").removeClass("labelSelected");
	$(this).addClass("labelSelected");   
});

var selectedAnswers = {
	q1: 0,
	q2: 0,
	q3: 0,
	q4: 0
};

var chartQuestion1  = [
	{
		"value": 28,
		"category": "Chief Executive Officer",
		"color":"#00338D"
	},
	{	"category": "Head of Finance",
		"value": 22,
		"color":"#6D2077"
	},
	{
		"category": "Head of Treasury",
		"value": 19,
		"color":"#470A68"
	},
	{
		"category": "General Counsel",
		"value": 16,
		"color":"#00a3a1"
	},
	{
		"category": "Other",
		"value":15,
		"color":"#005EB8"
	}
];



var chart ;

function drawChartDonut(idChart, optionChosen, values ) {

data = [];

for (var i = 1 ; i<= values.length; i++) {
if (i == optionChosen) {
	data.unshift({
	"category": values[i-1].category,
	"value": values[i-1].value,
	"color": values[i-1].color,
	"chosen": 1,
	"clr":"#fff"
	});
}
else {
	data.push({
	"category": values[i-1].category,
	"value": values[i-1].value,
	"color": values[i-1].color,
	"chosen": 0,
	"clr":"#fff"
	});
}
}               


chart = AmCharts.makeChart( 'chartdiv', {
	"type": "pie",
	"outlineColor": "",
	"theme": "light",
	"addClassNames": true,
	"dataProvider": data,
	"titleField": "category",
	"fillColors":"red",
	"valueField": "value",
	"labelRadius": 25,                                                                              
	"colorField":"color",
	"radius": "30%",
	"innerRadius": "68%",
	"labelText": "[[title]]",
	"fontSize":9,
	"showBalloon": false,
	"balloon": {
	"fixedPosition": true
	},
	"listeners": [{
	"event": "rendered",
	"method": updateLabels
	}, {
	"event": "drawn",
	"method": updateLabels
	}]
});

}

function updateLabels(event) {
	$(".amcharts-pie-label").each(function() {   
	// init and find parent
	var label = this;
	var parent = this.parentNode;
	var text = label.children[0].innerHTML;
	label.setAttribute("fill","white");
	label.setAttribute("font-size","18px");                 

// create image
$(event.chart.dataProvider).each( function() {
	if (this.category == text && this.chosen == 1) { 

	var element = document.getElementById("svgAnswer1");
  if(element)
  	element.parentNode.removeChild(element);

  divAnswer1 = document.getElementById('answer1');
  svg= document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.style.width = "100%";
  svg.style.height = "100%";
  svg.setAttribute('id', 'svgAnswer1');
  circle1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle1.setAttribute('cx', ($(divAnswer1).width()/3)-50);
  circle1.setAttribute('cy', 150);
  circle1.setAttribute('r', 100);
  circle1.setAttribute('fill', "none");
  circle1.setAttribute('stroke', 'white');
  circle1.setAttribute('stroke-width', 2);
  circle2.setAttribute('cx', ($(divAnswer1).width()/3)-50);
  circle2.setAttribute('cy', 150);
  circle2.setAttribute('r', 95);
  //circle2.setAttribute('stroke', 'black');
  //circle2.setAttribute('stroke-width', 0);  
  circle2.setAttribute('fill', this.color);
  //circle2.setAttribute('fill-opacity', '0.45');
  text= document.createElementNS("http://www.w3.org/2000/svg", "text");
  text.setAttribute('fill', '#fff');
  text.setAttribute('x', ($(divAnswer1).width()/3)-52);
  text.setAttribute('y', 160);
  text.setAttribute('text-anchor', 'middle');
  text.style.fontSize = '60px';
  textNode = document.createTextNode(this.value + '%');

  var yourAns = document.createElementNS('http://www.w3.org/2000/svg', "text");
		var yourAnsNode = document.createTextNode("Your Answer");
		yourAns.setAttribute('x', ($(divAnswer1).width()/3)+ 55);
  yourAns.setAttribute('y', 100);
		$(yourAns).css("fill","white").css("font-size","40px").css("text-anchor","start")
		yourAns.appendChild(yourAnsNode);
  text.appendChild(textNode);
  svg.appendChild(circle1);
  svg.appendChild(circle2);
  svg.appendChild(text);
  svg.appendChild(yourAns);
  divAnswer1.appendChild(svg);
}

});
});

//$("#chartdiv").children().eq(0).children().eq(0).children().eq(0).css({top: 45, left: 0, position:'relative'})
}

function catchValue(e, x, q){	
  if($(x).hasClass('view')) {
     selectedAnswers[q] =  $(x).children().eq(0).val();
	   $("#btnRight").css("visibility", "visible");
  }
}





/*--second Chart*/

function drawSecondChart() {
	setTimeout( function(){
	
	var answer2 = $("#answer2");

		TweenLite.to(answer2, 4, {
		   opacity:1, delay:1});



 gaugeChart = AmCharts.makeChart("chartdiv2", {
  "type": "gauge",
  "theme": "light",
  "showBalloon": false,
  "axes": [{
    "axisAlpha": 0,
    "tickAlpha": 0,
    "labelsEnabled": false,
    "startValue": 0,
    "endValue": 100,
    "startAngle": 0,
    "endAngle": 270,
    "bands": [{
      "color": "#FFF",
      "startValue": 0,
      "endValue": 100,
      "radius": "100%",
      "innerRadius": "85%"
    }, {
      "color": "#00338D",
      "startValue": 0,
      "endValue": 0,
      "radius": "100%",
      "innerRadius": "85%",
      "balloonText": "90%"
    }, {
      "color": "#FFF",
      "startValue": 0,
      "endValue": 100,
      "radius": "80%",
      "innerRadius": "65%"
    }, {
      "color": "#00a3a1",
      "startValue": 0,
      "endValue": 0,
      "radius": "80%",
      "innerRadius": "65%",
      "balloonText": "35%"
    }, {
      "color": "#FFF",
      "startValue": 0,
      "endValue": 100,
      "radius": "60%",
      "innerRadius": "45%"
    }, {
      "color": "#C6007E",
      "startValue": 0,
      "endValue": 92,
      "radius": "60%",
      "innerRadius": "45%",
      "balloonText": "92%"
    }]
  }],
  "allLabels": [{
    "text": "Yes (Publically available)",
    "x": "49%",
    "y": "5%",
    "size": 15,
    "bold": true,
    "color": "#00338D",
    "align": "right"
  }, {
    "text": "Yes (Internal use only)",
    "x": "49%",
    "y": "15%",
    "size": 15,
    "bold": true,
    "color": "#00a3a1",
    "align": "right"
  }, {
    "text": "No",
    "x": "49%",
    "y": "24%",
    "size": 15,
    "bold": true,
    "color": "#6d2077",
    "align": "right"
  }],
  "export": {
    "enabled": true
  },
	  "listeners": [{
		"event": "init",
		"method": animateGauge
		}]
});



}, 1000);


}

function animateGauge(Event) {
  console.log("Initiated!");
  // adjust green band
  Event.chart.axes[0].bands[1].setEndValue(100);
  Event.chart.axes[0].bands[1].setStartValue(15);
  // adjust yellow band
  Event.chart.axes[0].bands[3].setEndValue(60);
  // adjust red band
  Event.chart.axes[0].bands[5].setEndValue(50);
  Event.chart.axes[0].bands[5].setStartValue(10);

  // adjust blue band

  indice = ((selectedAnswers.q2) == 1 ? 1: (selectedAnswers.q2 == 2? 3: 5));

  var element = document.getElementById("svgAnswer2");
  if(element)
  	element.parentNode.removeChild(element);

  divAnswer2 = document.getElementById('answer2');
  svg= document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.style.width = "100%";
  svg.style.height = "100%";
  svg.setAttribute('id', 'svgAnswer2');
  circle1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle1.setAttribute('cx', ($(divAnswer2).width()/3)-50);
  circle1.setAttribute('cy', 150);
  circle1.setAttribute('r', 100);
  circle1.setAttribute('fill', "none");
  circle1.setAttribute('stroke', 'white');
  circle1.setAttribute('stroke-width', 2);
  circle2.setAttribute('cx', ($(divAnswer2).width()/3)-50);
  circle2.setAttribute('cy', 150);
  circle2.setAttribute('r', 95);
  //circle2.setAttribute('stroke', 'black');
  //circle2.setAttribute('stroke-width', 0);  
  circle2.setAttribute('fill', Event.chart.axes[0].bands[indice].color);
  //circle2.setAttribute('fill-opacity', '0.45');
  text= document.createElementNS("http://www.w3.org/2000/svg", "text");
  text.setAttribute('fill', '#fff');
  text.setAttribute('x', ($(divAnswer2).width()/3)-48);
  text.setAttribute('y', 170);
  text.setAttribute('text-anchor', 'middle');
  text.style.fontSize = '60px';
  textNode = document.createTextNode(Event.chart.axes[0].bands[indice].balloonText);

  var yourAns = document.createElementNS('http://www.w3.org/2000/svg', "text");
		var yourAnsNode = document.createTextNode("Your Answer");
		yourAns.setAttribute('x', ($(divAnswer2).width()/3)+ 55);
  yourAns.setAttribute('y', 100);
		$(yourAns).css("fill","white").css("font-size","40px").css("text-anchor","start")
		yourAns.appendChild(yourAnsNode);
  text.appendChild(textNode);
  svg.appendChild(circle1);
  svg.appendChild(circle2);
  svg.appendChild(text);
  svg.appendChild(yourAns);
  divAnswer2.appendChild(svg);


};
 
$(document).ready(function(){
	/*$(".nextBtn").click(function(){
	$(".bar").animate({
		width: "+=500px"
	},"fast");  
  })
	
  $(".prevBtn").click(function(){
	$(".bar").animate({
		width: "-=500px"
	},"fast");  
  });*/

  $('#bar').width (($(window).width() - 200) + 'px' );

  $(window).resize(function(){
    $('#bar').width (($(window).width() - 200) + 'px' );
  });
});






