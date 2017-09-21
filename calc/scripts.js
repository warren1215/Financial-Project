  var count = +1;
  $('#calculate').click(function(){

    var initial = $('#initialInvestment').val();
    var total = initial;
    var divPerc = $('#dividend').val();
    var growthPerc = $('#growth').val();
    var years = $('#years').val();
    var additions = $('#monthlyAdd').val();
    var month = additions;
    additions = additions * 12;
    var dividend = 0.0;
    var increase = 0.0;

    var initPlusAdd = +initial + (+additions * +years);

    var totalDiv = 0.0;
    var totalGrowth = 0.0;

    $('#graphContainer').empty();
    $('#graphContainer').append('<canvas id="lineChart" height="200" width="400"></canvas>');
    var ctx = document.getElementById('lineChart').getContext('2d');
    var lineChart = new Chart(ctx, {
    type: 'line',

    data: {
        labels: [],
        datasets: [{
            label: "Investment Growth",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [],
        }]
    },
    options : {
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Investment'
          }
        }]

      }
    }

  });

    var counter = +0;
    if(years < 5)
    {
      for(var i = 0; i <= years; i++)
      {
        lineChart.data.labels[counter] = i;
        counter++;
      }
    }

    else
    {
      for(var i = 0; i <= years; i+=Math.round(+(years/10), 1))
      {
        lineChart.data.labels[counter] = i;
        counter++;
      }
    }
    lineChart.update();

    if(lineChart.data.labels[counter-1] != years)
    {
      lineChart.data.labels[counter-1] = years;
    }

    var chartData = +0;

    for(i = 0; i < years; i++)
    {
      if(i==lineChart.data.labels[chartData])
      {
        lineChart.data.datasets[0].data[chartData] = total;
        chartData++;
      }


      total = +total + +additions;
      console.log(total);
      dividend = +total * (+divPerc/100);
      totalDiv = +totalDiv + +dividend;

      increase = +total * (+growthPerc/100);
      totalGrowth = +totalGrowth + +increase;


      total = +total + (+dividend + +increase);
    }
    lineChart.data.datasets[0].data[chartData] = total;
    lineChart.update();

    var bar = +initPlusAdd + +totalGrowth + +totalDiv;
    dividend = Math.round(100*(+totalDiv/+bar));
    increase = Math.floor(100*(+totalGrowth/+bar));
    var start = Math.round(100*(+initPlusAdd/+bar));

    var tr = '<tr><td>' + count + '</td><td> ' + "$" + initial + '</td><td> ' + years + '</td><td> ' + "$" + month + '</td><td> ' + "$" + Math.floor(total) + '</td></tr>';
    $('#table').append(tr);
    count = +count + 1;

    $('#alert').css("visibility", "visible");
    $('#alert').empty();
    $('#alert').append("Final investment after " + years + " years: $" + Math.floor(total));

    if(start > 0)
    {
      $('#blueBar').css("width", start+'%');
      $('#blueBar').css("visibility", "visible");
    }
    else
    {
      $('#blueBar').css("visibility", "hidden");
    }

    if(dividend > 0)
    {
      $('#yellowBar').css("width", dividend+'%');
      $('#yellowBar').css("visibility", "visible");
    }
    else
    {
      $('#yellowBar').css("visibility", "hidden");
    }

    if(increase > 0)
    {
      $('#greenBar').css("width", increase+'%');
      $('#greenBar').css("visibility", "visible");
    }
    else
    {
      $('#greenBar').css("visibility", "hidden");
    }
  })

  $('#clear').click(function(){
    $('#graphContainer').empty();
    count = +1;
    $('#table tbody').empty();
    $('#alert').css("visibility", "hidden");
    $('#blueBar').css("visibility", "hidden");
    $('#yellowBar').css("visibility", "hidden");
    $('#greenBar').css("visibility", "hidden");
  })
