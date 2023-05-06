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
    scales: ['1:100', '1:250', '1:500', '1:1000', '1:2000', '1:4000', '1:8000', '1:16000', '1:32000'],
    output_formats: ['PDF', 'PNG32', 'PNG8', 'JPG', 'GIF', /*'SVG', 'SVGZ'//קבצים הניתנים לעריכה*/],
	landscape_templates: [
      {
        source: 'mnm_A4 Landscape',
        EN_text: 'A4',
        HE_text: 'A4'
      }, 
      {
        source: 'mnm_A3 Landscape',
        EN_text: 'A3',
        HE_text: 'A3'
      },     
      {
        source: 'mnm_A2 Landscape',
        EN_text: 'A2',
        HE_text: 'A2'
      },  
      {
        source: 'mnm_A1_Landscape',
        EN_text: 'A1',
        HE_text: 'A1'
      },
      {
        source: 'mnm_A0_Landscape',
        EN_text: 'A0',
        HE_text: 'A0'
      },
    ],
    portrait_templates: [
      {
        source: 'mnm_A4 Portrait',
        EN_text: 'A4',
        HE_text: 'A4'
      },
      {
        source: 'mnm_A3 Portrait',
        EN_text: 'A3',
        HE_text: 'A3'
      },
      {
        source: 'mnm_A2_Portrait',
        EN_text: 'A2',
        HE_text: 'A2'
      },
      {
        source: 'mnm_A1_Portrait',
        EN_text: 'A1',
        HE_text: 'A1'
      },
      {
        source: 'mnm_A0_Portrait',
        EN_text: 'A0',
        HE_text: 'A0'
      },
    ]
  }
]