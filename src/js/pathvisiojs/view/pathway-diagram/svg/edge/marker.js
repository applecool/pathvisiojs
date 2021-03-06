pathvisiojs.view.pathwayDiagram.svg.edge.marker = function(){
  'use strict';

  // the way SVG works makes this code more complex than it should need to be. Essentially, we
  // are trying to reuse the markers defined in the SVG template, but we also need to be able
  // to handle whether any marker is desired, whether the desired marker exists in the pathway
  // template svg, whether it is at the start or end of a path and whether
  // a color other than black (the color specified in the template) is desired.

  var svg;

  var semanticNameToIdMapping = {
    'arrow':'shape-library-markers-arrow-svg',
    'necessary-stimulation':'shape-library-markers-mim-necessary-stimulation-svg',
    'binding':'shape-library-markers-mim-binding-svg',
    'conversion':'shape-library-markers-mim-conversion-svg',
    'stimulation':'shape-library-markers-mim-stimulation-svg',
    'modification':'shape-library-markers-mim-modification-svg',
    'catalysis':'shape-library-markers-mim-catalysis-svg',
    'inhibition':'shape-library-markers-mim-inhibition-svg',
    'cleavage':'shape-library-markers-mim-cleavage-svg',
    'covalent-bond':'shape-library-markers-mim-covalent-bond-svg',
    'transcription-translation':'shape-library-markers-mim-transcription-translation-svg',
    'gap':'shape-library-markers-mim-gap-svg',
    'inhibitory-activity':'shape-library-markers-t-bar-svg',
    'unspecified':'shape-library-markers-none-svg',
    'activity':'shape-library-markers-arrow-svg',
    'mim-branching-left':'shape-library-markers-mim-branching-left-svg',
    'mim-branching-right':'shape-library-markers-mim-branching-right-svg',
    'mim-necessary-stimulation':'shape-library-markers-mim-necessary-stimulation-svg',
    'mim-binding':'shape-library-markers-mim-binding-svg',
    'mim-conversion':'shape-library-markers-mim-conversion-svg',
    'mim-stimulation':'shape-library-markers-mim-stimulation-svg',
    'mim-modification':'shape-library-markers-mim-modification-svg',
    'mim-catalysis':'shape-library-markers-mim-catalysis-svg',
    'mim-inhibition':'shape-library-markers-mim-inhibition-svg',
    'mim-cleavage':'shape-library-markers-mim-cleavage-svg',
    'mim-covalent-bond':'shape-library-markers-mim-covalent-bond-svg',
    'mim-transcription-translation':'shape-library-markers-mim-transcription-translation-svg',
    'mim-gap':'shape-library-markers-mim-gap-svg',
    't-bar':'shape-library-markers-t-bar-svg',
    'none':'shape-library-markers-none-svg'
  };

  var colorsAvailable = {
    'shape-library-markers-arrow-svg':['default'],
    'shape-library-markers-mim-necessary-stimulation-svg':['default'],
    'shape-library-markers-mim-binding-svg':['default'],
    'shape-library-markers-mim-conversion-svg':['default'],
    'shape-library-markers-mim-stimulation-svg':['default'],
    'shape-library-markers-mim-modification-svg':['default'],
    'shape-library-markers-mim-catalysis-svg':['default'],
    'shape-library-markers-mim-inhibition-svg':['default'],
    'shape-library-markers-mim-cleavage-svg':['default'],
    'shape-library-markers-mim-covalent-bond-svg':['default'],
    'shape-library-markers-mim-transcription-translation-svg':['default'],
    'shape-library-markers-mim-gap-svg':['default'],
    'shape-library-markers-t-bar-svg':['default'],
    'shape-library-markers-mim-branching-left-svg':['default'],
    'shape-library-markers-mim-branching-right-svg':['default'],
    'shape-library-markers-none-svg':['default']
  };

  function appendCustom(uniqueMarkerShapeUri, callback) {
    var idStub = strcase.paramCase(uniqueMarkerShapeUri);
    var startId = idStub + '-start-default';
    var endId = idStub + '-end-default';
    var markerStart = svg.select('defs').select('#' + startId);

    markerStart = svg.select('defs').append('marker')
    .attr('id', startId)
    .attr('preserveAspectRatio', 'none');
    processSvg(uniqueMarkerShapeUri, markerStart, startId, false);

    var markerEnd = svg.select('defs').select('#' + endId);
    markerEnd = svg.select('defs').append('marker')
    .attr('id', endId)
    .attr('preserveAspectRatio', 'none');
    processSvg(uniqueMarkerShapeUri, markerEnd, endId, true);

    callback(null);
  }

  function processSvg(uniqueMarkerShapeUri, marker, markerId, rotate){
    d3.xml(uniqueMarkerShapeUri, 'image/svg+xml', function(svgXml) {
      var newMarker = d3.select(svgXml.documentElement);
      var width = newMarker.attr('width');
      var height = newMarker.attr('height');
      var markerClass = newMarker.attr('class');
      var refXstart = newMarker.attr('refXstart');
      var refYstart = newMarker.attr('refYstart');
      var refXend = newMarker.attr('refXend');
      var refYend = newMarker.attr('refYend');
      var viewBox = newMarker.attr('viewBox');

      marker.attr('viewBox', viewBox)
      .attr('markerWidth', width)
      .attr('markerHeight', height)
      .attr('markerUnits', 'strokeWidth')
      .attr('orient', 'auto');

      if (rotate){
	//end marker
        marker.attr('refX', refXend)
        .attr('refY', refYend);
        marker.append('g')
        .attr('id', 'g-' + markerId)
        .attr('class', markerClass)
        .attr('transform', 'rotate(180, '+width/2+', '+height/2+')');
/*        .attr('style', ' -webkit-transform: rotate(180deg); -webkit-transform-origin: 50% 50%; '
			+ '-o-transform: rotate(180deg); -o-transform-origin: 50% 50%; '
			+ '-moz-transform: rotate(180deg); -moz-transform-origin: 50% 50%; '
			+ '-ms-transform: rotate(180deg); -ms-transform-origin: 50% 50%; '
			+ 'transform: rotate(180deg); transform-origin: 50% 50%; '
        );
*/      } else {
	//start marker
        marker.attr('refX', refXstart)
        .attr('refY', refYstart);

        marker.append('g')
        .attr('id', 'g-' + markerId)
        .attr('class', markerClass);
      }

      var g = svg[0][0].querySelector('#' + 'g-' + markerId);
      var newMarkerChildren = newMarker[0][0].childNodes;
      do {
        g.appendChild(newMarkerChildren[0]);
      } while (newMarkerChildren.length > 0);
    });
  }

//    }
//    else {
      // note that HTML uses 'img' while SVG uses 'image'
      // we need to get the dimensions of the image we are adding to the new symbol,
      // so we'll create an img element in HTML to check width and height
      // then we'll append an image element to the SVG symbol

/*
 * could also look at using SVG image tags for this, like so:
	<marker id="mim-binding-start-black" 
	class="default-fill" 
	stroke="black"
	markerHeight="12"
	markerWidth="12"
	markerUnits="strokeWidth"
	orient="auto"
	refX="0" refY="6"
	viewBox="0 0 12 12">
  <image xlink:href="http://wikipathways.github.io/pathvisiojs/src/views/markers/mim-binding.svg" x="0" y="0" width="12" height="12"></image>
	</marker>
//*/
/*
      img = document.createElement('img');
      img.id = idStub;
      img.src = uniqueMarkerShapeUri;
      img.onload = function() {
        var width = this.width;
        var height = this.height;
        markerStart = svg.select('#' + this.id + '-start-default')
        .attr('viewBox', '0 0 ' + width + ' ' + height)
        .attr('markerWidth', width)
        .attr('markerHeight', height)
        .attr('markerUnits', 'strokeWidth')
        .attr('orient', 'auto')
        .attr('refX', 0)
        .attr('refY', 6);

        markerStart.append('image').attr('xlink:xlink:href', uniqueMarkerShapeUri)
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', width)
        .attr('height', height)
        .attr('externalResourcesRequired', "true");

        markerEnd = d3.select('svg').select('defs').select('#' + this.id + '-end-default')
        .attr('id', endId)
        .attr('viewBox', -1*width + ' ' + -1*height + ' ' + width + ' ' + height)
        .attr('markerWidth', width)
        .attr('markerHeight', height)
        .attr('markerUnits', 'strokeWidth')
        .attr('orient', 'auto')
        .attr('refX', 0)
        .attr('refY', -1*height/2);
        var g = markerEnd.append('g')
        .attr('id', 'g-' + endId)
        .attr('style', '-webkit-transform: rotate(180deg); -webkit-transform-origin: 50% 50%;');
        // TODO the transform attribute used is specific to chrome. we need ot add the transform attributes for other browsers
        // check for this on MDN.

        g.append('image').attr('xlink:xlink:href', uniqueMarkerShapeUri)
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', width)
        .attr('height', height)
        .attr('externalResourcesRequired', "true");
        callback(null);
      }
    }
  }
*/

  function loadAllCustom(thisSvg, customMarkers, callback) {
    console.log('thisSvg');
    console.log(thisSvg);
    svg = thisSvg;
    var image = null;
    var img = null;
    var marker = null;
    var dimensions = null;
    var dimensionSet = [];

    var semanticName;
    var markerUri;
    var paramCaseUri;
    var uniqueMarkerShapeUris = [];
    customMarkers.forEach(function(customMarker){
      semanticName = customMarker.semanticName;
      markerUri = customMarker.uri;
      paramCaseUri = strcase.paramCase(markerUri);
      pathvisiojs.view.pathwayDiagram.svg.edge.marker.semanticNameToIdMapping[semanticName] = paramCaseUri;
      pathvisiojs.view.pathwayDiagram.svg.edge.marker.colorsAvailable[paramCaseUri] = ['default'];
      if (uniqueMarkerShapeUris.indexOf(markerUri) === -1) {
        uniqueMarkerShapeUris.push(markerUri);
      }
    });

    async.each(uniqueMarkerShapeUris, appendCustom, function(err){
        // if any of the saves produced an error, err would equal that error
      callback(null);
    });
  }

  function appendNonDefaultColorMarkerBothEnds(svg, markerIdStub, color, callback) {
    appendNonDefaultColorMarker(svg, markerIdStub, 'start', color, function() {
      appendNonDefaultColorMarker(svg, markerIdStub, 'end', color, function() {
        pathvisiojs.view.pathwayDiagram.svg.edge.marker.colorsAvailable[markerIdStub].push(color);
        callback();
      });
    });
  }

  function appendNonDefaultColorMarker(svg, markerIdStub, position, color, callback) {
    var defaultId = markerIdStub + '-' + position + '-default';
    var marker = pathvisiojs.utilities.cloneNode('#' + defaultId);

    var defaultMarker, refX, refY, viewBox, viewBoxElements;
    if (position === 'end') {
      defaultMarker = d3.select('#' + markerIdStub + '-'+position+'-default');
      refX = parseFloat(defaultMarker.attr('refX'));
      refY = parseFloat(defaultMarker.attr('refY'));
      viewBox = defaultMarker.attr('viewBox');
      if (!!viewBox) {
        viewBoxElements = viewBox.split(' ');
        marker.attr('viewBox', viewBox);
      }
      marker.attr('refX', refX);
      marker.attr('refY', refY);
    }

    // define style of marker element's SVG

    var markerContents = marker.select("g");
    var markerStyle = markerContents.attr('style') || '';
    if (markerContents.attr('class').match(/default-stroke-color/)) {
      markerStyle += 'stroke:#' + color + '; ';
    }

    if (markerContents.attr('class').match(/default-fill-color/)) {
      markerStyle += 'fill:#' + color + '; ';
    }

    var markerId = markerIdStub + '-' + position + '-' + color;
    marker.attr('id', markerId);
    markerContents.attr('id', strcase.paramCase('g-' + markerId));
    markerContents.attr('style', markerStyle);

    callback(markerId);
  }
 
  return {
    appendNonDefaultColorMarkerBothEnds:appendNonDefaultColorMarkerBothEnds,
    loadAllCustom:loadAllCustom,
    semanticNameToIdMapping:semanticNameToIdMapping,
    colorsAvailable:colorsAvailable
  };
}();
