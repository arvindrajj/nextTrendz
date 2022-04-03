/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect} from 'react'
import Loader from 'react-loader-spinner'
import {useSelector, useDispatch} from 'react-redux'
import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import {
  getProducts,
  changeActiveOptionId,
  changeActiveCategoryId,
  changeSearchInput,
  changeActiveRatingId,
} from '../../redux/actions/allProductsActions/index'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

const AllProductsSection = () => {
  const dispatch = useDispatch()
  const activeOptionId = useSelector(
    state => state.allProductsState.activeOptionId,
  )
  const activeCategoryId = useSelector(
    state => state.allProductsState.activeCategoryId,
  )
  const activeRatingId = useSelector(
    state => state.allProductsState.activeRatingId,
  )

  useEffect(() => {
    dispatch(getProducts())
  }, [activeCategoryId, activeRatingId, activeOptionId])

  const productsList = useSelector(state => state.allProductsState.productsList)
  const apiStatus = useSelector(state => state.allProductsState.apiStatus)
  const searchInput = useSelector(state => state.allProductsState.searchInput)
  const renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  const renderFailureView = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="all-products-error"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )

  const renderProductsListView = () => {
    const shouldShowProductsList = productsList.length > 0

    return shouldShowProductsList ? (
      <div className="all-products-container">
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={optionId => dispatch(changeActiveOptionId(optionId))}
        />
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-products-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
          className="no-products-img"
          alt="no products"
        />
        <h1 className="no-products-heading">No Products Found</h1>
        <p className="no-products-description">
          We could not find any products. Try other filters.
        </p>
      </div>
    )
  }

  const renderAllProducts = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderProductsListView()
      case apiStatusConstants.failure:
        return renderFailureView()
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      default:
        return null
    }
  }

  const clearFilters = () => {
    dispatch(changeActiveRatingId(''))
    dispatch(changeActiveCategoryId(''))
    dispatch(changeSearchInput(''))
  }
  return (
    <div className="all-products-section">
      <FiltersGroup
        searchInput={searchInput}
        categoryOptions={categoryOptions}
        ratingsList={ratingsList}
        changeSearchInput={input => dispatch(changeSearchInput(input))}
        enterSearchInput={() => dispatch(getProducts())}
        activeCategoryId={activeCategoryId}
        activeRatingId={activeRatingId}
        changeCategory={categoryId =>
          dispatch(changeActiveCategoryId(categoryId))
        }
        changeRating={ratingId => dispatch(changeActiveRatingId(ratingId))}
        clearFilters={clearFilters}
      />
      {renderAllProducts()}
    </div>
  )
}

export default AllProductsSection
