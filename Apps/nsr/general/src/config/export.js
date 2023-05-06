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
        source: 'nsr_A4 Landscape',
        EN_text: 'A4',
        HE_text: 'A4'
      },
      {
        source: 'nsr_A4 Landscape_grid_50',
        EN_text: 'A4',
        HE_text: 'A4 קנ"מ מותאם ל50 מטר'
      },
      {
        source: 'nsr_A4 Landscape_grid_100',
        EN_text: 'A4',
        HE_text: 'A4 קנ"מ מותאם ל100 מטר'
      },
      {
        source: 'nsr_A4 Landscape_grid_250',
        EN_text: 'A4',
        HE_text: 'A4 קנ"מ מותאם ל250 מטר'
      },
      {
        source: 'nsr_A4 Landscape_grid_500',
        EN_text: 'A4',
        HE_text: 'A4 קנ"מ מותאם ל500 מטר'
      },
      {
        source: 'nsr_A3 Landscape',
        EN_text: 'A3',
        HE_text: 'A3'
      },
      {
        source: 'nsr_A2_Landscape',
        EN_text: 'A2',
        HE_text: 'A2'
      },
      {
        source: 'nsr_A1_Landscape',
        EN_text: 'A1',
        HE_text: 'A1'
      },
      {
        source: 'nsr_A0_Landscape',
        EN_text: 'A0',
        HE_text: 'A0'
      },
    ],
    portrait_templates: [
      {
        source: 'nsr_A4 Portrait',
        EN_text: 'A4',
        HE_text: 'A4'
      },
      {
        source: 'nsr_A4 Portrait_grid_50',
        EN_text: 'A4',
        HE_text: 'A4 קנ"מ מותאם ל50 מטר'
      },
      {
        source: 'nsr_A4 Portrait_grid_100',
        EN_text: 'A4',
        HE_text: 'A4 קנ"מ מותאם ל100 מטר'
      },
      {
        source: 'nsr_A4 Portrait_grid_250',
        EN_text: 'A4',
        HE_text: 'A4 קנ"מ מותאם ל250 מטר'
      },
      {
        source: 'nsr_A4 Portrait_grid_500',
        EN_text: 'A4',
        HE_text: 'A4 קנ"מ מותאם ל500 מטר'
      },
      {
        source: 'nsr_A3 Portrait',
        EN_text: 'A3',
        HE_text: 'A3'
      },
      // {
      //   source: 'nsr_A2_Portrait',
      //   EN_text: 'A2',
      //   HE_text: 'A2'
      // },
      // {
      //   source: 'nsr_A1_Portrait',
      //   EN_text: 'A1',
      //   HE_text: 'A1'
      // },
      {
        source: 'nsr_A0 Portrait',
        EN_text: 'A0',
        HE_text: 'A0'
      },
    ]
  }
]