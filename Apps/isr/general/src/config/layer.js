export default [
  {

    url: 'https://arcgis.intertown.co.il/krg_arcgis/rest/services/nzr_general_vector/nzr_handicap_SDE/FeatureServer',
    export: ['csv', 'GeoJSON'],
    virtualGroup: 'נגישות נוף הגליל feature service',
    type: 'arcgis_feature',
  },
  {
    url: 'https://services3.arcgis.com/JVKf7TPFiHabmA6m/arcgis/rest/services/kdz_main_shilut/FeatureServer',
    export: ['GeoJSON', 'csv'],
    virtualGroup: "שלטים קדימה-צורן agol",
    type: "arcgis_feature",
  },
  {
    virtualGroup: 'Xplan - מנהל התכנון',
    url: 'https://ags.iplan.gov.il/arcgisiplan/rest/services/PlanningPublic/Xplan_2039/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type: "arcgis",
  },
  {
    url: 'https://ags.iplan.gov.il/arcgisiplan/rest/services/PlanningPublic/TAMA_1/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type: "arcgis",
  },
  {
    url: 'https://ags.iplan.gov.il/arcgisiplan/rest/services/PlanningPublic/Tama_35_1/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type: "arcgis",
  },
  {
    virtualGroup:'תמ"א 35 - הנחיות סביבתיות',
    url: 'https://ags.iplan.gov.il/arcgisiplan/rest/services/PlanningPublic/tama35_hanchayot_svivatiot/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type: "arcgis",
  },
  {
    virtualGroup:'תמ"א 34 ב 3',
    url: 'https://ags.iplan.gov.il/arcgisiplan/rest/services/PlanningPublic/tma_34_b_3/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type: "arcgis",
  },
  {
    url: 'https://ags.iplan.gov.il/arcgisiplan/rest/services/PlanningPublic/tma_14_b/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type: "arcgis",
  },
  {
    virtualGroup: 'תוכנית שרון',
    url: 'https://ags.iplan.gov.il/arcgisiplan/rest/services/PlanningPublic/Tochnit_sharon/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type: "arcgis",
  },
  {
    url: 'https://ags.iplan.gov.il/arcgisiplan/rest/services/PlanningPublic/compilation_tmm_tzafonn/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type: "arcgis",
  },
  {
    url: 'https://ags.iplan.gov.il/arcgisiplan/rest/services/PlanningPublic/compilation_tmm_haifa/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type: "arcgis",
  },
  {
    url: 'https://ags.iplan.gov.il/arcgisiplan/rest/services/PlanningPublic/compilation_tmm_merkaz/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type: "arcgis",
  },
  {
    url: 'https://ags.iplan.gov.il/arcgisiplan/rest/services/PlanningPublic/compilation_tmm_darom/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type: "arcgis",
  },
  {
    virtualGroup:'תמ"מ 6',
    url: 'https://ags.iplan.gov.il/arcgisiplan/rest/services/PlanningPublic/tmm_6/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type: "arcgis",
  },
  {
    url: 'https://ags.iplan.gov.il/arcgisiplan/rest/services/PlanningPublic/tmm_5_5/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type: "arcgis",
  },
  {
    url: 'https://ags.iplan.gov.il/arcgisiplan/rest/services/PlanningPublic/tmm_5/MapServer',
    virtualGroup:'תמ"מ 5',
    export: ['kmz', 'GeoJSON', 'csv'],
    type: "arcgis",
  },
  {
    url: 'https://ags.iplan.gov.il/arcgisiplan/rest/services/PlanningPublic/tmm_4_14/MapServer',
    virtualGroup:'תמ"מ 4 / 14',
    export: ['kmz', 'GeoJSON', 'csv'],
    type: "arcgis",
  },
  {
    url: 'https://ags.iplan.gov.il/arcgisiplan/rest/services/PlanningPublic/tmm_3_21/MapServer',
    virtualGroup:'תמ"מ 3 / 21',
    export: ['kmz', 'GeoJSON', 'csv'],
    type: "arcgis",
  },
  {
    url: 'https://ags.iplan.gov.il/arcgisiplan/rest/services/PlanningPublic/tmm_2_9/MapServer',
    virtualGroup:'תמ"מ 2 / 9',
    export: ['kmz', 'GeoJSON', 'csv'],
    type: "arcgis",
  },
  {
    url: 'https://ags.iplan.gov.il/arcgisiplan/rest/services/PlanningPublic/tmm_1_30/MapServer',
    virtualGroup:'תמ"מ 1 / 30',
    export: ['kmz', 'GeoJSON', 'csv'],
    type: "arcgis",
  },
  {
    url: 'https://ags.iplan.gov.il/arcgisiplan/rest/services/PlanningPublic/gaz_compilation/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type: "arcgis",
  },
  {
    url: 'https://ags.iplan.gov.il/arcgisiplan/rest/services/PlanningPublic/road_compilation/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type: "arcgis",
  },
  {
    url: 'https://ags.iplan.gov.il/arcgisiplan/rest/services/PlanningPublic/train_compilation/MapServer',
    virtualGroup: "מסילות ברזל",
    export: ['kmz', 'GeoJSON', 'csv'],
    type: "arcgis",
  },
  {
    url: 'https://ags.iplan.gov.il/arcgisiplan/rest/services/PlanningPublic/ttl_all_blue_lines/MapServer',
    virtualGroup: 'תת"ל',
    export: ['kmz', 'GeoJSON', 'csv'],
    type: "arcgis",
  },
  {
    url: 'https://ags.iplan.gov.il/arcgisiplan/rest/services/PlanningPublic/vatmal_mitchamim_muchrazim/MapServer',
    virtualGroup: 'ותמ"ל',
    export: ['kmz', 'GeoJSON', 'csv'],
    type: "arcgis",
  },
  {
    url: 'https://ags.iplan.gov.il/arcgisiplan/rest/services/PlanningPublic/shimour/MapServer',
    virtualGroup:'שכבות שימור',
    export: ['kmz', 'GeoJSON', 'csv'],
    type: "arcgis",
  },
  {
    url: 'https://ags.iplan.gov.il/arcgisiplan/rest/services/PlanningPublic/gvulot_retzef/MapServer',
    virtualGroup:'גבולות רצף',
    export: ['kmz', 'GeoJSON', 'csv'],
    type: "arcgis",
  },
  {
    url: 'https://ags.iplan.gov.il/arcgisiplan/rest/services/PlanningPublic/Volta/MapServer',
    virtualGroup:'חשמל',
    export: ['kmz', 'GeoJSON', 'csv'],
    type: "arcgis",
  },
  {
    url: 'https://gis.health.gov.il/arcgis/rest/services/Epidemiology/VAC_Public_Vaccines_Cover/MapServer',
    virtualGroup: "משרד הבריאות - שיעורי התחסנות",
    export: ['kmz', 'GeoJSON', 'csv'],
    type: "arcgis",
  },
  {
    url: 'https://gis.health.gov.il/arcgis/rest/services/EnvHealth/ENV_Beaches_Results_Pro2/MapServer',
    virtualGroup: "משרד הבריאות - חופים",
    export: ['kmz', 'GeoJSON', 'csv'],
    type: "arcgis",
  },
  {
    url: 'https://gis.health.gov.il/arcgis/rest/services/Inequality/INQ_ChildGrowth/MapServer',
    virtualGroup: "משרד הבריאות - התפתחות הילד",
    export: ['kmz', 'GeoJSON', 'csv'],
    type: "arcgis",
  },
  {
    url: 'https://gis.health.gov.il/arcgis/rest/services/Inequality/INQ_population_and_sickness/MapServer',
    virtualGroup: "משרד הבריאות - אוכלוסיה ותחלואה",
    export: ['kmz', 'GeoJSON', 'csv'],
    type: "arcgis",
  },
  {
    url: 'https://gis.health.gov.il/arcgis/rest/services/Inequality/INQ_Service_Availability/MapServer',
    virtualGroup: "משרד הבריאות - זמינות שירותים",
    export: ['kmz', 'GeoJSON', 'csv'],
    type: "arcgis",
  },
  {
    url: 'https://stage1.intertown.co.il/arcgis/rest/services/arl_general_vector/ariel_tamrurim/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type: "arcgis",
  },
  {
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/isr_general_vector/isr_urban/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type: "arcgis",
  },
  {
    url: 'https://stage1.intertown.co.il/arcgis/rest/services/lod_general_vector/Lod_tamrur/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type: "arcgis",
  },
  {
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/isr_general_vector/isr_all_trees/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type: "arcgis",
  },
  {
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/isr_general_vector/isr_IntertownActivity/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type: "arcgis",
  },
  {
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/kro_general_vector/kro_gardening/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type: "arcgis",
  },
  {
    url: 'https://arcgis8.intertown.co.il/arcgis107/rest/services/rne_general_vector/MigdalHaemek_addresses/MapServer',
    export: ['kmz', 'GeoJSON', 'csv'],
    type: "arcgis",
  },
  {
    url: 'https://shademap.app/https://shademap.app/@32.75345,35.03389',
    export: ['kmz', 'GeoJSON', 'csv'],
    type: "arcgis",
  },
]