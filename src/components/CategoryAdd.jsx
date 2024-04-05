import React, { useState } from "react";
import axios from "axios";
import trash from "../assets/trash.svg";

const CategoryAdd = ({ showModal, setShowModal }) => {
  let token = localStorage.getItem("token");

  const [categoryData, setCategoryData] = useState({
    name_uz: "",
    name_ru: "",
  });

  const [selectedImages, setSelectedImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({
      ...categoryData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(files);
  };

  const handleDeleteImage = (index) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    selectedImages.forEach((image) => {
      formData.append("images", image);
    });
    formData.append("name_en", categoryData.name_uz);
    formData.append("name_ru", categoryData.name_ru);
  
    try {
      const response = await axios.post(
        "https://autoapi.dezinfeksiyatashkent.uz/api/categories",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      setShowModal(false);
      // Clear form inputs and selected images
      setCategoryData({
        name_uz: "",
        name_ru: "",
      });
      setSelectedImages([]);
      alert("Category added successfully");
    } catch (error) {
      console.error(error.response);
      alert("Failed to add category. Please try again.");
    }
  };
  

  return (
    <div>
      {showModal && (
        <div
          className="modal text-left"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Category</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name_uz" className="form-label">
                      Name uz
                    </label>
                    <input
                      type="text"
                      id="name_uz"
                      name="name_uz"
                      value={categoryData.name_uz}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="name_ru" className="form-label">
                      Name ru
                    </label>
                    <input
                      type="text"
                      id="name_ru"
                      name="name_ru"
                      value={categoryData.name_ru}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="myImages" className="form-label">
                      Upload Images
                    </label>
                    <input
                      type="file"
                      name="myImages"
                      onChange={handleImageChange}
                      className="form-control"
                      multiple
                    />
                  </div>
                  {selectedImages.length > 0 && (
                    <div>
                      <h5>Selected Images:</h5>
                      {selectedImages.map((image, index) => (
                        <div key={index}>
                          <img
                            alt={`Selected ${index + 1}`}
                            width={"100px"}
                            src={URL.createObjectURL(image)}
                          />
                          <br />
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDeleteImage(index)}
                          >
                            <img src={trash} alt="" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryAdd;
