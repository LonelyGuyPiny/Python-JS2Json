export default [
  {
    url: "https://arcgis8.intertown.co.il/arcgis107/rest/services/kr8_general_vector/Print_Template_KR8/GPServer/Export%20Web%20Map/execute",
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
      source: 'A4 Landscape_grid_500',
      EN_text: 'A4',
      HE_text: 'קנ"מ מותאם ל500 מטר'
    },
      {
        source: 'A4 Landscape_grid_250',
        EN_text: 'A4',
        HE_text: 'קנ"מ מותאם ל250 מטר'
      },
      {
        source: 'A4 Landscape_grid_100',
        EN_text: 'A4',
        HE_text: 'קנ"מ מותאם ל100 מטר'
      },
      {
        source: ' A4 Landscape_grid_50',
        EN_text: 'A4',
        HE_text: 'קנ"מ מותאם ל50 מטר'
      },
    ],
    portrait_templates: [
      {
        source: 'A4 Portrait_grid_500',
        EN_text: 'A4',
        HE_text: 'קנ"מ מותאם ל500 מטר'
      },
      {
        source: 'A4 Portrait_grid_250',
        EN_text: 'A4',
        HE_text: 'קנ"מ מותאם ל250 מטר'
      },
      {
        source: 'A4 Portrait_grid_100',
        EN_text: 'A4',
        HE_text: 'קנ"מ מותאם ל100 מטר'
      },
      {
        source: 'A4 Portrait_grid_50',
        EN_text: 'A4',
        HE_text: 'קנ"מ מותאם ל50 מטר'
      },
    ]
  }
]