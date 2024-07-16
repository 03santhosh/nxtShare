import {Component} from 'react'
import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'

import './index.css'

class Header extends Component {
  state = {showNavBar: false}

  onClickHamburgerMenu = () => {
    this.setState(prevState => ({showNavBar: !prevState.showNavBar}))
  }

  onClickCloseIcon = () => {
    this.setState({showNavBar: false})
  }

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  onDisplayNavbars = () => (
    <div className="nav-li-container">
      <ul className="nav-ul">
        <Link className="links" to="/">
          <li className="nav-li">Home</li>
        </Link>
        <li className="nav-li">Search</li>
        <Link className="links" to="/my-profile">
          <li className="nav-li">Profile</li>
        </Link>
      </ul>
      <button className="logout-btn" type="button" onClick={this.onClickLogout}>
        Logout
      </button>
      <img
        onClick={this.onClickCloseIcon}
        className="nav-close-icon"
        src="https://res.cloudinary.com/dj3o1nlcs/image/upload/v1721024205/Light/Solid_dgk4mz.png"
      />
    </div>
  )

  render() {
    const {showNavBar} = this.state
    return (
      <>
        <nav className="nav-bar">
          <div className="nav-logo-container">
            <Link to="/" className="links">
              <img
                className="nav-logo"
                src="https://res.cloudinary.com/dj3o1nlcs/image/upload/v1720764656/Standard_Collection_8_dsnd19.svg"
                alt="webiste logo"
              />
            </Link>
            <h1 className="nav-heading">Insta Share</h1>
          </div>
          <img
            onClick={this.onClickHamburgerMenu}
            className="nav-menu-icon"
            src="https://res.cloudinary.com/dj3o1nlcs/image/upload/v1721022115/menu_m4gitt.svg"
          />
        </nav>
        {showNavBar && this.onDisplayNavbars()}
      </>
    )
  }
}

export default withRouter(Header)
