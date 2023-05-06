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
      source: 'azr_A4 Landscape_grid 500',
      EN_text: 'A4',
      HE_text: 'קנ"מ מותאם ל500 מטר'
    },
      {
        source: 'azr_A4 Landscape_grid 250',
        EN_text: 'A4',
        HE_text: 'קנ"מ מותאם ל250 מטר'
      },
      {
        source: 'azr_A4 Landscape_grid_100',
        EN_text: 'A4',
        HE_text: 'קנ"מ מותאם ל100 מטר'
      },
      {
        source: ' azr_A4 Landscape_grid_50',
        EN_text: 'A4',
        HE_text: 'קנ"מ מותאם ל50 מטר'
      },
      {
        source: 'azr_A3 Landscape',
        EN_text: 'A3',
        HE_text: 'A3'
      },
      {
        source: 'azr_A2 Landscape',
        EN_text: 'A2',
        HE_text: 'A2'
      },
      {
        source: 'azr_A1_Landscape',
        EN_text: 'A1',
        HE_text: 'A1'
      },
      {
        source: 'azr_A0_landscape',
        EN_text: 'A0',
        HE_text: 'A0'
      },
      {
        source: 'azr_A0X2_landscape',
        EN_text: 'A0',
        HE_text: 'A0X2'
      },
    ],
    portrait_templates: [
      {
        source: 'azr_A4 portrait_grid_500',
        EN_text: 'A4',
        HE_text: 'קנ"מ מותאם ל500 מטר'
      },
      {
        source: 'azr_A4 portrait_grid_250',
        EN_text: 'A4',
        HE_text: 'קנ"מ מותאם ל250 מטר'
      },
      {
        source: 'azr_A4 portrait_grid_100',
        EN_text: 'A4',
        HE_text: 'קנ"מ מותאם ל100 מטר'
      },
      {
        source: 'azr_A4 portrait_grid_50',
        EN_text: 'A4',
        HE_text: 'קנ"מ מותאם ל50 מטר'
      },
      {
        source: 'azr_A3 Portrait',
        EN_text: 'A3',
        HE_text: 'A3'
      },
      {
        source: 'azr_A2_Portrait',
        EN_text: 'A2',
        HE_text: 'A2'
      },
      {
        source: 'azr_A1_Portrait',
        EN_text: 'A1',
        HE_text: 'A1'
      },
      {
        source: 'azr_A0_portrait',
        EN_text: 'A0',
        HE_text: 'A0'
      },
      {
        source: 'azr_A0X2_portrait',
        EN_text: 'A0',
        HE_text: 'A0X2'
      },
    ]
  }
]