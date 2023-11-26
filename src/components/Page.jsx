import React from 'react';

const Page = ({image, size}) => {
  console.log(image)
  return <div className='flex flex-row w-fit'>
    <div className="flex image-wrapper"><img key={size} src={image} alt='page-image' style={{objectFit: 'scale-down', width: `${size}px`}}/></div>
  </div>
}

export default Page;