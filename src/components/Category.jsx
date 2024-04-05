// Category.js
import React, { useState } from 'react';
import CategoryAdd from './CategoryAdd';
import Table from 'react-bootstrap/Table';
import { useEffect } from 'react';
import axios from 'axios';
import trash from '../assets/trash.svg'
import edit from '../assets/edit.svg'

const Category = () => {
  const [showModal, setShowModal] = useState(false);

  const [categories, setCategories] = useState([]);
  const imgUrl = "https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/";

  useEffect(() => {
    axios.get("https://autoapi.dezinfeksiyatashkent.uz/api/categories")
    .then(response => {
      console.log(response.data.data);
      setCategories(response.data.data)
    })
  }, [])


  return (
    <div className='category-list'>
      <div className="container">
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>Add Category</button>
        <CategoryAdd showModal={showModal} setShowModal={setShowModal} />
      </div>

      <Table className='mt-5' striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Avatar</th>
          <th>Name En</th>
          <th>Name Ru</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {
          categories.map((category, index) => {
            return(
              <tr  key={category.id}>
                <td>{index}</td>
                <td>
                <img style={{width:"60px", height:"60px"}} src={`${imgUrl}${category.image_src}`} alt=""/>
                </td>
                <td>{category.name_en}</td>
                <td>{category.name_ru}</td>
                <td>
                <img src={trash} alt="" />
                <img className='ms-3' src={edit} alt="" />
                </td>
              </tr>
            )
          })
        }
      </tbody>
    </Table>


    </div>
  );
}

export default Category;
