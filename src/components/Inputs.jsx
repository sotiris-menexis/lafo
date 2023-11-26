import React, {useState} from "react";
import {Input, Steps} from "antd"
import readXlsxFile from 'read-excel-file'

const Inputs = ({setData, setImages, setOrder, setMargins, setPages, setSelected}) => {

  const handleProcess = () => {
    if(document.getElementById('excel-input').files[0] && document.getElementById("images-input").files) {
      readXlsxFile(document.getElementById("excel-input").files[0]).then(function(rows) {
        // `rows` is an array of rows
        // each row being an array of cells.
        let data = {}
        let pages = {}
        let margins = {}
        let order = {}
        let selected = {}
        rows = rows.slice(1)
        for(const row of rows) {
          if(!data[row[3]]) {
            data[row[3]] = []
          }
          data[row[3]].push({
            title: row[0],
            description: row[1] ? row[1].replaceAll('\n', ' '): null,
            price: parseFloat(row[2]).toFixed(2)
          })
          pages[row[3]] = null
          margins[row[3]] = null
          order[row[3]] = null
          selected[row[3]] = false
        }
        const images = []
        for(const image of document.getElementById("images-input").files){
          images.push(URL.createObjectURL(image))
        }
        setImages(images)
        setOrder(order)
        setMargins(margins)
        setPages(pages)
        setSelected(selected)
        setData(data)
      })
    }
  }
  return <div className="mt-8 flex flex-row flex-wrap gap-8 mx-4 justify-between">
    <div className="w-5/12"><Input id="excel-input" type="file" accept=".xlsx" addonBefore="Import excel"/></div>
    <div className="w-5/12"><Input id="images-input" type="file" multiple accept=".png,.jpg" addonBefore="Import images"/></div>
    <div className="w-full flex justify-center"><button onClick={handleProcess} className="bg-sky-400 hover:bg-sky-500 text-white p-2 rounded">Process</button></div>
  </div>
}

export default Inputs;