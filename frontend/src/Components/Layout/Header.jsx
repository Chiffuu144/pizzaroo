import { useState } from 'react'
import '../../App.css'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { getUser, logout } from '../Utils/helpers';
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../actions/userActions'

import Search from './Search'
export const Header = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth)
    const { cartItems } = useSelector(state => state.cart)
    const [failedAvatarUrl, setFailedAvatarUrl] = useState(null)
    const avatarUrl = user?.avatar?.url
    const avatarFailed = failedAvatarUrl === avatarUrl
    const initials = user?.name?.trim().split(/\s+/).map(part => part[0]).join('').slice(0, 2).toUpperCase()

    // const logoutHandler = () => {
    //     logout(navigate('/'));

    //     toast.success('log out', {
    //         position: 'bottom-right'
    //     });
    // }

    const logoutHandler = () => {
        dispatch(logout());
        toast.success('log out', {
            position: 'bottom-right'
        });
    }
    // useEffect(() => {
    //     setUser(getUser())
    // }, []);
    return (
        <>
            <nav className="navbar header-navbar">
                <div className="header-brand">
                    <Link to="/" className="pizzaro-brand-link" aria-label="Pizzaro home">
                        <svg className="pizzaro-brand-icon" viewBox="0 0 32 32" aria-hidden="true">
                            <path d="M4.8 5.6c8.7-2.1 17.3.8 23 7.1L17.5 27.2c-.5.7-1.5.7-2 0L4.2 7.4c-.5-.7-.2-1.6.6-1.8Z" fill="currentColor" />
                            <path d="M7.2 8.2c6.5-1.2 13 .9 17.6 5.4" fill="none" stroke="#fff7ee" strokeLinecap="round" strokeWidth="1.4" />
                            <circle cx="12" cy="12" r="1.5" fill="#fff7ee" />
                            <circle cx="19.5" cy="15" r="1.5" fill="#fff7ee" />
                            <circle cx="16" cy="21" r="1.5" fill="#fff7ee" />
                        </svg>
                        <span className="pizzaro-wordmark">Pizzaro</span>
                    </Link>
                </div>

                <div className="header-search">
                    <Search />
                </div>

                <div className="header-actions">
                    {user ? (
                        <div className="header-user-menu dropdown">
                            <Link to="#!" className="header-user-link dropdown-toggle text-white" type="button" id="dropDownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <figure className="avatar avatar-nav">
                                    {avatarUrl && !avatarFailed ? (
                                        <img
                                            src={avatarUrl}
                                            alt=""
                                            className="rounded-circle"
                                            onError={() => setFailedAvatarUrl(avatarUrl)}
                                        />
                                    ) : (
                                        <span className="avatar-fallback" aria-hidden="true">{initials}</span>
                                    )}
                                </figure>
                                <span className="header-user-name" title={user.name}>{user.name}</span>
                            </Link>

                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropDownMenuButton">
                                {user.role === 'admin' && (
                                <Link className="dropdown-item" to="/dashboard">Dashboard</Link>
                                )}
                                <Link className="dropdown-item" to="/orders/me">Orders</Link>
                                <Link className="dropdown-item" to="/me">Profile</Link>

                                <Link
                                    className="dropdown-item text-danger" to="/"
                                    onClick={logoutHandler}
                                >
                                    Logout
                                </Link>
                            </div>
                        </div>
                    ) : <Link to="/login" className="btn" id="login_btn">Login</Link>}

                    <Link to="/cart" className="header-cart-link" aria-label="Open shopping cart">
                        <i className="fa fa-shopping-bag header-cart-icon" aria-hidden="true" />
                        <span id="cart">Cart</span>
                        {cartItems?.length > 0 && <span id="cart_count">{cartItems.length}</span>}
                    </Link>
                </div>

            </nav>
        </>
    )
}
