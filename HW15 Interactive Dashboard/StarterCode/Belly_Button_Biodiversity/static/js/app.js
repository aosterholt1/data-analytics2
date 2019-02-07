function buildMetadata(sample) {

    var url = "/metadata/" + sample;
    d3.json(url).then(function(sample){
      
    var sample_data = d3.select("#sample-metadata");
    sample_data.html("");
    Object.entries(sample).forEach(([key, value]) => {
      var row = sample_data.append("p");
      row.text(`${key}: ${value}`);
  
    })
  })
};
  
function buildCharts(sample) {

  var url = `/samples/${sample}`;
  d3.json(url).then(function(data) {
    var xVal = data.otu_ids;
    var yVal = data.sample_values;
    var tValues = data.otu_labels;
    var mSize = data.sample_values;
    var Clrs = data.otu_ids;
    var bubblevis = {
      x: xVal,
      y: yVal,
      text: tValues,
      mode: 'markers',
      marker: {
        size: mSize,
        color: RGB
      }
    };

    var data = [bubblevis];

    var chart_layout = {
      xaxis: {title: "OTU ID"}
    };

    Plotly.newPlot('bubble', data, chart_layout);

    d3.json(url).then(function(data) {
      var pieValue = data.sample_values.slice(0,30);
      var pielabel = data.otu_ids.slice(0, 20);
      var pieHover = data.otu_labels.slice(0, 15);

      var data = [{
        values: pieValue,
        labels: pielabel,
        hovertext: pieHover,
        type: 'pie'
      }];

      Plotly.newPlot('pie', data);
  });
  });

};

function init() {
  var selector = d3.select("#selDataset");

  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  
  buildCharts(newSample);
  buildMetadata(newSample);
}

init();
