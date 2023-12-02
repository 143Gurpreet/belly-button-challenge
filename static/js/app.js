// Define optionChanged globally so it's available as soon as the script runs
window.optionChanged = function(userChoice) {
  // This function will be filled in once the data is loaded
};

const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

d3.json(url).then(function(data) {
  console.log("Fetched Data:", data);
  // Create a dropdown list from the names list
  let myddl = d3.select("#selDataset");
  data.names.forEach(name => myddl.append("option").attr("value", name).text(name));

  // Fill in the details of optionChanged now that data is available
  window.optionChanged = function(userChoice) {
      let nameIndex = data.names.indexOf(userChoice);
      console.log("Selected:", userChoice, "Index:", nameIndex);
      updateDashboard(nameIndex);
  };

  // Initialize the dashboard with the first sample's data
  optionChanged(data.names[0]);

  function updateDashboard(nameIndex) {
      dInfo(nameIndex);
      barChart(nameIndex);
      bubbleChart(nameIndex);
  }


    // Demographic Info Visual
    function dInfo(nameIndex) {
      let metadata = data.metadata[nameIndex];
      console.log("Demographic Info:", metadata);
      let panel = d3.select('#sample-metadata');
      panel.html("");
      Object.entries(metadata).forEach(([key, value]) => {
          panel.append('h6').text(`${key}: ${value}`);
      });
    }

    // Bar Chart Visual
    function barChart(nameIndex) {
    
        let barX = data.samples[nameIndex].sample_values.slice(0, 10).reverse();
        let barY = data.samples[nameIndex].otu_ids.slice(0, 10).reverse();
        let barYstr = barY.map(pear => `OTU_${pear}`);
        let barZ = data.samples[nameIndex].otu_labels.slice(0, 10).reverse();

        let trace1 = {
            x: barX,
            y: barYstr,
            text: barZ,
            type: 'bar',
            orientation: 'h',
        };

        let layout1 = {
            showlegend: false,
            height: 400,
            width: 500,
            margin: { t: 50, r: 25, l: 75, b: 35 }
        };

        Plotly.newPlot("bar", [trace1], layout1);
    }

    // Bubble Plot Visual
    function bubbleChart(nameIndex) {
      
        let bubbleX = data.samples[nameIndex].otu_ids;
        let bubbleY = data.samples[nameIndex].sample_values;
        let bubbleZ = data.samples[nameIndex].otu_labels;

        let trace2 = {
            x: bubbleX,
            y: bubbleY,
            text: bubbleZ,
            mode: 'markers',
            marker: {
                size: bubbleY,
                color: bubbleX,
                colorscale: 'Earth'
            }
        };

        let layout2 = {
            showlegend: false,
            margin: { t: 75, r: 25, l: 50, b: 35 },
            xaxis: { title: "OTU_ID" }
        };

        Plotly.newPlot('bubble', [trace2], layout2);
    }
});
