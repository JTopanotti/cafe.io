import Link from 'next/link';
import Router from 'next/router';

export default ({ currentUser, cart }) => {
    const userLinks = [
        !currentUser && { label: 'Sign Up', href: '/auth/signup' },
        !currentUser && { label: 'Sign In', href: '/auth/signin' },
        currentUser  && { label: 'Sign Out', href: '/auth/signout' },
    ]
    .filter(linkConfig => linkConfig)
    .map(({ label, href }) => {
        return <li key={href} className="nav-item">
            <Link href={href}>
                <a className='nav-link'>{label}</a>
            </Link>
        </li>
    });

    const links = [
        currentUser  && { label: 'Products', href: '/products' },
    ]
    .filter(linkConfig => linkConfig)
    .map(({ label, href }) => {
        return <li key={href} className="nav-item">
            <Link href={href}>
                <a className='nav-link'>{label}</a>
            </Link>
        </li>
    });

    const styles = {
        cart: {
            backgroundColor: "red",
            borderRadius: "5px",
            color: "white"
        },
        navbar: {
            margin: "0 10px 5px 10px"
        }
    }

    return (<nav style={styles.navbar} className='navbar navbar-light bg-light'>
        <Link href="/">
            <a className='navbar-brand'>Café.io</a>
        </Link>

        <div className='d-flex justify-content-start'>
            <ul className='nav d-flex align-items-center'>
                { links }
            </ul>
        </div>

        <div className='d-flex justify-content-end'>
            { currentUser && <button onClick={() => Router.push('/cart')} 
                                     className='btn btn-error' 
                                     style={styles.cart}>Carrinho: {cart.length}</button> }
            <ul className='nav d-flex align-items-center'>
                { userLinks }
            </ul>
        </div>
    </nav>)
};