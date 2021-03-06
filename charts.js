let gradeData;
let siteData;
let ecoliChart;
let perSwimBoatChart;
d3.json("https://dan-katz.github.io/CharlesRiverPollution/river.json", function(data) {
  gradeData = data
  drawGradeChart();
  drawPerSwimBoatChart();
});

d3.json("https://dan-katz.github.io/CharlesRiverPollution/sites.json", function(data) {
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
        data: gradeArr,
        borderColor: '#8a2be2',
        backgroundColor: '#8a2be2',
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
          backgroundColor: '#1e90ff',
          borderColor: 'DodgerBlue',
          data: swimArr
        },
        {
          fill: false,
          label: 'Boat Standard',
          backgroundColor: '#e59400',
          borderColor: '#e59400',
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
        display: true,
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
      text: `Avg E. coli concentration for ${siteData.sites[0].description}`
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
          labelString: 'Concentration (MPN/100mL)'
        },
      }]
    },
      annotation: {
        annotations: [
          {
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: '630',
            borderColor: '#e59400',
            borderWidth: 2,
            label: {
              content: 'Boat Standard',
              enabled: true,
              position: 'left',
            }
          },
          {
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: '126',
            borderColor: 'DodgerBlue',
            borderWidth: 2,
            label: {
              content: 'Swim Standard',
              enabled: true,
              position: 'left',
            }
          },

        ],
        drawTime: "afterDraw" // (default)
      }
  }
  });
};

function redrawEcoliChart(site) {
  ecoliChart.data.datasets[0].data = site.ecoliData;
  ecoliChart.options.title.text = `Avg E. coli concentration for ${site.description}`
  ecoliChart.update();
}
