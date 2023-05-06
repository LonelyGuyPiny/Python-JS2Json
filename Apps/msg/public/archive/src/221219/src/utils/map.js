import {
  transform
} from 'ol/proj';
import {
  transformExtent
} from 'ol/proj';

import { mapData } from '../config/settings'

const CURRENT_PROJ = mapData.projection;

export const transCordinates = (Coordinates, proj, cProj = CURRENT_PROJ) => {
  return transform(Coordinates, cProj, proj);
}

export const transExtent = (extent, proj, cProj = CURRENT_PROJ) => {
  return transformExtent(extent, cProj, proj);
}

export const centerOnMap = (Coordinates, map, zoom = false, zoomLevel = 21) => {
  const isMobile = document.body.offsetWidth < 640;
  const padding = getPadding();
  // const vview = map.getView();
  // const obj = {
  //   center: Coordinates,
  //   duration: 1000
  // }
  // if (zoom) {
  //   obj.zoom = 17
  // }
  // vview.animate(obj);
  // return;
  const dir = document.getElementById('html').getAttribute('dir');
  const view = map.getView();
  if (isMobile) {
    view.padding = padding;
  }
  const sbar = document.getElementById('menuShowhide-block');
  const size = map.getSize();
  const center = [size[0] / 2, size[1] / 2];
  const fixedPop = document.getElementById('popup-fixed');
  let fixedPopupWidth = 0;
  if (fixedPop && !isMobile) {
    fixedPopupWidth = fixedPop.offsetWidth;
  }
  if (dir === 'LTR') {
    if (sbar && sbar.offsetLeft > 0) {
      const width = size[0] - sbar.offsetWidth - fixedPopupWidth;
      center[0] = (width / 2) + sbar.offsetWidth;
    }
  } else {
    if (sbar && sbar.offsetLeft < -10) {
      const width = size[0] - sbar.offsetWidth + fixedPopupWidth;
      center[0] = (width / 2);
    }
  }
  const oldCenter = view.getCenter();
  if (zoom) {
    const oldZoom = view.getZoom();
    view.animate({
      zoom: zoomLevel,
      duration: 0
    });
    view.centerOn(Coordinates, size, center);
    const newCenter = view.getCenter();
    view.setCenter(oldCenter);
    view.animate({
      zoom: oldZoom,
      duration: 0
    });
    setTimeout(() => {
      view.animate({
        zoom: zoomLevel,
        center: newCenter,
        duration: 1000
      });
    }, 50)
  } else {
    view.centerOn(Coordinates, size, center);
    const newCenter = view.getCenter();
    view.setCenter(oldCenter);
    
    const ops = {
      center: newCenter,
      duration: 1000
    };

    // if (rotation) {
    //   ops.rotation = rotation;
    // }
    
    view.animate(ops);
  }
  return map;
}

export const getPadding = () => {
  const isMobile = document.body.offsetWidth < 640;
  const sbar = document.getElementById('menuShowhide-block');
  const dir = document.getElementById('html').getAttribute('dir');

  let popHeight = 0;
  if (isMobile) {
    ['is-popup', 'is-popup-compare', 'is-popup-fixed'].forEach(id => {
      const popup = document.getElementById(id);
      if (popup) {
        popHeight = document.getElementById(id.replace('is-', '')).offsetHeight + 100;
      }
    });
  }

  const topPadding = sbar.offsetHeight > popHeight ? sbar.offsetHeight : popHeight;
  let padding = [50, 50, 50, 50];
  const fixedPop = document.getElementById('popup-fixed');
  let fixedPopupWidth = 0;
  if (fixedPop && !isMobile) {
    fixedPopupWidth = fixedPop.offsetWidth + 70;
  }
  
  if (dir === 'LTR') {
    if (sbar && sbar.offsetLeft > 0) {
      padding = [isMobile ? 50 + topPadding : 50, 50 + fixedPopupWidth, 50, isMobile ? 50 : 50 + sbar.offsetWidth + 60];
    } else {
      padding = [isMobile ? 50 + topPadding : 50, 50 + fixedPopupWidth, 50, isMobile ? 50 : 50 + 60];
    }
  } else {
    if (sbar && sbar.offsetLeft < -10) {
      padding = [isMobile ? 50 + topPadding : 50, isMobile ? 50 : 50 + sbar.offsetWidth + 60, 50, 50 + fixedPopupWidth];
    } else {
      padding = [isMobile ? 50 + topPadding : 50, isMobile ? 50 : 50 + 60, 50, 50 + fixedPopupWidth];
    }
  }
  return padding;
}

export const setMapPadding = (map) => {
  const view = map.getView();
  const padding = getPadding();
  view.padding = padding;
  map.updateSize();
}

export const fitToMap = (geometry, map) => {
  map.updateSize();
  const padding = getPadding();
  const view = map.getView();
  view.fit(geometry, {
    padding,
    duration: 1000
  });
}

export const getPixelSize = (map) => {
  return 10
}

export const transCordinatesArray = (CoordinatesArr, proj, cProj = CURRENT_PROJ) => {
  return CoordinatesArr.map(Coordinates => transCordinates(Coordinates, proj, cProj))
}

export const zoomOutFunction = (map) => {
  map.getView().setZoom(map.getView().getZoom() - 15)
  return map;
}

export const getCurrentExtent = (map) => {
  return map.getView().calculateExtent([]);
}
