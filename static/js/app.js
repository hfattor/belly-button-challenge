// Read in samples.json with D3
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

	// Fetch the JSON data, store and console log it
d3.json(url).then(
	function(data) {
		let BBdata = data;
  		console.log(data);
	}
);

// Create horizontal bar chart to display the top 10 OTUs found on the individual

let trace1 = {
	x: BBdata.samples.sample_values,
	y: BBdata.samples.otu_ids,
	type: "bar"
};

let barChart = [trace1];

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