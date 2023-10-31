import './fastFoodItem.css'
import {HiShoppingCart} from 'react-icons/hi'
import {FaRegComments} from 'react-icons/fa6'
import { useDispatch } from 'react-redux'
import { addToCartAction } from '../Redux/action'

const FastFoodItem = ({name, price, ingredients, imageUrl, delay, count}) => {
    const dispatch = useDispatch()


    function scrollToComments() {
        const commentsElement = document.getElementById("comments");
        if (commentsElement) {
          commentsElement.scrollIntoView({ behavior: "smooth" });
        }
    }


    return (
        <div className="card product-card h-100 border-0 shadow-sm pb-1 fade-in-horiz"
            style={{animationDelay: `${delay}s`}}
        >
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
                <div className="flex">
                    <div className="btn btn-outline-success btn-sm w-60 mt-auto fw-bold" role='button' onClick={()=> dispatch(addToCartAction({name: name, price: price, count: 1}))}>
                        <HiShoppingCart className='fs-5 ms-3'/>
                        افزودن به سبد خرید
                    </div>
                    <div className='btn' onClick={scrollToComments} role='button'>
                        <sup className='text-success'>{count}</sup>
                        <FaRegComments className='text-success fs-4'/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FastFoodItem