// Read in samples.json with D3
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Create horizontal bar chart to display the top 10 OTUs found on the individual

var BBdata

function barChart(index) {

	let trace1 = {
		x: BBdata.samples[index].otu_ids.map(x => "OTU " + x).slice(0,10),
		y: BBdata.samples[index].sample_values.slice(0,10),
		text: BBdata.samples[index].otu_labels.slice(0,10),
		type: "bar"
	};

	let barChart = [trace1]

	Plotly.newPlot("bar", barChart);

	console.log("Bar Chart Printed")
	
};

function optionChanged(value) {
	barChart(value)


};

d3.json(url).then(
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
		
		
		}

		barChart(0)
		
	}
);


	// Create a dropdown menu for individual samples


// Create a bubble chart that displays each sample

let bubbleData = {
	x: BBdata.otu_ids,
	y: BBdata.sample_values,
	type: "bubble"
}


// Display the sample metadata

// Display each key-value pair from the metadata JSON object

// Update all plots when a new sample is selected



// Generate dashboard

// Deploy app to GitHub Pages