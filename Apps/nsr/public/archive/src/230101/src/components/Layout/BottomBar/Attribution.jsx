import { Svg } from '../../';
import React, { useState} from 'react';

import Attribution from '../Modals/Attribution'


export default function ({ attribution, translation, direction }) {
  const [toggle, setToggle] = useState(false);
  if (attribution) {
    return(
      <div id="attribution">
        <div className={`ol-attribution ol-unselectable ol-control ${toggle ? 'ol-uncollapsed' : 'ol-collapsed'}`} >
          <Attribution translation={translation} direction={direction} attribution={attribution} open={toggle} close={() => setToggle(!toggle)} />
          <button onClick={() => setToggle(!toggle)} type="button"  data-tooltip={translation.attribution}>
            <span className="ol-attribution-expand">
              <Svg name="copyright"/>
            </span>
          </button>
        </div>
      </div>
    );
  }
  return (
      <div id="attribution"></div>
    );
}