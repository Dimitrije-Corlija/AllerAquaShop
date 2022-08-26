import React, { useEffect } from 'react'
import { Link,useLocation,useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, Form, Button, Card, ListGroup  } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from "../actions/cartActions";
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'


const CartScreen = () => {

  const navigate = useNavigate();

  const location = useLocation();

  const productId = location.pathname.split("/")[2];

  const [searchParams] = useSearchParams();

  //const qty = location.search ? location.search.split('=')[1] : 1
  const qty = searchParams.get("qty") ? Number(searchParams.get("qty")):1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const {loading, cartItems } = cart;

  useEffect(() => {
    dispatch({type: ORDER_CREATE_RESET });
    dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    if(productId) {
        dispatch(addToCart(productId,qty))
        dispatch({type: ORDER_CREATE_RESET });
    }
  }, [dispatch,productId,qty])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return(
    <Row>
    <Col md={8}>
      <Button  type='button' variant='light'>
        <Link to='/'>Go Back</Link>
      </Button>
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <Message>
          Your cart is empty <Link to='/'>Go Back</Link>
        </Message>
      ) : (
        <ListGroup variant='flush'>
          {cartItems.map((item) => (
            <ListGroup.Item key={item.product}>
              <Row>
                <Col md={2}>
                  <Image src={item.image} alt={item.name} fluid rounded />
                </Col>
                <Col md={3}>
                  <Link to={`/product/${item.product}`}>{item.name}</Link>
                </Col>
                <Col md={2}>${item.price}</Col>
                <Col md={2}>
                  <Form.Control
                    as='select'
                    value={item.qty}
                    onChange={(e) =>
                      dispatch(
                        addToCart(item.product, Number(e.target.value))
                      )
                    }
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
                <Col md={2}>
                  <Button
                    type='button'
                    variant='light'
                    onClick={() => removeFromCartHandler(item.product)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Col>
    <Col md={4}>
      <Card>
        <ListGroup variant='flush'>
          <ListGroup.Item>
          <h2>
                Subtotal (
                {cartItems.reduce(
                  (acc, item) => acc + item.qty,
                  0
                )}
                ) items
              </h2>
            $
            {cartItems
              .reduce((acc, item) => acc + item.qty * item.price, 0)
              .toFixed(2)}
          </ListGroup.Item>
          <ListGroup.Item>
            <Button
              type='button'
              className='btn-block'
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}
            >
              Proceed To Checkout
            </Button>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Col>
  </Row>
  )
}

export default CartScreen
