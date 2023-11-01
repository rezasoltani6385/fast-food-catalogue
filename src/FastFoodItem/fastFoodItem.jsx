import './fastFoodItem.css'
import {HiShoppingCart} from 'react-icons/hi'
import {FaRegComments} from 'react-icons/fa6'
import {CiCirclePlus} from 'react-icons/ci'
import {CiCircleMinus} from 'react-icons/ci'
import { useDispatch, useSelector } from 'react-redux'
import { addToCartAction } from '../Redux/action'
import { useState } from 'react'

const FastFoodItem = ({name, price, ingredients, imageUrl, delay, commentsCount}) => {
    const dispatch = useDispatch()
    const [orderCount, setOrderCount] = useState(1)
    const [orserSent, setOrderSent] = useState(false)
   

    const scrollToComments = ()=> {
        const commentsElement = document.getElementById("comments");
        if (commentsElement) {
          commentsElement.scrollIntoView({ behavior: "smooth" });
        }
    }

    const addtoCart = (e)=> {
        e.preventDefault()
        setOrderSent(true)
        dispatch(addToCartAction({name: name, price: price, count: orderCount}))
    }

    return (
        <div className="card product-card h-100 border-0 shadow-sm pb-1 fade-in-horiz" style={{animationDelay: `${delay}s`}}>
            <span className="badge badge-end badge-shadow bg-success fs-md fw-medium">
                قیمت : {price.toLocaleString()} تومان
            </span>
            <div className='card__placeholder'>
                <img src={imageUrl} className="card-img-top" />
            </div>
            <div className="card-body text-center pt-3 pb-4 d-flex flex-column">
                <h5 className="mb-2">{name}</h5>
                <div className="fs-ms fw-bold text-muted mb-3">
                    {ingredients}
                </div>
                <div className="d-flex align-items-center justify-content-around mt-auto">
                    <div className='d-flex align-items-center justify-content-center my-auto'>
                        <button className='btn border-0 text-success p-0 ms-2 fs-2' onClick={() => setOrderCount(orderCount + 1)} disabled={orderCount === 10}>
                            <CiCirclePlus/>
                        </button>
                        <p className='p-0 text-center my-auto'>
                            {orderCount}
                        </p>
                        <button className='btn border-0 p-0 me-2 fs-2' onClick={() => setOrderCount(orderCount - 1)} disabled={orderCount === 1}>
                            <CiCircleMinus className='text-warning'/>
                        </button>
                    </div>
                    <div className="btn btn-outline-success btn-sm w-60 my-auto fw-bold" role='button' onClick={addtoCart}>
                        <HiShoppingCart className='fs-5 ms-1'/>
                        افزودن به سبد خرید
                    </div>
                    <div className='btn' onClick={scrollToComments} role='button'>
                        <sup className='text-success'>{commentsCount}</sup>
                        <FaRegComments className='text-success fs-4'/>
                    </div>
                </div>
                <div id={`${orserSent ? 'hideMeAfter5Seconds' : ''}`} className={`${orserSent ? 'mt-1' : 'd-none mt-1'}`}>با موفقیت به سبد خرید اضافه شد</div>
            </div>
        </div>
    )
}

export default FastFoodItem