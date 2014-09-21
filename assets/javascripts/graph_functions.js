// script type="text/javascript"

  $(document).ready(function () {
    $(window).resize(function(){
    drawChart();
    });
  });
  // Load the Visualization API and the piechart package.
  google.load('visualization', '1.0', {'packages':['corechart']});

  // Set a callback to run when the Google Visualization API is loaded.
  google.setOnLoadCallback(drawChart);

    // Callback that creates and populates a data table,
  // instantiates the pie chart, passes in the data and
  // draws it.

  function drawChart() {

    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Keyword');
    data.addColumn('number', 'Ratio');
    data.addRows([
      ['IndyRef', 5],
      ['Hackathon', 3],
      ['Castle', 1],
      ['iPhone 6', 4],
      ['Scotland', 2]
    ]);

    // Set chart options
    var options = {'title':'What people are tweeting about',
                   'backgroundColor': { fill:'transparent' },
                   'colors': ['#003856', '#005A89', '#007BBC', '#009CEF', '#23B3FF']
                  };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(data, options);

    var data2 = google.visualization.arrayToDataTable([
      ['Time', 'Tweets'],
      ['00',  1100],
      ['01',  850],
      ['02',  660],
      ['03',  520],
      ['04',  400],
      ['05',  550],
      ['06',  670],
      ['07',  910],
      ['08',  1050],
      ['09',  1130],
      ['10',  1250],
      ['11',  1500],
      ['12',  1680],
      ['13',  1790],
      ['14',  2310],
      ['15',  2480],
      ['16',  2500],
      ['17',  2460],
      ['18',  2390],
      ['19',  2200],
      ['20',  1890],
      ['21',  1680],
      ['22',  1440],
      ['23',  1220],
    ]);

    var options = {
      title: 'Edinburgh Tweets per hour',
      hAxis: {title: 'Time', titleTextStyle: {color: '#003856'}},
      legend: { position: "none" },
      backgroundColor: { fill:'transparent' },
      bar: { color:'#007BBC' }
    };

    var chart = new google.visualization.ColumnChart(document.getElementById('column_chart_div'));

    chart.draw(data2, options);

}
