import { useParams } from "react-router-dom";
import React from 'react'
import { useEffect,useState } from "react";
import {Row,Col,Image,ListGroup,Card,Button,} from 'react-bootstrap'
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import axios from 'axios'
const ProductScreen = () => {
    const [product, setProduct]= useState({});
    
    const {id:productId} = useParams() //**useParams is a hook provided by the react-router-dom library in React. It is used to access the parameters in the URL. When a route is defined with a dynamic segment, like :id, useParams allows you to extract and use that parameter in your component.
    useEffect(()=>{
        const fetchProduct = async()=>{  // using JavaScript with the axios library to make an asynchronous request to a server to fetch product data. The async/awa syntax is commonly used with asynchronous operations to make code more readable and maintainable. 
            const {data} = await axios.get(`/api/products/${productId}`)
            console.log(data)
            setProduct(data)
        }
        fetchProduct()
    },[productId])
    
  
    return (
    <>

    <Link className='btn btn-light my-3' to='/'>Go Back</Link>
    <Row>
        <Col md={5}>
            <Image src={product.image} alt={product.name} fluid/>
        </Col>
        <Col md={4}>
            <ListGroup variant="flush"> {/**The variant="flush" is commonly associated with Bootstrap and refers to a variant of a component with no borders or rounded corners, providing a clean, "flush" appearance. */}
                <ListGroup.Item><h3>{product.name}</h3></ListGroup.Item>
                <ListGroup.Item><Rating value={product.rating} text={`${product.numReviews} Reviews`}/></ListGroup.Item>
                <ListGroup.Item>Description:{product.description}</ListGroup.Item>

            </ListGroup>
        </Col>
        <Col md={3}>
            <Card>
                <ListGroup variant="flush"> 
                    <ListGroup.Item>
                        <Row>
                        <Col>Price:</Col>
                        <Col><strong>${product.price}</strong></Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                        <Col>Status:</Col>
                        <Col><strong>{product.countInStock> 0?'In Stock':'Out of Stock'}</strong></Col>
                        </Row>
                        
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Button className="btn-block"
                        type="button"
                        disabled={product.countInStock === 0}>Add to Cart</Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card>


        </Col>
    </Row>
    </>
  )
}

export default ProductScreen
