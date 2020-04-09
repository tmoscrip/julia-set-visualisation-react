import React from 'react'
import GUI from './gui/GUI'
import Folder from './gui/base_components/Folder'
import Coefficients from './gui/julia/Coefficients'
import { ConstantPointY, ConstantPointX } from './gui/julia/ConstantPoint'
import MaxIterations from './gui/julia/MaxIterations'
import EscapeRadius from './gui/julia/EscapeRadius'
import SmoothingToggle from './gui/julia/SmoothingToggle'
import TimeScale from './gui/julia/TimeScale'
import DimensionsFolder from './gui/viewport/Dimensions'
import { TranslateX, TranslateY } from './gui/viewport/Translate'
import LockAspectRatio from './gui/viewport/LockAspectRatio'
import ColorCurveSelector from './gui/colourmapping/ColorCurveSelector'
import ColorModelSelector from './gui/colourmapping/ColorModelSelector'
import ColorMapFolder from './gui/colourmapping/ColorMapFolder'
import MSAA from './gui/julia/MSAA'
import PauseButton from './gui/other/PauseButton'
import PresetFolder from './gui/presets/PresetFolder'
import { useToggle } from './Hooks'
import ToggleMenuButton from './gui/other/ToggleMenuButton';

export default function MyGUI() {
  const [hideMenu, toggleMenu] = useToggle(false)

  return (
    <GUI>
      <PauseButton />
      <ToggleMenuButton onClick={toggleMenu}/>
      <div style={{ display: hideMenu ? 'none' : 'inherit' }}>
        <Folder title='Julia Variables'>
          <Coefficients />
          <Folder title='Constant Point'>
            <ConstantPointX />
            <ConstantPointY />
          </Folder>
          <MaxIterations />
          <EscapeRadius />
          <SmoothingToggle />
          <MSAA />
          <TimeScale />
        </Folder>
        <Folder title='Viewport'>
          <DimensionsFolder />
          <Folder title='Translate'>
            <TranslateX />
            <TranslateY />
          </Folder>
          <LockAspectRatio />
        </Folder>
        <Folder title='Colour Mapping'>
          <ColorMapFolder />
          <ColorCurveSelector />
          <ColorModelSelector />
        </Folder>
        <PresetFolder />
      </div>
    </GUI>
  )
}
