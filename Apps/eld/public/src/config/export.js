export default [
  {
    url: "https://arcgis8.intertown.co.il/arcgis107/rest/services/eld_general_models/ExportWebMap/GPServer/eld_print_108/execute",
    dpi: [
      {
        default: 96,
        min: 50,
        max: 300
      }
    ],
    scales: ['1:100', '1:250', '1:500', '1:1000', '1:1250', '1:2500', '1:5000', '1:10000', '1:20000'],
    output_formats: ['PDF', 'PNG32', 'PNG8', 'JPG', 'GIF', /*'SVG', 'SVGZ'//קבצים הניתנים לעריכה*/],
	landscape_templates: [
      {
        source: 'A4 Landscape',
        EN_text: 'A4',
        HE_text: 'A4'
      },
    ],
    portrait_templates: [
      {
        source: 'A4 Portrait',
        EN_text: 'A4',
        HE_text: 'A4'
      },
    ]
  }
]