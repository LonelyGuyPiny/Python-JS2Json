export default [
  {
    url: "https://arcgis8.intertown.co.il/arcgis107/rest/services/itown_utils/Printing/GPServer/ExportWebMap/execute",
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
        source: 'bna_A4 Landscape_grid_50',
        EN_text: 'A4',
        HE_text: 'קנ"מ מותאם ל 50 מטר'
      },
      {
        source: 'bna_A4 Landscape_grid_100',
        EN_text: 'A4',
        HE_text: 'קנ"מ מותאם ל 100 מטר'
      },
      {
        source: 'bna_A4 Landscape_grid_250',
        EN_text: 'A4',
        HE_text: 'קנ"מ מותאם ל 250 מטר'
      },
      {
        source: 'bna_A4 Landscape_grid_500',
        EN_text: 'A4',
        HE_text: 'קנ"מ מותאם ל 500 מטר'
      },
      {
        source: 'bna_A0_Landscape',
        EN_text: 'A0',
        HE_text: 'A0'
      },
      {
        source: 'bna_A3 Landscape',
        EN_text: 'A3',
        HE_text: 'A3'
      },
    ],
    portrait_templates: [
      {
        source: 'bna_A4 Portrait_grid_50',
        EN_text: 'A4',
        HE_text: 'קנ"מ מותאם ל 50 מטר'
      },
      {
        source: 'bna_A4 Portrait_grid_100',
        EN_text: 'A4',
        HE_text: 'קנ"מ מותאם ל 100 מטר'
      },
      {
        source: 'bna_A4 Portrait_grid_250',
        EN_text: 'A4',
        HE_text: 'קנ"מ מותאם ל 250 מטר'
      },
      {
        source: 'bna_A4 Portrait_grid_500',
        EN_text: 'A4',
        HE_text: 'קנ"מ מותאם ל 500 מטר'
      },
      {
        source: 'bna_A0_Portrait',
        EN_text: 'A0',
        HE_text: 'A0'
      },
      {
        source: 'bna_A3 Portrait',
        EN_text: 'A3',
        HE_text: 'A3'
      },
    ]
  }
]