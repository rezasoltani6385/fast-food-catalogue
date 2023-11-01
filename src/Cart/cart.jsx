import React, { useEffect, useState } from 'react'
import {AiOutlineShoppingCart, AiFillDelete} from 'react-icons/ai'
import {CiCirclePlus} from 'react-icons/ci'
import {CiCircleMinus} from 'react-icons/ci'
import {FcOk, FcCancel} from 'react-icons/fc'

import { useDispatch, useSelector } from 'react-redux'
import { decreaseCount, increaseCount, removeFromCart } from '../Redux/action'

const Cart = () => {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false)
    const [invoice, setInvoice] = useState(0)
    const [deleteItem, setDeleteItem] = useState('')
    const cartItems = useSelector((state)=> state.cart)
    const cartCount = Object.keys(cartItems).length

    const openModal = () => {
        setShow(true);
        setDeleteItem('')
        document.body.classList.add('position-fixed');
    };

    const closeModal = () => {
        setShow(false);
        document.body.classList.remove('position-fixed');
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
          closeModal();
        }
    };

    const totalPrice = ()=>{
        let totalInvoice = 0;

        Object.keys(cartItems).forEach(key => {
        const item = cartItems[key];
        const price = item.price;
        const count = item.count;
        totalInvoice += price * count;
        });

        setInvoice(totalInvoice);
    }

    const tableItems = ()=> {
        return(
            <>
                {cartCount ?
                    <table className='table table-borderless'>
                        <tr className='text-center border-bottom'>
                            <th>عنوان</th>
                            <th>قیمت (تومان)</th>
                            <th>تعداد</th>
                            <th>حذف</th>
                        </tr>
                        {Object.keys(cartItems).map((key) => (
                            <>
                                <tr key={key}>
                                    <td>{key}</td>
                                    <td className='text-center'>{cartItems[key].price.toLocaleString()}</td>
                                    <td className='d-flex align-items-center justify-content-center'>
                                        <button className='btn border-0' onClick={() => dispatch(increaseCount({name: key}))} disabled={cartItems[key].count === 10}>
                                            <CiCirclePlus className='text-success fs-4'/>
                                        </button>
                                        <p className='p-0 text-center my-auto'>
                                            {cartItems[key].count}
                                        </p>
                                        <button className='btn border-0' onClick={() => dispatch(decreaseCount({name: key}))} disabled={cartItems[key].count === 1}>
                                            <CiCircleMinus className='text-warning fs-4'/>
                                        </button>
                                    </td>
                                    <td>
                                        <div className='text-danger fs-5' role='button' onClick={()=> setDeleteItem(key)}>
                                            <AiFillDelete/>
                                        </div>
                                    </td>
                                </tr>
                                <tr className={`${deleteItem === key ? '' : 'd-none'}`}>
                                    <td colspan="2" id={key}>
                                        <p className='p-0 my-auto'>آیا از حذف این آیتم اطمینان دارید؟</p>
                                    </td>
                                    <td colspan="2">
                                        <div className='d-flex align-items-center justify-content-around fs-4'>
                                            <FcOk role='button' onClick={()=> dispatch(removeFromCart({name: key}))}/>
                                            <FcCancel role='button' onClick={()=> setDeleteItem('')}/>
                                        </div>
                                    </td>
                                </tr>
                            </>
                        ))}
                        <tr className='text-center'>
                            <td>جمع کل:</td>
                            <td>{invoice.toLocaleString()} تومان</td>
                        </tr>
                    </table>
                : <p>هیچ آیتمی در سبد خرید وجود ندارد</p>
                }
            </>
        )
    }

    useEffect(()=> {
        tableItems()
        totalPrice()
    }, [cartItems])


  return (
    <div>
        <button className='btn btn-borderless' onClick={openModal} disabled={cartCount === 0}>
            <sup className={`${cartCount !==0 ? 'text-warning' : 'text-muted'} fs-6`}>{cartCount}</sup>
            <AiOutlineShoppingCart className={`${cartCount !==0 ? 'text-success' : 'text-muted'} fs-2`}/>
        </button>
        {show &&
            <div className="modal modal-backdrop" style={{ display: "block"}} onClick={handleBackdropClick}>
                <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">جزئیات سبد خرید</h5>
                        </div>
                        <div className="modal-body">
                           {tableItems()}
                        </div>
                        <div className="modal-footer">
                            <button className='btn btn-warning' onClick={closeModal}>بستن</button>
                        </div>

                    </div>
                </div>
            </div>
        }
    </div>
  )
}

export default Cart
