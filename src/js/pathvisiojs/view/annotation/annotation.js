pathvisiojs.view.annotation = function(){
  function render(annotationData) {
    self.annotationData = annotationData;
    var annotation = d3.select("#annotation")
    .data([annotationData]);

    var annotationHeaderText = annotation.select('#annotation-header-text')
    .text(function(d) { return d.header; });

    var annotationIconMove = annotation.select('i.icon-move')
    .on("drag", function(d, i){
      // I think I need to play with absolute positioning for this
      // it doesn't currently work.
      //annotation.attr('transform', 'translate(10 10)');
    });

    var annotationIconRemove = annotation.select('i.icon-remove')
    .on("click", function(d, i){
      annotation.attr('style', 'visibility: hidden;');
    });

    var annotationDescription = annotation.select('#annotation-description')
    .text(function(d) { return d.description; });

    /*
var p = d3.select("#header").selectAll("p")
    .data(annotationData.listItems)
    .text(function(d) {return d.key;});

// Enter…
p.enter().append("p")
    .text(function(d) {return d.key;});

// Exit…
p.exit().remove();
//*/



/*
var tr = d3.select("body").append("table").selectAll("tr")
    .data(matrix)
  .enter().append("tr");

var td = tr.selectAll("td")
    .data(function(d) { return d; })
  .enter().append("td")
    .text(function(d) { return d; });
//*/

    var annotationListItemsContainer = annotation.selectAll('#annotation-items-container')
    .data(function(d) {
      console.log('d annotationListItemsContainer');
      console.log(d);
      console.log([d.listItems]);
      return [d.listItems];
    });

    console.log(annotationListItemsContainer);

    // Update
    var annotationListItems = annotationListItemsContainer.selectAll('li')
    .data(function(d) {
      console.log('d annotationListItems');
      console.log(d);
      return d;
    });

    // Enter
    annotationListItems.enter().append('li');

    // Exit…
    annotationListItems.exit().remove();



    var annotationItemTitles = annotationListItems.selectAll('.annotation-item-title')
    .data(function(d) {
      console.log('d annotationListItems');
      console.log(d);
      return [d.key];
    })
    .enter().append('span')
    .attr('class', 'annotation-item-title')
    .text(function(d) {return d + ': ';});






    // Update
    var annotationItemPlainTextElements = annotationListItems.selectAll('span.annotation-item-text')
    .data(function(d) {
          console.log('d');
          console.log(d);
          return d.values;
          /*
      return d.values.filter(function(element) {
        if (!element.hasOwnProperty('uri')) {
          console.log('annotationItemPlainTextElement');
          console.log(element);
          return element; 
        }
      });
      //*/
    })
    .text(function(d) { return ' ' + d.text; });

    // Enter
    annotationItemPlainTextElements.enter()
    .append('span')
    .attr('class', 'annotation-item-text')
    .text(function(d) { return ' ' + d.text; });

    // Exit…
    annotationItemPlainTextElements.exit().remove();



    /*
    var annotationItemLinkedTextElements = annotationListItems.selectAll('a.annotation-item-text')
    .data(function(d) {
      return d.values.filter(function(element) {
        if (element.hasOwnProperty('uri')) {
          //console.log('annotationItemLinkedTextElement');
          //console.log(element);
          return element; 
        }
      }); 
    })
    .enter().append('a')
    .attr('href', function(d) {return d.uri;})
    .attr('class', 'annotation-item-text')
    .text(function(d) { return ' ' + d.text; });
//*/
    annotation[0][0].style.visibility = 'visible';
  }
      
  return {
    render:render
  };
}();
