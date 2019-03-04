function optionSelected(id) {
		 var x = document.getElementById("selDataset")
		 var y = document.getElementById("selChartType")  
		 var x_sel = x.options [x.selectedIndex].value
		 var y_sel = y.options [y.selectedIndex].value
		 if (x_sel == 'Subscribers'){
			    getSubscribersData(x_sel,y_sel)
			 }
		 else if (x_sel == 'Videouploads'){
			    getVideouploadsData(x_sel,y_sel)
			 }
		 else{
			  getVideoviewsData(x_sel, y_sel)
			  }	
}

function getSubscribersData(plot_dataset,chartType) {
	d3.json("/subscribers").then((Data) => {
		if (chartType == 'Pie'){
			buildPieChart(Data,plot_dataset)
		}
		else {
			buildBarChart(Data,plot_dataset)
		}
     });
}

function getVideoviewsData(plot_dataset, chartType) {
  d3.json("/videoviews").then((Data) => {
		if (chartType == 'Pie'){
			buildPieChart(Data,plot_dataset)
		}
		else {
			buildBarChart(Data,plot_dataset)
		}
     });
}

function getVideouploadsData(plot_dataset, chartType) {
  d3.json("/videouploads").then((Data) => {
		if (chartType == 'Pie'){
			buildPieChart(Data,plot_dataset)
		}
		else {
			buildBarChart(Data,plot_dataset)
		}
     });
}

function buildPieChart(Data,plot_dataset) {
		if (plot_dataset == 'Subscribers'){
			var data = [{
			values: Data.Subscribers.slice(0,10),
			labels: Data.Channelname.slice(0,10),
			type: 'pie'
		  }];
		    var layout = {
			title: "Top 10 Channels by Subscribers",
			paper_bgcolor: "#060606"
			}
		}
		else if (plot_dataset == 'Videouploads'){
			var data = [{
			values: Data.Videouploads.slice(0,10),
			labels: Data.Channelname.slice(0,10),
			type: 'pie'
		  }];
		    var layout = {
			title: "Top 10 Channels by Video uploads",
			paper_bgcolor: "#060606"
			}
		}
		else {
			var data = [{
			values: Data.Videoviews.slice(0,10),
			labels: Data.Channelname.slice(0,10),
			type: 'pie'
		  }];
			var layout = {
			title: "Top 10 Channels by Video views",
			paper_bgcolor: "#060606"
			}
		}	
		  Plotly.newPlot('chart', data, layout,{responsive: true});
		}

function buildBarChart(Data,plot_dataset) {
		if (plot_dataset == 'Subscribers'){
			  var data = [{
				x: Data.Channelname.slice(0,10),
				y: Data.Subscribers.slice(0,10),
				type: 'bar'
			  }];
			  var layout = {
				title: "Top 10 Channels by Subscribers",
				xaxis: { title: "Channel Name"},
				yaxis: { title: "Number of Subscribers"},
				plot_bgcolor: "#060606",
				paper_bgcolor: "#060606",
				}
			}
		else if (plot_dataset == 'Videouploads'){
			  var data = [{
				x: Data.Channelname.slice(0,10),
				y: Data.Videouploads.slice(0,10),
				type: 'bar'
			  }];
			  var layout = {
				title: "Top 10 Channels by Video uploads",
				xaxis: { title: "Channel Name"},
				yaxis: { title: "Number of video uploads"},
				plot_bgcolor: "#060606",
				paper_bgcolor: "#060606",
				}
			}
		else {
			  var data = [{
				x: Data.Channelname.slice(0,10),
				y: Data.Videoviews.slice(0,10),
				type: 'bar'
			  }];
			  var layout = {
				title: "Top 10 Channels by Video views",
				xaxis: { title: "Channel Name"},
				yaxis: { title: "Number of Video views"},
				plot_bgcolor: "#060606",
				paper_bgcolor: "#060606"
				}
		}
  
  Plotly.newPlot('chart', data, layout,{responsive: true});
}

// Include the core fusioncharts file from core  -
// import FusionCharts from 'fusioncharts/core';

// // Include the chart from viz folder
// // E.g. - import ChartType from fusioncharts/viz/[ChartType]
// import Column2D from 'fusioncharts/viz/column2d';

// // Include the fusion theme
// import FusionTheme from 'fusioncharts/themes/es/fusioncharts.theme.fusion'

// const dataSource = {
//   "data": [Data]}
// function buildtreeChart(Data,plot_dataset) {
// 	if (plot_dataset == 'Subscribers'){
// 		FusionCharts.ready(function() {
// 			var myChart = new FusionCharts({
// 				 type: "treemap",
// 				 renderAt: "chart-container",
// 				 width: "100%",
// 				 height: "100%",
// 				 dataFormat: "json",
// 				 dataSource,
// 			}).render()
// 	 })}
// elseif (plot_dataset == 'Videouploads'){

// FusionCharts.ready(function() {
// 	var myChart = new FusionCharts({
// 		 type: "treemap",
// 		 renderAt: "chart-container",
// 		 width: "100%",
// 		 height: "100%",
// 		 dataFormat: "json",
// 		 dataSource,
// 	}).render()
// })};

optionSelected()
