var pathDoc = {};
pathDoc['@id'] = pathway["@id"];
pathDoc['pathwayElements'] = pathway["pathwayElements"];
pathDoc['wp:Author'] = pathway["wp:Author"];
jsonld.compact(pathDoc['pathwayElements'], pathway["@context"], function(err, compacted) {
var pathDoc = {};
var frame = {
  "@context":{
    "xsd": "http://www.w3.org/2001/XMLSchema#",
    "wp":"http://vocabularies.wikipathways.org/wp#",
    "wpid":"http://wikipathways.org/index.php/Pathway:WP",
    "gpmlFolder":"file://Users/andersriutta/Sites/pathvisiojs/test/gpml/",
    "gpml":"http://vocabularies.wikipathways.org/gpml#",
    "name":"http://xmlns.com/foaf/0.1/name",
    "dcterms":"http://purl.org/dc/terms/",
    "hMDB":"http://www.hmdb.ca/metabolites/HMDB",
    "entrezGene":"http://www.ncbi.nlm.nih.gov/gene/",
    "ChEBI":"http://www.ebi.ac.uk/chebi/searchId.do?chebiId=",
    "media":"http://www.w3.org/TR/mediaont-10/",
    "pathwayElements": {
      "@id": "http://www.example.com/pathwayElements/",
      "@container": "@list"
    },
    "ex":"http://www.example.com/",
    "ex:IsRefedBy": { "@reverse": "gpml:GraphRef" },
    "gpml:Interaction": {
      "@type": "@id"
    },
    "gpml:Point": {
      "@id": "gpml:Point",
      "@container": "@list"
    },
    "gpml:SnappedPoint": {
      "gpml:GraphRef": "@id",
      "gpml:relX": "xsd:integer",
      "gpml:relY": "xsd:integer"
    },
    "ex:renderableAsNode": {
      "gpml:x": "xsd:integer",
      "gpml:y": "xsd:integer"
    }
  },
  "@type": ["gpml:DataNode", "gpml:Shape", "gpml:Label"]
};
jsonld.frame(compacted, frame, function(err, compacted) {
  console.log(JSON.stringify(compacted, null, 2));
});
});
