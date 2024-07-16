import {Component} from 'react'
import Cookies from 'js-cookie'

import Header from '../Header'

import './index.css'

class MyProfile extends Component {
  state = {myProfileData: []}

  componentDidMount() {
    this.getMyProfile()
  }

  getMyProfile = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/insta-share/my-profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()

      const formattedData = {
        followersCount: data.profile.followers_count,
        followingCount: data.profile.following_count,
        id: data.profile.id,
        posts: data.profile.posts,
        postsCount: data.profile.posts_count,
        profilePic: data.profile.profile_pic,
        stories: data.profile.stories,
        userBio: data.profile.user_bio,
        userId: data.profile.user_id,
        userName: data.profile.user_name,
      }
      console.log(formattedData.stories)

      /* const updatedMyProfileData = {
        id: fetchedData.profile.id,
        userId: fetchedData.profile.user_id,
        userName: fetchedData.profile.user_name,
        profilePic: fetchedData.profile.profile_pic,
        followersCount: fetchedData.profile.followers_count,
        followingCount: fetchedData.profile.following_count,
        userBio: fetchedData.profile.user_bio,
        posts: fetchedData.profile.posts.map(eachPosts => ({
          id: eachPosts.id,
          image: eachPosts.image,
        })),
        postsCount: fetchedData.profile.posts_count,
        stories: fetchedData.profile.stories.map(eachStory => ({
          id: eachStory.id,
          image: eachStory.image,
        })),
      }
      // console.log(updatedMyProfileData)
      this.setState({myProfileData: updatedMyProfileData}) */
      this.setState({myProfileData: formattedData})
    }
  }

  renderSuccessView = () => {
    const {myProfileData} = this.state
    const {
      userBio,
      userName,
      profilePic,
      followersCount,
      followingCount,
      postsCount,
      stories,
    } = myProfileData

    return (
      <div className="myprofile-container">
        <div className="myprofile-bio-container">
          <h1 className="myprofile-nickname">{userName}</h1>
          <div className="myprofile-img-container">
            <img className="myprofile-img" src={profilePic} />
            <div className="myprofile-count-container">
              <span className="myprofile-counting">{postsCount}</span>
              <span className="myprofile-counting-text">posts</span>
            </div>
            <div className="myprofile-count-container">
              <span className="myprofile-counting">{followersCount}</span>
              <span className="myprofile-counting-text">followers</span>
            </div>
            <div className="myprofile-count-container">
              <span className="myprofile-counting">{followingCount}</span>
              <span className="myprofile-counting-text">following</span>
            </div>
          </div>
          <h1 className="myprofile-username">{userName}</h1>
          <p className="myprofile-userbio">{userBio}</p>
          <div className="myprofile-story-container">
            <ul className="myprofile-story-ul">
              {stories.map(each => (
                <li key={each.id}>
                  <img src={each.image} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <>
        <Header />
        {this.renderSuccessView()}
      </>
    )
  }
}

export default MyProfile
