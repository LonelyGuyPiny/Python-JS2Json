/* eslint-disable no-template-curly-in-string */
export default [
  {
    url: "https://www.pinkasonline.co.il/OblivisionJS/index.aspx?project=afek&&lat=${this.y}&lon=${this.x}&crs=2039",
    title_HE: `מבט אלכסוני`,
    title_EN: 'Oblique View',
    projection: "EPSG:4326"
  },
  {
    url: "https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${this.y},${this.x}",
    title_HE: `מבט רחוב`,
    title_EN: 'Street view',
    projection: "EPSG:4326"
  },
  {
    url: "https://www.govmap.gov.il/?c=${this.x},${this.y}&z=10&b=1&bs=PARCEL_ALL%7C${this.x},${this.y}",
    title_HE: `Govmap`,
    title_EN: 'Govmap',
    projection: "EPSG:2039"
  },
  {
    url: "//www.waze.com/ul?ll=${this.y},${this.x}&navigate=yes&zoom=17",
    title_HE: `Waze`,
    title_EN: 'Waze',
    projection: "EPSG:4326"
  },
  {
    url: "https://www.mapillary.com/app/?lat=${this.y}&lng=${this.x}&z=18.5&focus=map&mapStyle=OpenStreetMap",
    title_HE: `מבט רחוב Mapillary`,
    title_EN: 'Street view',
    projection: "EPSG:4326"
  },
];
