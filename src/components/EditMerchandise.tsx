import React, {FormEvent} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useCategory, useMerchandise } from "../hooks/ApiHooks";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import MyModal from "./MyModal";
import { useLoaderData, useNavigate } from "react-router-dom";
import {LoaderData} from "./SingleCard";

export default function EditMerchandise () {
  const [showModal, setShowModal] = useState(false);
  const { getCategories } = useCategory();
  const [categories, setCategories] = useState<Category[]>([]);
  const { updateMerchandise } = useMerchandise();
  const [updatedMerch, setUpdatedMerch] = useState({
    merchandise_name: "",
    description: "",
    price: 0,
    category: "",
  })
  const {merchandise} = useLoaderData() as LoaderData;
  const navigate = useNavigate();

  // post the merchandise via graphql sesrver to the database
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const priceNumber = updatedMerch.price;
    const merchandiseData = {
        merchandise_name: updatedMerch.merchandise_name,
        description: updatedMerch.description,
        price: priceNumber,
        category: updatedMerch.category,
    };
    try {
        const response = await updateMerchandise(merchandise.id, merchandiseData);

        if (response.message === "Merchandise updated") {
            setShowModal(true);
        
            setTimeout(() => {
                setShowModal(false);
                navigate(`/home/shop/${merchandise.id}`);
            }, 1000); 
        }
    } catch (error) {
        console.log("handleSubmit in EditMerchandise error: ", error);
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("Category changed:", e.target.value);
    setUpdatedMerch({
      ...updatedMerch,
      category: e.target.value,
    });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Price changed:", e.target.value);
    const priceValue = parseFloat(e.target.value);
    setUpdatedMerch({
      ...updatedMerch,
      price: priceValue,
    });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Description changed:", e.target.value);
    setUpdatedMerch({
      ...updatedMerch,
      description: e.target.value,
    });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Name changed:", e.target.value);
    setUpdatedMerch({
      ...updatedMerch,
      merchandise_name: e.target.value,
    });
  };

  const fetchCategories = async () => {
    try {
      const categories = await getCategories();
      setCategories(categories);
      return categories;
    } catch (error) {
      console.log("fetchCategories error: ", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    setUpdatedMerch({
        merchandise_name: merchandise.merchandise_name,
        description: merchandise.description,
        price: merchandise.price,
        category: (merchandise.category as Category).id,
    })
  }, [merchandise])

    return (
      <Container fluid
        className="d-flex flex-row justify-content-around align-items-center fw-bold my-5"
      >
        <Col md={8} lg={8}
          className="bg-light text-black p-5 rounded-5"
        >
          <Form 
            className="text-center" onSubmit={handleSubmit}>
            <h2 className="mb-4">Edit your merchandise</h2>
            <Form.Group className="mb-3 text-start"
              controlId="formBasicMerchandiseName"                  
            >
              <Form.Label>Merchandise name</Form.Label>
                <Form.Control
                  type="merchandiseName"
                  placeholder="Enter merchandise name"
                  value={updatedMerch.merchandise_name}
                  onChange={handleNameChange}
                />
            </Form.Group>
            <Form.Group
              className="mb-3 text-start"
              controlId="formBasicDescription"
            >
              <Form.Label>Description</Form.Label>
                <Form.Control
                  type="description"
                  placeholder="Enter description"
                  value={updatedMerch.description}
                  onChange={handleDescriptionChange}
                />
            </Form.Group>
            <Form.Group 
              className="mb-3 text-start" 
              controlId="formBasicPrice"
            >
              <Form.Label>Price</Form.Label>
                <Form.Control
                  type="price"
                  placeholder="Enter price"
                  value={updatedMerch.price}
                  onChange={handlePriceChange}
                />
            </Form.Group>
            <Form.Group 
              className="mb-3 text-start" 
              controlId="formBasicCategory"
            >
              <Form.Label>Category</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  value={updatedMerch.category}
                  onChange={handleCategoryChange}
                >
                  <option>Open this select menu</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.category_name}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
              </Form>
            </Col>
            {showModal && <MyModal text="Merchandise updated." />}
        </Container>
    )
};