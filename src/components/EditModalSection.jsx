import React, {useState} from "react";
import { ChromePicker } from 'react-color'
import { Input, Radio } from 'antd';

const popover = {
  position: 'absolute',
  zIndex: '2',
}
const cover = {
  position: 'fixed',
  top: '0px',
  right: '0px',
  bottom: '0px',
  left: '0px',
}
const EditModalSection = ({type, color, weight, fontSize, fontFamily, setState}) => {
  const [showColorPicker, setShowColorPicker] = useState(false)
  const handleChangeFontSize = (e) => {
    setState(prev => ({...prev, [type]: {...prev[type], fontSize: parseInt(e.target.value)}}))
  }
  return <div className="flex flex-col gap-4">
  <h6>Change {type}:</h6>
  <div className="flex flex-row gap-4">
    <button className="btn btn-info btn-sm" onClick={() => setShowColorPicker(true)}>Choose color</button>
    { showColorPicker && <div style={ popover }>
      <div style={ cover } onClick={ () => setShowColorPicker(false) }/>
      <ChromePicker color={color} onChange={(color) => setState(prev => ({...prev, [type]: {...prev[type],color: color.hex}}))} />
    </div> }
  </div>
  <div className="flex flex-row gap-4">
    <Input addonBefore='Text size' type="number" value={fontSize} onChange={handleChangeFontSize}  placeholder="Input integer" addonAfter='px' />
  </div>
  <div className="flex flex-row gap-4">
  <div className="flex flex-col gap-4">
    <h6>Font weight:</h6>
    <Radio.Group onChange={(e) => setState((prev) => ({...prev, [type]: {...prev[type], weight: e.target.value}}))} value={weight}>
      <Radio value={'normal'}>Normal</Radio>
      <Radio value={'bold'}>Bold</Radio>
      <Radio value={'bolder'}>Bolder</Radio>
    </Radio.Group>
  </div>
  <div className="flex flex-col gap-4">
    <h6>Font family:</h6>
    <Radio.Group onChange={(e) => setState((prev) => ({...prev, [type]: {...prev[type], fontFamily: e.target.value}}))} value={fontFamily}>
      <Radio value={'AC-5yearsold_unicode'}>AC-5yearsold_unicode</Radio>
      <Radio value={'CenturyGothic'}>CenturyGothic</Radio>
      <Radio value={'PepperHands-Regular'}>PepperHands-Regular</Radio>
      <Radio value={'VAG-HandWritten'}>VAG-HandWritten</Radio>
    </Radio.Group>
  </div>
  </div>
</div>
}

export default EditModalSection;