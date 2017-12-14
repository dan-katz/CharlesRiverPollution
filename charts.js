let gradeData;
let siteData;
let ecoliChart;
let perSwimBoatChart;
d3.json("/river.json", function(data) {
  gradeData = data
  drawGradeChart();
  drawPerSwimBoatChart();
});

d3.json("/sites.json", function(data) {
  siteData = data
  drawEcoliChart();
});


function drawGradeChart() {
  var gctx = document.getElementById("gradeChart").getContext('2d');
  let gradeArr = [];
  gradeData.years.map(y => gradeArr.push(y.grade));
  var myChart = new Chart(gctx, {
    type: 'line',
    data: {
      xLabels: ["1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016"],
      yLabels: ['A+', 'A', 'A-', 'B++', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D'],
      datasets: [{
        fill: false,
            data: gradeArr
        }]
    },
    options: {
      responsive: true,
    title:{
      display: true,
      text: 'EPA Report Card Grades for Charles River Lower Basin '
    },
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Year'
        }
      }],
      yAxes: [{
        type: 'category',
        position: 'left',
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Grade'
        },
        ticks: {
          reverse: true
        },
      }]
    }
  }
  });
};

function drawPerSwimBoatChart() {
  var gctx = document.getElementById("perSwimBoatChart").getContext('2d');
  let swimArr = [];
  let boatArr = [];
  gradeData.years.map(y => {
    swimArr.push(y.perSwim);
    boatArr.push(y.perBoat);

  });
  perSwimBoatChart = new Chart(gctx, {
    type: 'line',
    data: {
      xLabels: ["1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016"],
      datasets: [
        {
            fill: false,
          label: 'Swim Standard',
          backgroundColor: '#0000ff',
          borderColor: '#0000ff',
            data: swimArr
        },
        {
          fill: false,
          label: 'Boat Standard',
          backgroundColor: '#00ff00',
          borderColor: '#00ff00',
          data: boatArr
        }
      ]
    },
    options: {
      responsive: true,
    title:{
      display: true,
      text: 'Sites Meeting Swim and Boat Standards'
    },
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Year'
        }
      }],
      yAxes: [{
        position: 'left',
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Percent'
        },
      }]
    }
  }
  });
};

function drawEcoliChart() {
  var gctx = document.getElementById("ecoliChart").getContext('2d');
  let ecoliArr = siteData.sites[0].ecoliData;
  ecoliChart = new Chart(gctx, {
    type: 'line',
    data: {
      xLabels: ["2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016"],
      fill: false,
        datasets: [{
            data: ecoliArr
        }]
    },
    options: {
      responsive: true,
    title:{
      display: true,
      text: 'Ecoli Data '
    },
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Year'
        }
      }],
      yAxes: [{
        position: 'left',
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Concentration'
        },
      }]
    }
  }
  });
};

function redrawEcoliChart(site) {
  ecoliChart.data.datasets[0].data = site.ecoliData;
  ecoliChart.options.title.text = `Avg E.coli concentration for ${site.description}`
  ecoliChart.update();
}
