  $('#calculate').click(function(){
    var initial = $('#initialInvestment').val();
    var total = initial;
    var count = 1;
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
    for(i = 0; i < years; i++)
    {
      total = +total + +additions;

      dividend = +total * (+divPerc/100);
      totalDiv = +totalDiv + +dividend;

      increase = +total * (+growthPerc/100);
      totalGrowth = +totalGrowth + +increase;


      total = +total + (+dividend + +increase);
    }

    var bar = +initPlusAdd + +totalGrowth + +totalDiv;
    dividend = Math.round(100*(+totalDiv/+bar));
    increase = Math.floor(100*(+totalGrowth/+bar));
    var start = Math.round(100*(+initPlusAdd/+bar));

    var tr = '<tr><td>' + count + '</td><td> ' + initial + '</td><td> ' + years + '</td><td> ' + month + '</td><td> ' + Math.floor(total) + '</td></tr>';
    $('#table').append(tr);
    count = +count + 1;

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
