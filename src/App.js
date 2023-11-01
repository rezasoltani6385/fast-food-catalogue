import { useState, useEffect } from 'react';
import './App.css';
import CategoryList from './CategoryList/categoryList';
import Header from './Header/header';
import Loading from './Loading/loading';
import FastFoodList from './FastFoodList/fastFoodList';
import SearchBar from './SearchBar/searchBar';
import notFound from './assets/images/404.png'
import useAxios from './Hooks/useAxios';
import Comment from './comments/comment';
import { Provider } from 'react-redux';
import store from './Redux/store';
import Cart from './Cart/cart';

function App() {
  const [url, setUrl] = useState('/FastFood/list')
  const [comments, setComments] = useState([])
  const [loadingComments, setLoadingComments] = useState(false)
  const [lastElement, setLastElement] = useState(null)
  const [page, setPage] = useState(1)

  const [fastFoodItems, , loading] = useAxios({
    url
  })


  const fetchData = async () => {
    setLoadingComments(true)
    const response = await fetch(
      `https://react-mini-projects-api.classbon.com/Comments/${page}`
    )

    const data = await response.json()

    data.length === 0
      ? setLastElement(null)
      : setComments((oladData)=> [...oladData, ...data])
    setLoadingComments(false)
  }

  const observerRef = new IntersectionObserver(([entry])=>{
    if (entry.isIntersecting){
      setPage((currentPage)=> currentPage + 1)
    }
  })

  useEffect(()=>{
    fetchData()
  }, [page])

  useEffect(()=>{
    if (lastElement){
      observerRef.observe(lastElement)
    }

    return ()=> {
      if (lastElement){
        observerRef.unobserve(lastElement)
      }
    }
  }, [lastElement])






  const filterItems = (categoryId) => {
    setUrl(`/FastFood/list/${categoryId ? '?categoryId=' + categoryId : ''}`)
  }

  const searchItems = async (term) => {
    setUrl(`/FastFood/search/${term ? `?term=${term}` : ''}`)
  }

  const renderContent = () => {
    if (loading) {
      return <Loading theme='dark' />
    }

    if (fastFoodItems.length === 0) {
      return (
        <>
          <div className="alet alert-warning text-center">
            برای کلیدواژه فوق هیچ آیتمی یافت نشد
          </div>
          <img className='mx-auto mt-5 d-block fade-in-horiz' src={notFound}/>
        </>
      )
    }
    return <FastFoodList fastFoodItems={fastFoodItems} commentsCount={comments.length}/>
  }


  return (
    <Provider store={store}>
      <div className='wrapper bg-faded-dark'>
        <Header></Header>
        <CategoryList filterItems={filterItems}>
          <SearchBar searchItems={searchItems}/>
          <Cart/>
        </CategoryList>
        <div className='container mt-4'>
          {
            renderContent()
          }
        </div>
        <hr />
        <p id='comments' className={`${loadingComments ? 'd-none' : 'mx-5 my-0 p-0 fs-3'}`}>نظرات</p>
        <div className="row">
          <div className="col-12">
            {comments.map((comment) => (
              <div key={comment.id} ref={setLastElement}>
                <Comment {...comment}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
