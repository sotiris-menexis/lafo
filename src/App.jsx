import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header'
import Inputs from './components/Inputs';
import Category from './components/Category';
import Page from './components/Page';
import Details from './components/Details';
import { Slider } from 'antd';
import { cssPresets } from './constants/global';

function App() {
  const [data, setData] = useState(null)
  const [images, setImages] = useState(null)
  const [pages, setPages] = useState(null)
  const [margins, setMargins] = useState(null)
  const [order, setOrder] = useState(null)
  const [selected, setSelected] = useState(null)
  const [backgroundSize, setBackgroundSize] = useState(400)
  useEffect(() => console.log(backgroundSize),[backgroundSize])

  return (
    <>
      <Header/>
      <Inputs
        setData={setData} 
        setImages={setImages} 
        setPages={setPages} 
        setMargins={setMargins} 
        setOrder={setOrder} 
        setSelected={setSelected} />
      <div className="flex flex-row w-full px-8">
        {images && <div className='flex flex-col gap-1s'><label>Backgrounds width:</label><Slider style={{
          width: 350
        }} min={100} max={1000} value={backgroundSize} onChange={(value) => setBackgroundSize(value)} step={10} /></div>}
      </div>
      <div className="flex flex-row mt-8 gap-8 px-8 py-6">
        <div className="flex flex-row flex-wrap">
          <div className="flex flex-col w-fit gap-4">
            {images && images.map((image,i) => <Page key={i} image={image} size={backgroundSize} />)}
          </div>
        </div>
        <div className="flex flex-row w-6/12 flex-wrap h-fit">
          {data && margins && order && selected && pages && images && Object.keys(data).map((key,i) => 
          <Category 
            key={i} 
            itemKey={key} 
            itemMargins={margins[key]} 
            itemOrder={order[key]} 
            itemSelected={selected[key]}
            setItemSelected={setSelected}
            itemPages={pages[key]}
            images={images} />)}
            <div className="row mt-16 w-full">
            {selected && data && Object.entries(selected).filter(item => item[1] === true).map((item,i) => <Details key={item[0]} itemKey={item[0]} itemData={data[item[0]]} preset={cssPresets[item[0]]} backgroundSize={backgroundSize} />)}
            </div>
        </div>
      </div>
    </>
  );
}

export default App;
