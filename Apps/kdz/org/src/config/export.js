export default [
  {
    url: "https://arcgis.intertown.co.il/krg_arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task/execute",
    dpi: [
      {
        default: 96,
        min: 50,
        max: 300
      }
    ],
    scales: ['1:100', '1:250', '1:500', '1:1000', '1:2000', '1:4000', '1:8000', '1:16000', '1:32000'],
    output_formats: ['PDF', 'PNG32', 'PNG8', 'JPG', 'GIF', /*'SVG', 'SVGZ'//קבצים הניתנים לעריכה*/],
	landscape_templates: [
    {
      source: 'kdz_A4 Landscape',
      EN_text: 'A4',
      HE_text: 'A4ֹֹֹֹ Landscape'
    },
    {
      source: 'kdz_A4 Landscape_grid_50',
      EN_text: 'A4',
      HE_text: 'קנ"מ מותאם ל50 מטר'
    },
    {
      source: 'kdz_A4 Landscape_grid_100',
      EN_text: 'A4',
      HE_text: 'קנ"מ מותאם ל100 מטר'
    },
    {
      source: 'kdz_A4 Landscape_grid_250',
      EN_text: 'A4',
      HE_text: 'קנ"מ מותאם ל250 מטר'
    },
    {
      source: 'kdz_A4 Landscape_grid_500',
      EN_text: 'A4',
      HE_text: 'קנ"מ מותאם ל500 מטר'
    },
    
  ],
  portrait_templates: [
    {
      source: 'kdz_A4_Portrait',
      EN_text: 'A4',
      HE_text: 'A4 Portrait'
    },
    {
      source: 'kdz_A4_Portrait_grid_50',
      EN_text: 'A4',
      HE_text: 'קנ"מ מותאם ל50 מטר'
    },
    {
      source: 'kdz_A4_Portrait_grid_100',
      EN_text: 'A4',
      HE_text: 'קנ"מ מותאם ל100 מטר'
    },
    {
      source: 'kdz_A4_Portrait_grid_250',
      EN_text: 'A4',
      HE_text: 'קנ"מ מותאם ל250 מטר'
    },
    {
      source: 'kdz_A4_Portrait_grid_500',
      EN_text: 'A4',
      HE_text: 'קנ"מ מותאם ל500 מטר'
    },
  ]
}
]