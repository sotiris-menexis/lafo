import React, {useEffect, useRef, useState} from 'react';
import Detail from './Detail';
import Draggable from 'react-draggable';
import { MdModeEdit } from "react-icons/md";
import EditModal from './EditModal';


const Details = ({itemKey, itemData, preset, backgroundSize}) => {
  console.log(itemKey, itemData)
  const editBtnRef = useRef(null)
  const sectionTitleRef = useRef(null)
  const wrapperRef = useRef(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [currentValues, setCurrentValues] = useState(preset ? preset: {
    sectionTitleAlignment: 'center',
    sectionTitleOrientation: 'horizontal',
    sectionTitleColor: '#000',
    sectionTitleWeight: 'normal',
    sectionTitleSize: 36,
    sectionTitleFamily: 'VAG-HandWritten',
    titleColor: '#000',
    titleWeight: 'bold',
    titleSize: 12,
    titleFamily: 'CenturyGothic',
    descriptionColor: '#000',
    descriptionWeight: 'normal',
    descriptionSize: 9,
    descriptionFamily: 'AC-5yearsold_unicode',
    priceColor: '#000',
    priceWeight: 'bold',
    priceSize: 12,
    priceFamily: 'CenturyGothic',
    wrapperWidth: 400,
    borderWidth: 1,
    borderColor: "#000",
    borderOptions: {left: false,right: false,top:false,bottom:false},
    borderEnabled: false,
    itemDistance: 1,
    lineHeight: 1,
  })

  const enableBorder = (borderSide, options) => {
    if(options.includes(borderSide)){
      wrapperRef.current.style[`border${borderSide.slice(0,1).toUpperCase()+borderSide.slice(1)}Style`] = 'solid'
    }else {
      wrapperRef.current.style[`border${borderSide.slice(0,1).toUpperCase()+borderSide.slice(1)}Style`] = 'none'
    }
  }

  const handleOk = (editValues) => {
    console.log(editValues)
    if(editBtnRef.current) {
      editBtnRef.current.style.right = `-${(backgroundSize - editValues.wrapperWidth + 50)}px`
    }
    let correctedBorderOptions = currentValues.borderOptions

    for(const key in correctedBorderOptions) {
      if(editValues.borderOptions.includes(key)){
        correctedBorderOptions[key] = true;
      }else {
        correctedBorderOptions[key] = false;
      }
    }
    if(wrapperRef.current && editValues.borderEnabled) {
      wrapperRef.current.style.borderColor = editValues.borderColor
      wrapperRef.current.style.borderWidth = `${editValues.borderWidth}px`
      enableBorder('top', editValues.borderOptions)
      enableBorder('left', editValues.borderOptions)
      enableBorder('right', editValues.borderOptions)
      enableBorder('bottom', editValues.borderOptions)
    }else {
      wrapperRef.current.style.borderColor = 'transparent'
      wrapperRef.current.style.borderWidth = 0
      wrapperRef.current.style.borderTopStyle = 'none'
      wrapperRef.current.style.borderLeftStyle = 'none'
      wrapperRef.current.style.borderRightStyle = 'none'
      wrapperRef.current.style.borderBottomStyle = 'none'
    }

    wrapperRef.current.style.lineHeight = 1

    setCurrentValues({
      sectionTitleAlignment: editValues.sectionTitleAlignment,
      sectionTitleOrientation: editValues.sectionTitleOrientation,
      sectionTitleColor: editValues['section title'].color,
      sectionTitleWeight: editValues['section title'].weight,
      sectionTitleSize: editValues['section title'].fontSize,
      sectionTitleFamily: editValues['section title'].fontFamily,
      titleColor: editValues.title.color,
      titleWeight: editValues.title.weight,
      titleSize: editValues.title.fontSize,
      titleFamily: editValues.title.fontFamily,
      descriptionColor: editValues.description.color,
      descriptionWeight: editValues.description.weight,
      descriptionSize: editValues.description.fontSize,
      descriptionFamily: editValues.description.fontFamily,
      priceColor: editValues.price.color,
      priceWeight: editValues.price.weight,
      priceSize: editValues.price.fontSize,
      priceFamily: editValues.price.fontFamily,
      wrapperWidth: editValues.wrapperWidth,
      borderColor: editValues.borderColor,
      borderWidth: editValues.borderWidth,
      borderOptions: correctedBorderOptions,
      borderEnabled: editValues.borderEnabled,
      itemDistance: editValues.itemDistance,
    })
    setShowEditModal(false)
  }
  useEffect(() => {
    if(wrapperRef.current) {
      if(preset.borderEnabled) {
        wrapperRef.current.style.borderWidth = preset.borderWidth
        wrapperRef.current.style.borderColor = preset.borderColor
        if(preset.borderOptions.top){
          wrapperRef.current.style.BorderTopStyle = 'solid'
        }
        if(preset.borderOptions.left){
          wrapperRef.current.style.BorderLeftStyle = 'solid'
        }
        if(preset.borderOptions.right){
          wrapperRef.current.style.BorderRightStyle = 'solid'
        }
        if(preset.borderOptions.bottom){
          wrapperRef.current.style.BorderBottomStyle = 'solid'
        }
      } 
    }
  },[wrapperRef])
  return (
    <Draggable
    axis="both"
    scale={1}>
    <div ref={wrapperRef} className='d-flex flex-col w-fit' style={{
      lineHeight: currentValues.lineHeight
    }}>
      <div className={`flex flex-wrap${currentValues.sectionTitleOrientation === 'horizontal' ? ' flex-row' : ' flex-row-reverse'}`} style={{
        width: `${currentValues.wrapperWidth}px`
      }}>
        <div className={`section-title-wrapper flex${currentValues.sectionTitleOrientation === 'horizontal' ? ' flex-row': ' flex-col'}`} style={{
          justifyContent: currentValues.sectionTitleAlignment,
          width: currentValues.sectionTitleOrientation === 'horizontal' ? '100%': sectionTitleRef.current ? `${sectionTitleRef.current.clientHeight}px`: '100%'
        }}><h4 ref={sectionTitleRef} className={`section-title${currentValues.sectionTitleOrientation === 'vertical' ? ' vertical' : ''}`} style={{
          color: currentValues.sectionTitleColor,
          fontSize: currentValues.sectionTitleSize,
          fontWeight: currentValues.sectionTitleWeight,
          fontFamily: currentValues.sectionTitleFamily,
          lineHeight:1.5,
        }}>{itemKey}</h4></div>
        <div className="flex flex-col flex-1" style={{
          gap: `${currentValues.itemDistance}px`
        }}>
        {itemData.map((item, i) => <Detail key={i} item={item} values={currentValues} />)}
        </div>
      </div>
      <button ref={editBtnRef} style={{
        right: `${backgroundSize-currentValues.width +50}px`
      }} className='btn btn-primary btn-sm edit-btn' onClick={() => setShowEditModal(true)}><MdModeEdit/></button>
      <EditModal handleOk={handleOk} setShowEditModal={setShowEditModal} showEditModal={showEditModal} currentValues={currentValues} />
    </div>
  </Draggable>)
}

export default Details;