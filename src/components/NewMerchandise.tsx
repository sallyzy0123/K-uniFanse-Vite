import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useCategory, useMerchandise } from "../hooks/ApiHooks";
import { useEffect, useState, useRef } from "react";
import { upload_url } from "../variables/variables";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import MyModal from "./MyModal";
import { useNavigate } from "react-router-dom";

export type MerchandiseInput = {
  merchandise: {
    merchandise_name: string;
    description: string;
    price: number;
    category: string;
    filename: string;
  };
};

export default function NewMerchandise () {
  const [showModal, setShowModal] = useState(false);
  const { getCategories } = useCategory();
  const [categories, setCategories] = useState<Category[]>([]);
  const [merchandiseName, setMerchandiseName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const { postMerchandise } = useMerchandise();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // upload the image to upload server and get the filename
  const uploadImage = async (file: File) => {
    const token = localStorage.getItem("userToken");
    const formData = new FormData();
    formData.append("merch", file);

    const imageUpload = await fetch(upload_url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const imageUploadJson = await imageUpload.json();
    console.log("imageUpload:", imageUploadJson);
    return imageUploadJson;
  };

  // post the merchandise via graphql sesrver to the database
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      return;
    }
    const filenameResponse = await uploadImage(file);
    const filename = filenameResponse.data.filename;
    const priceNumber = parseFloat(price);

    // TODO: add the map for the location
    const merchandise: MerchandiseInput = {
      merchandise: {
        merchandise_name: merchandiseName,
        description,
        price: priceNumber,
        category,
        filename,
      },
    };
    const response = await postMerchandise(merchandise);


    // TODO: add clear if statement here
    if (response.message === "Merchandise created.") {
      setShowModal(true);

      setTimeout(() => {
        setShowModal(false);
        navigate('/K-uniFanse-Vite/home/shop');
      }, 1000); // 1 seconds

      // Reset form fields
      setMerchandiseName("");
      setDescription("");
      setPrice("");
      setCategory("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
    
  };

  const fetchCategories = async () => {
    try {
      const categories = await getCategories();
      setCategories(categories);
      return categories;
    } catch (error) {
      console.log("fetchHeroes in chatList error: ", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

    return (
      <Container fluid
        className="d-flex flex-row justify-content-around align-items-center fw-bold my-5"
      >
        <Col md={8} lg={8}
          className="bg-light text-black p-5 rounded-5"
        >
          <Form className="text-center" onSubmit={handleSubmit}>
            <h2 className="mb-4">Add new merchandise</h2>
            <Form.Group className="mb-3 text-start"
              controlId="formBasicMerchandiseName"                  
            >
              <Form.Label>Merchandise name</Form.Label>
                <Form.Control
                  type="merchandiseName"
                  placeholder="Enter merchandise name"
                  value={merchandiseName}
                  onChange={(e) => setMerchandiseName(e.target.value)}
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
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
            </Form.Group>
            <Form.Group 
              className="mb-3 text-start" 
              controlId="formBasicCategory"
            >
              <Form.Label>Category</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option>Open this select menu</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.category_name}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3 text-start" controlId="formFile">
                <Form.Label>File input</Form.Label>
                  <Form.Control
                    type="file"
                    ref={fileInputRef}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFile(e.target.files?.[0] || null)}
                  />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
              </Form>
            </Col>
            {showModal && <MyModal text="Merchandise created." />}
        </Container>
    )
};