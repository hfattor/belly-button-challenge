// Read in samples.json with D3
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Create a function for a horizontal bar chart to display the top 10 OTUs found on the individual

var BBdata

function barChart(index) {

	let trace1 = {
		type: "bar",
		x: BBdata.samples[index].sample_values.slice(0,10).reverse(),
		y: BBdata.samples[index].otu_ids.map(x => "OTU " + x).slice(0,10).reverse(),
		text: BBdata.samples[index].otu_labels.slice(0,10).reverse(),
		orientation: "h"
	};

	let barChart = [trace1]

	Plotly.newPlot("bar", barChart);

	console.log("Bar Chart Printed")
	
};


// Create a function for a bubble chart that displays the selected individual's sample data

function bubbleChart(index) {

	let trace2 = {
		x: BBdata.samples[index].otu_ids,
		y: BBdata.samples[index].sample_values,
		text: BBdata.samples[index].otu_labels,
		mode: 'markers',
		marker: {
			color: BBdata.samples[index].otu_ids,
			size: BBdata.samples[index].sample_values,
			sizeref: .08,
			sizemode: 'area'
		}
	};

	let bubbleChart = [trace2];

	let layout = {
		showlegend: false,
		xaxis: {
			title: "OTU ID"
		}
	};

	Plotly.newPlot("bubble", bubbleChart, layout);

	console.log("Bubble Chart Printed")
	
};

// Create a function to display the metadata demographic info for each sample

function metaDisplay(index) {
	var subjMetadata = BBdata.metadata[index];
	var panel = d3.select('#sample-metadata');
	panel.html("");
	var rowText;
	console.log(subjMetadata);
	Object.entries(subjMetadata).forEach(([key, value]) => {
		rowText = `${key.toUpperCase()}: ${value}`;
		panel.append('h6').text(rowText);
	});
	

};


// Function to update all plots when a new sample is selected

function optionChanged(value) {
	barChart(value)
	bubbleChart(value)
	metaDisplay(value)

};

// Generate dashboard

d3.json(url).then(

	// Create a dropdown menu for individual samples

	function(data) {

		BBdata = data
		var options = data.samples.map((x, index) => ({id: x.id, index: index}))
		var dropdown = d3.select("#selDataset").selectAll("option").data(options).enter().append("option")

		dropdown.text(function(o) {
			return o.id
		})

		dropdown.attr("value", function(o) {
			return o.index
		})
		for (index = 0; index < data.samples.length; index++) {
		
		
		};


// Run functions for charts and metadata population for individul sample selected in the dropdown

		optionChanged(0)
	
		
	}
);

