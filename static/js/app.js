//get the url


const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Promise Pending
const dataPromise=d3.json(url);
console.log("Data:",dataPromise);

// Fetch the JSON data 
d3.json(url).then(function(data){

console.log(data.names[2]);

  //Create drop down list from names list 
  let myddl=d3.select("select");
  data.names.forEach(name=> myddl.append("option").attr("value",name).text(name));

 //find index code from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
  //selects by html id
  let dropdown=d3.select("#selDataset");
  //when there is a change in the selection, do the function
  dropdown.on("change",function(){
     //captures the userChoice from the ddl as the Test Sample ID (940)
     userChoice=this.value;
    console.log(userChoice);
    //this is the testing function (find where list element = userChoice)
    const userChoiceIndex=(element)=>element==userchoice;
    console.log(userChoiceIndex)
    //takes the userChoice and finds the associated index number 
    nameIndex=data.names.findIndex(userChoiceIndex);
    console.log(nameIndex)
    //clears out the demographic info 
    d3.select(".panel-body").html("");
    //run the following functions with the new nameIndex
    dInfo(nameIndex);
    barChart(nameIndex);
    bubbleChart(nameIndex);
   
  });

  //set default for nameIndex to 0 NEED TO KEEP VAR - doesn't work with LET
  
  var nameIndex=(typeof nameIndex === 'undefined')? 0:nameIndex;
  console.log(nameIndex)

  //DEMOGRAPHIC INFO VISUAL
  //this displays the id, ethnicity, gender, age, location, bellybutton type and wash frequency for the default or selected Test Subject ID
  function dInfo(nameIndex) {
    let demoInfo = data.metadata[nameIndex];
    console.log(demoInfo)
    Object.entries(demoInfo).forEach(([key,value])=> {
    let addDemoData = d3.select('.panel-body').append('h5');
    addDemoData.text(`${key}:  ${value}`)
  })};
  dInfo(nameIndex);

  //BAR CHART VISUAL
 // Use sample_values as the values for the bar chart.

  //Use otu_ids as the labels for the bar chart.

 //Use otu_labels as the hovertext for the chart.
 
  function barChart(nameIndex) {
    //sample_values
    let barX = data.samples[nameIndex].sample_values.slice(0,10).reverse();
    
   //otu_ids, use this to build string for chart
    let barY = data.samples[nameIndex].otu_ids.slice(0,10).reverse();
    
    // use this for bar chart
    let barYstr = []
    
    barY.forEach(pear => barYstr.push(`OTU_${pear}`));
    
    let barZ = data.samples[nameIndex].otu_labels.slice(0,10).reverse();//otu_labels
    console.log(barX)
    console.log(barY)
    console.log(barZ)
    
    let trace1 = {
        x: barX,
        y: barYstr,
        text: barZ,
        type: 'bar',
        orientation: 'h',
       
      };
      let data1 = [trace1];
      
      let layout1 = {
        showlegend: false,
        height: 400,
        width: 500,
        
        margin: { t: 50, 
                  r: 25,
                   l: 75, 
                   b: 35},
        
      };

      Plotly.newPlot("bar", data1,layout1)};
  barChart(nameIndex);

  //BUBBLEPLOT VISUAL
  //Use otu_ids for the x values.
   //Use sample_values for the y values.
   //Use sample_values for the marker size.
    //Use otu_ids for the marker colors.
    //Use otu_labels for the text values.

function bubbleChart(nameIndex) {
    let bubbleX = [data.samples[nameIndex].otu_ids];
    console.log(bubbleX)
    let bubbleY = [data.samples[nameIndex].sample_values];
    console.log(bubbleY)
    let bubbleZ = [data.samples[nameIndex].otu_labels];
    console.log(bubbleZ)
  
   let trace2 = {
      x: bubbleX[0],
      y: bubbleY[0],
      xlimit: 4000,
      text: bubbleZ[0],
      mode: 'markers',
      marker: {
        size: bubbleY[0],
        color: bubbleX[0],
        colorscale: 'Earth'
      }
    };
    let data2 = [trace2];

    let layout2 = {
     
      showlegend: false,
    
      margin: { t: 75, 
                r: 25, 
                l: 50, 
                b: 35 },
     
    
      xaxis: {title:"OTU_ID"},
      
    };
 
  Plotly.newPlot('bubble', data2, layout2)};
  bubbleChart(nameIndex);
 });

