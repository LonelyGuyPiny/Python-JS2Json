import React, { Fragment, useState } from "react";
import {
  Button, Checkbox, Tab, Menu,
  // Form,
  Dropdown
} from "semantic-ui-react";

import { Block, Svg, Loading } from "../../";

import PopUpSpaitalIntersection from "./PopUpSpaitalIntersection";
import menu from '../../../config/mainMenu'

/**
 * Component
 * @name PopUp
 * @description
 * This is popup component of the spatial popup. 
 * On spatial popup laoding, this component is loaded
 */

export default function PopUp({ loading, renderXYLinks, spatialData, X, Y, renderSpatialData, closePopUp, zoomInOut, currentPosition, previousClick, nextClick, zoomEnabled, translation, selectedLayer, options, drawingPopup, optionIndex, direction }) {
  const [isActive, setIsActive] = useState(false);
  const panes = [
    {
      menuItem: translation.featuredetail,
      render: () => (
        <Tab.Pane attached={false}>
          <Block>{renderSpatialData(spatialData[currentPosition])}</Block>
        </Tab.Pane>
      ),
    }
  ];
  const spatialPan = {
    menuItem: (
      <Menu.Item key="messages">
        {translation.intersect}
        <Button
          className="module-info d-flex justify-content-end cursor-pointer btn-none"
          data-tooltip={translation.spaitalinfo}
          data-position={`${direction === 'RTL' ? 'right' : 'left'} center`}
        >
          <Svg name="info-module" />
        </Button>
      </Menu.Item>
    ),
    render: () => (
      <Tab.Pane attached={false}>
        <PopUpSpaitalIntersection
          className="spaital-intersect-popup"
          // close={() => {handleIsActive(false); setOpen(false);}}
          tocLayer={spatialData[currentPosition].layer}
          feature={spatialData[currentPosition]}
          isActive={isActive}
        />
      </Tab.Pane>
    ),
  };

  if (menu.mainMenu.includes('layerRecords')) {
    panes.push(spatialPan)
  }

  const handleIsActive = (val) => {
    setIsActive(val);
  };
  const handleClosePopUp = () => {
    handleIsActive(false);
    closePopUp();
  }

  return (
    <Fragment>
      <Block className="arrowpopup"></Block>
      <Block>
        <Block className="spatalPopupheader">
          <Block className="d-flex justify-space-between align-item-center">
            <Block></Block>
            <p className="font-weight-medium mb-0">{translation.identifyresult}</p>
            <Block>
              {" "}
              <Svg
                className="close-new"
                name="close-new"
                onClick={handleClosePopUp}
              />
            </Block>
          </Block>
          {!drawingPopup && <Block className="card-spatal">
            <Block className="spatalPopupheaderTop">
              <Block className="d-flex align-item-center">
                <Block>
                  <Svg name="locationiconspa" />
                </Block>
                <Block className="axis">
                  <Block className="x-axis">
                    <strong>X </strong>
                    {X}
                  </Block>
                  <Block className="y-axis">
                    <strong>Y </strong>
                    {Y}
                  </Block>
                </Block>
              </Block>
            </Block>
            <Block className="spatial-top-buttons">
              {renderXYLinks()}
            </Block>
          </Block>}
        </Block>
        {options && options.length > 0 &&
          <Block className="d-flex align-item-center mt-1 counter-layer-parent">
            <p className="mb-0 font-weight-medium">{translation.layerspatal}</p>
            <Block className="w-100 ml-1 layer-dropdown">
              <Dropdown
                fluid
                options={options}
                value={optionIndex}
                selection
                loading={loading}
                onChange={(e, { value }) => selectedLayer(value)}
              />
            </Block>
            <Block className="counter-layer">
              <p>{spatialData.length}</p>
            </Block>
          </Block>}
        <Block
          className="spatial-inner-wrapper card-spatal mt-1"
          style={{ position: "relative" }}
        >
          {loading && <Loading />}
          {spatialData && spatialData.length > 0 &&
            <Block className="spatial-inner-sec">
              <Block className="spatalPopupheaderBottom">
                <Block className="titleText heading">
                  <h3 className="font-weight-medium">{translation.featurecard}</h3>
                </Block>
                <Block className="spatial-counts">
                  <Block className="icons d-flex justify-content-end ">
                    <Block className="count">
                      {currentPosition + 1}/{spatialData && spatialData.length}
                    </Block>
                    <Button
                      className="btn-spatal-arrow left"
                      href=""
                      onClick={(e) =>
                        previousClick(e, spatialData[currentPosition])
                      }
                    >
                      <Svg name="spatal-arrow-left" />
                    </Button>
                    <Button
                      className="btn-spatal-arrow right"
                      href=""
                      onClick={(e) =>
                        nextClick(e, spatialData[currentPosition])
                      }
                    >
                      <Svg name="spatal-arrow-right" />
                    </Button>
                  </Block>
                </Block>
              </Block>
              <Tab
                menu={{ secondary: true, pointing: true }}
                panes={panes}
                className="drawingTabFirst spatail-tab"
                onTabChange={(e, { activeIndex }) =>
                  handleIsActive(activeIndex === 1)
                }
              />
              <Block className="spatial-checkbox">
                <Checkbox
                  label={translation.autoZoom}
                  checked={zoomEnabled}
                  onChange={(e, { checked }) =>
                    zoomInOut(checked, spatialData[currentPosition])
                  }
                />
              </Block>
            </Block>}
          {spatialData.length === 0 && !loading && <p className="text-center">{translation.nofeaturefound}</p>}
        </Block>
      </Block>
    </Fragment>
  );
}
