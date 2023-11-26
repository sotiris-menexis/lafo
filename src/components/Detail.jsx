import React from 'react';


const Detail = ({item, values}) => {
  

  return (<>
    <div className='flex flex-col gap-1 item-wrapper relative handle'>
      <div className="flex flex-row justify-between">
        <p className='item-title' style={{
          fontSize: values.titleSize,
          fontWeight: values.titleWeight,
          color: values.titleColor,
          fontFamily: values.titleFamily
        }}>{item.title}</p>
        <p className='item-price' style={{
          fontSize: values.priceSize,
          fontWeight: values.priceWeight,
          color: values.priceColor,
          fontFamily: values.priceFamily,
        }}>{item.price}€</p>
      </div>
      {item.description && <div className="flex flex-row">
        <p className='item-description' style={{
          fontSize: values.descriptionSize,
          fontWeight: values.descriptionWeight,
          color: values.descriptionColor,
          fontFamily: values.descriptionFamily
        }}>{item.description}</p>
      </div>}
      
  </div>
  </>)
}

export default Detail;