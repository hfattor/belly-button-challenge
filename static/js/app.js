// Read in samples.json with D3
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Create a function for a horizontal bar chart to display the top 10 OTUs found on the individual

var BBdata

function barChart(index) {

	let trace1 = {
		type: "bar",
		x: BBdata.samples[index].sample_values.slice(0,10),
		y: BBdata.samples[index].otu_ids.map(x => "OTU " + x).slice(0,10),
		text: BBdata.samples[index].otu_labels.slice(0,10),
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
	var metadata = BBdata.metadata[index].map((index) => ({
			id: index.id, 
			ethnicity: index.ethnicity,
			gender: index.gender,
			age: index.age,
			location: index.location,
			bbtype: index.bbtype,
			wfreq: index.wfreq})
			)


};




// Update all plots when a new sample is selected

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

	// Create 

		var metadata = data.metadata.map((x) => ({
			id: x.id, 
			ethnicity: x.ethnicity,
			gender: x.gender,
			age: x.age,
			location: x.location,
			bbtype: x.bbtype,
			wfreq: x.wfreq}))

		var metaDisplay = d3.select("#sample-metadata").data(metadata).enter().append("metadata")

		metaDisplay.text(function(m) {
			return m.id, 
				m.ethnicity, 
				m.gender,
				m.age,
				m.location,
				m.bbtype,
				m.freq
		});

		metaDisplay.attr("value", function(m) {
			return m.id, 
				m.ethnicity, 
				m.gender,
				m.age,
				m.location,
				m.bbtype,
				m.freq
		});
		for (index = 0; index < data.metadata.length; index++) {

		}

// Run functions for charts and metadata population for individul sample selected in the dropdown

		barChart(0)
		bubbleChart(0)
		
	}
);






// Deploy app to GitHub Pages