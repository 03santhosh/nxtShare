import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

const settings = {
  dots: false,
  infinite: false,
  slidesToShow: 8,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1300,
      settings: {
        slidesToShow: 8,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 7,
      },
    },
    {
      breakpoint: 1100,
      settings: {
        slidesToShow: 6,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 512,
      settings: {
        slidesToShow: 3,
      },
    },
  ],
}

class UserStory extends Component {
  state = {userStoryList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getUserStory()
  }

  getUserStory = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      // console.log(fetchedData)
      const updatedData = fetchedData.users_stories.map(eachStory => ({
        userId: eachStory.user_id,
        userName: eachStory.user_name,
        storyUrl: eachStory.story_url,
      }))
      // console.log(updatedData)
      this.setState({
        userStoryList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else if (response.status === 401) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSlider = () => {
    const {userStoryList} = this.state
    return (
      <div className="slider-container">
        <Slider {...settings}>
          {userStoryList.map(each => {
            const {userId, storyUrl, userName} = each
            return (
              <div className="slick-item" key={userId}>
                <img className="logo-image" src={storyUrl} alt={userName} />
                <p className="user-story-name">{userName}</p>
              </div>
            )
          })}
        </Slider>
      </div>
    )
  }

  renderSuccessView = () => (
    <div className="main-container">{this.renderSlider()}</div>
  )

  renderLoadingView = () => (
    <>
      <div className="loader-container" data-testid="loader">
        <Loader type="TailSpin" color="#4094EF" height={32} width={32} />
      </div>
    </>
  )

  renderFailureView = () => (
    <>
      <h1 className="story-failure-view">Failure View</h1>
      <button type="button" className="retry-btn">
        Retry
      </button>
    </>
  )

  renderStoryView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <div className="user-story-container">{this.renderStoryView()}</div>
  }
}

export default UserStory
