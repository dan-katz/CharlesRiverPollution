// using d3 for convenience
var container = d3.select('#scroll');
var graphic = container.select('.scroll__graphic');
var chart = graphic.select('.chart');
var text = container.select('.scroll__text');
var step = text.selectAll('.step');
var riverData
// initialize the scrollama
var scroller = scrollama();
var milestepratio = 2 // TODO come up wth a better ratio
// generic window resize listener event
function handleResize() {
  // 1. update height of step elements
  var stepHeight = Math.floor(window.innerHeight * 0.75);
  // step.style('height', stepHeight + 'px');
  // 2. update width/height of graphic element
  var bodyWidth = d3.select('body').node().offsetWidth;
  graphic
    .style('width', bodyWidth + 'px')
    .style('height', window.innerHeight + 'px');
  var chartMargin = 32;
  var textWidth = text.node().offsetWidth;
  var chartWidth = graphic.node().offsetWidth - textWidth - chartMargin;
  chart
    .style('width', chartWidth + 'px')
    .style('height', Math.floor(window.innerHeight / 2) + 'px');
  // 3. tell scrollama to update new element dimensions
  scroller.resize();
}
// scrollama event handlers
function handleStepEnter(response) {
  // response = { element, direction, index }
  // add color to current step only
  step.classed('is-active', function (d, i) {
    return i === response.index;
  })
  // update graphic based on step
  chart.select('p').text(response.index + 1)
  redrawEcoliChart(riverData.sites[response.index]);
}

function handleContainerEnter(response) {
  // response = { direction }
  // sticky the graphic (old school)
  graphic.classed('is-fixed', true);
  graphic.classed('is-bottom', false);
}

function handleContainerExit(response) {
  // response = { direction }
  // un-sticky the graphic, and pin to top/bottom of container
  graphic.classed('is-fixed', false);
  graphic.classed('is-bottom', response.direction === 'down');
}

function getRiverHeight(riverlength) {
  const scale = 0.2;
  return Math.max(
          Math.floor(window.innerHeight * scale * riverlength),
          window.innerHeight / 2.5);
}

function ecoliToColor(ecoli) {
  if (ecoli <= 126) {
    return "DodgerBlue";
  } else if (ecoli <= 630) {
    return "#ffFF99";
  } else if (ecoli > 630){
    return "OrangeRed";
  } else
    return "gray";

}

d3.json("sites.json", function(data) {
    console.log(data);
    riverData = data
    step = step.data(data.sites).enter()
      .append("div")
        .attr("class", (d) => "step")
        .attr("data-step", (d,i) => i + "")
        .attr("id", (d) => d.id)
        .style("height", (d) => getRiverHeight(d.distance) + "px")
        .style("border-left", (d) => "8px solid " + ecoliToColor(d.latestEcoli))
    .html((d) => `<p>Site ID: ${d.id}</p><p>Site description: ${ d.description }</p><p>Site location: ${d.town}</p><p>River mile: ${d.riverMile}</p>`)
    init()
});

function init() {
  // 1. force a resize on load to ensure proper dimensions are sent to scrollama
  handleResize();
  // 2. setup the scroller passing options
  // this will also initialize trigger observations
  // 3. bind scrollama event handlers (this can be chained like below)
  scroller.setup({
    container: '#scroll',
    graphic: '.scroll__graphic',
    text: '.scroll__text',
    step: '.scroll__text .step',
    debug: false,
  })
    .onStepEnter(handleStepEnter)
    .onContainerEnter(handleContainerEnter)
    .onContainerExit(handleContainerExit);
  // setup resize event
  window.addEventListener('resize', handleResize);
}
// kick things off
