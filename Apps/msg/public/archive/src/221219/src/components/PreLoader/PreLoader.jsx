import React from 'react';
import { Block, Svg } from '../';

export default function PreLoader () {
  return (
    <Block className="preloader">
      <Block className="">
        <Block className="preloder-inner-1">
          <Block className="coast coast-mobile">
            <Block className="wave-rel-wrap">
              <Block className="wave-new"></Block>
            </Block>
          </Block>
          <Block className="coast delay coast-mobile">
            <Block className="wave-rel-wrap">
              <Block className="wave-new delay"></Block>
            </Block>
          </Block>
          <Block className="text-preloader text-preloader-main text-preloader-w"><Svg name="logo-preloader" /></Block>
          <Block className="text-preloader text-preloader-main text-preloader-a"></Block>
          <Block className="text-preloader text-preloader-e">b</Block>
          <Block className="text-preloader text-preloader-f">y</Block>
          <Block className="text-preloader text-preloader-g">i</Block>
          <Block className="text-preloader text-preloader-h">n</Block>
          <Block className="text-preloader text-preloader-i">t</Block>
          <Block className="text-preloader text-preloader-j">e</Block>
          <Block className="text-preloader text-preloader-k">r</Block>
          <Block className="text-preloader text-preloader-l">t</Block>
          <Block className="text-preloader text-preloader-m">o</Block>
          <Block className="text-preloader text-preloader-n">w</Block>
          <Block className="text-preloader text-preloader-o">n</Block>
        </Block>
      </Block>
    </Block>
  )
}