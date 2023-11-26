import React, {useState} from "react";
import { Modal, Slider, Radio, Input, Checkbox } from 'antd';
import EditModalSection from "./EditModalSection";
import { ChromePicker } from 'react-color'

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

const borderDirection = [
  { label: 'Left', value: 'left' },
  { label: 'Right', value: 'right' },
  { label: 'Top', value: 'top' },
  {label: 'Bottom', value: 'bottom'}
];

const EditModal = ({showEditModal, handleOk, setShowEditModal, currentValues}) => {
  const [wrapperWidth, setWrapperWidth] = useState(currentValues.wrapperWidth)
  const [itemDistance, setItemDistance] = useState(currentValues.itemDistance)
  const [borderEnabled, setBorderEnabled] = useState(currentValues.borderEnabled)
  const [borderWidth, setBorderWidth] = useState(currentValues.borderWidth)
  const [borderColor, setBorderColor] = useState(currentValues.borderColor)
  const [borderOptions, setBorderOptions] = useState(Object.entries(currentValues.borderOptions).filter(([key,value])=>value===true).map(([key,value])=> key))
  const [showBorderColorPicker, setShowBorderColorPicker] = useState(false)
  const [sectionTitleOrientation, setSectionTitleOrientation] = useState('horizontal')
  const [sectionTitleAlignment, setSectionTitleAlignment] = useState('flex-start')
  const [editState, setEditState] = useState({
    'section title': {
      fontSize: currentValues.sectionTitleSize,
      weight: currentValues.sectionTitleWeight,
      color: currentValues.sectionTitleColor,
      fontFamily: currentValues.sectionTitleFamily
    },
    title: {
      fontSize: currentValues.titleSize,
      weight: currentValues.titleWeight,
      color: currentValues.titleColor,
      fontFamily: currentValues.titleFamily
    },
    description: {
      fontSize: currentValues.descriptionSize,
      weight: currentValues.descriptionWeight,
      color: currentValues.descriptionColor,
      fontFamily: currentValues.descriptionFamily
    },
    price: {
      fontSize: currentValues.priceSize,
      weight: currentValues.priceWeight,
      color: currentValues.priceColor,
      fontFamily: currentValues.priceFamily
    }
  })

  const handleBorderOptionsChange = (checkedValues) => {
    setBorderOptions(checkedValues)
  }

  return <><Modal title="Edit Content" open={showEditModal} onOk={() => handleOk({...editState,wrapperWidth,sectionTitleOrientation, sectionTitleAlignment, borderWidth, borderColor, borderOptions, borderEnabled, itemDistance})} onCancel={() => setShowEditModal(false)}>
  <div className="flex flex-row gap-4 flex-wrap">
    <div className="flex flex-col gap-4 w-full"><label>Title Orientation:</label>
    <Radio.Group onChange={(e) => setSectionTitleOrientation(e.target.value)} value={sectionTitleOrientation}>
      <Radio value={'horizontal'}>Horizontal</Radio>
      <Radio value={'vertical'}>Vertical</Radio>
    </Radio.Group></div>
    <div className="flex flex-col gap-4 w-full"><label>Title Alignment:</label>
    <Radio.Group onChange={(e) => setSectionTitleAlignment(e.target.value)} value={sectionTitleAlignment}>
      <Radio value={'flex-start'}>Left</Radio>
      <Radio value={'center'}>Center</Radio>
      <Radio value={'flex-end'}>Right</Radio>
    </Radio.Group></div>
    <div className="flex flex-row gap-4">
    <Input type="number" value={itemDistance} onChange={(e) => setItemDistance(e.target.value)} addonBefore="Distance between items" addonAfter="px" />
    </div>
    <div className="flex flex-col gap-4 w-full">
      <h6>Content border:</h6>
      <div className="flex flex-row gap-4"><Checkbox checked={borderEnabled} onChange={(e) => setBorderEnabled(e.target.checked)}>
          Enable border
        </Checkbox></div>
      {borderEnabled && <><div className="flex flex-row gap-4">
        <Input type="number" value={borderWidth} onChange={(e) => setBorderWidth(e.target.value)} addonBefore="Border width" addonAfter="px" />
      </div>
      <div className="flex flex-row gap-4">
        <button className="btn btn-info btn-sm" onClick={() => setShowBorderColorPicker(true)}>Border color</button>
        { showBorderColorPicker && <div style={ popover }>
          <div style={ cover } onClick={ () => setShowBorderColorPicker(false) }/>
          <ChromePicker color={borderColor} onChange={(color) => setBorderColor(color.hex)} />
        </div> }
      </div>
      <div className="flex flex-row gap-4">
        <Checkbox.Group
          options={borderDirection}
          value={borderOptions}
          onChange={handleBorderOptionsChange}
        />
      </div></>}
    </div>
    <div className="flex flex-col gap-4 w-full"><label className='w-36'>Container width:</label>
    <Slider className='w-full' onChange={(value) => setWrapperWidth(value)} value={wrapperWidth} min={100} max={1000} step={5} /></div>
    {editState && Object.keys(editState).map((key, i) => <EditModalSection key={i} type={key} color={editState[key].color} weight={editState[key].weight} fontSize={editState[key].fontSize} fontFamily={editState[key].fontFamily} setState={setEditState} />)}
  </div>
</Modal></>
}

export default EditModal;