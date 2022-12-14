import React, { useEffect } from 'react'
import { useDispatch, useSelector  } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import { listProducts } from '../actions/productActions'
import { useParams } from 'react-router-dom'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
import { Link } from 'react-router-dom'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import { ORDER_CREATE_RESET } from "../constants/orderConstants";

const HomeScreen = () => {

  let { keyword, pageNumber } = useParams();


  if (!pageNumber || typeof pageNumber === "undefined") {
    pageNumber = 1;
  }

  const dispatch = useDispatch();

  const productList = useSelector(state => state.productList)
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
    dispatch({ type:ORDER_CREATE_RESET })
    dispatch({ type : PRODUCT_CREATE_REVIEW_RESET})
  }, [dispatch,keyword,pageNumber])

  return (
    <>
      <Meta />
      {!keyword && <ProductCarousel />}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  )
}
export default HomeScreen