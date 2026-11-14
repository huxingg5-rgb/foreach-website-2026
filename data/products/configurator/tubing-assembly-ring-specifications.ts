// Customer-supplied HSF6/CL-1 catalog, with each SKU tied to its formal drawing.
// The PEEK sheets specify 15.5 mm bodies; PPS sheets specify 20 mm bodies.
// Do not share geometry just because family/thread/nominal bore are identical.
export const assemblyRingSpecifications = [
  { model:"HSF6-M6-16-PS-B", code:"809816", thread:"M6×1", material:"PPS", color:"黑色", outerDiameters:[1.6], cadKey:"HSF6-M6-16", drawingFile:"443-02-00499-C.pdf" },
  { model:"HSF6-M6-32-PS-B", code:"809817", thread:"M6×1", material:"PPS", color:"黑色", outerDiameters:[2,2.5,3,3.2], cadKey:"HSF6-M6-32", drawingFile:"443-02-00500-C.pdf" },
  { model:"HSF6-U28-16-PK-N", code:"809829", thread:"1/4-28 UNF", material:"PEEK", color:"本色", outerDiameters:[1.6], cadKey:"HSF6-U28-16-PK-N", drawingFile:"441-09-00222-C.pdf" },
  { model:"HSF6-U28-16-PS-B", code:"809814", thread:"1/4-28 UNF", material:"PPS", color:"黑色", outerDiameters:[1.6], cadKey:"HSF6-U28-16", drawingFile:"443-02-00497-C.pdf" },
  { model:"HSF6-U28-32-PK-N", code:"809828", thread:"1/4-28 UNF", material:"PEEK", color:"本色", outerDiameters:[2,2.5,3,3.2], cadKey:"HSF6-U28-32-PK-N", drawingFile:"441-09-00289-C_001_cn.pdf" },
  { model:"HSF6-U28-32-PS-B", code:"809815", thread:"1/4-28 UNF", material:"PPS", color:"黑色", outerDiameters:[2,2.5,3,3.2], cadKey:"HSF6-U28-32", drawingFile:"443-02-00498-C.pdf" },
];
export const assemblyRingDrawingRoot = "/downloads/products/tubing-assemblies/ring-fittings/";
