import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import './index.css'

class Carousel extends Component {
  state = {
    carouselList: [],
    isLoading: false,
  }

  componentDidMount() {
    this.getCarousel()
  }

  getCarousel = async () => {
    this.setState({
      isLoading: true,
    })
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const updatedData = data.offers.map(eachItem => ({
      id: eachItem.id,
      imageUrl: eachItem.image_url,
    }))
    // console.log(updatedData)
    this.setState({
      carouselList: updatedData,
      isLoading: false,
    })
  }

  renderCarouselList = () => {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
    }
    const {carouselList} = this.state
    console.log(carouselList)
    return (
      <ul className="bg-container">
        <Slider {...settings} className="slider-offer">
          {carouselList.map(eachImage => (
            <li key={eachImage.id}>
              <img src={eachImage.imageUrl} alt="offer" className="image" />
            </li>
          ))}
        </Slider>
      </ul>
    )
  }

  renderLoader = () => (
    <div data-testid="restaurants-offers-loader" className="carousel-loader">
      <Loader type="TailSpin" color="#F7931E" height={50} width={50} />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return isLoading ? this.renderLoader() : this.renderCarouselList()
  }
}

export default Carousel
