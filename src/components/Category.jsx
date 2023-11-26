import React from "react";
import { MdKeyboardArrowUp,MdKeyboardArrowDown } from "react-icons/md";

const Category = ({itemKey, itemSelected, itemMargins, itemOrder, itemPages, images, setItemSelected}) => {
  return <div className="flex flex-row m-2 items-center">
   {/*  {itemSelected && <div className="flex flex-row flex-wrap w-4 h-8 items-center">
      <MdKeyboardArrowUp/>
      <MdKeyboardArrowDown/>
    </div>} */}
    <div className="flex flex-col items-center">
{/*       {itemSelected && <div className="flex flex-row flex-wrap w-4 h-8 items-center">
        <MdKeyboardArrowUp/>
        <MdKeyboardArrowDown/>
      </div>} */}
        <input checked={itemSelected} onChange={(e) => {
        setItemSelected(prev => ({...prev, [itemKey]: e.target.checked}))
      }} type="checkbox" aria-label={itemKey} className="btn"/>
      {/* {itemSelected && <div className="flex flex-row flex-wrap w-4 h-8 items-center">
        <MdKeyboardArrowUp/>
        <MdKeyboardArrowDown/>
      </div>} */}
    </div>
{/*     {itemSelected && <div className="flex flex-row flex-wrap w-4 h-8 items-center">
      <MdKeyboardArrowUp/>
      <MdKeyboardArrowDown/>
    </div>} */}
  </div>
}

export default Category;