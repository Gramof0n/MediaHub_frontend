import { Link } from 'react-router-dom';

function mainScreen() {

    const linkStyle = {
        color: 'black',
        textDecoration: 'none'
    };

    return (
        <div className="nav">
            {/* <div className="logoContainer">
                <img src="https://testcreative.co.uk/wp-content/uploads/2018/08/logo.png" className="logo"></img>
            </div> */}

            <ul className="listLinks">
                <Link to="/comics" style={linkStyle}>
                    <li>COMICS</li>
                </Link>

                <Link to="/series" style={linkStyle}>
                    <li>SERIES</li>
                </Link>

                <Link to="/movies" style={linkStyle}>
                    <li>MOVIES</li>
                </Link>

                <Link to="/magazines" style={linkStyle}>
                    <li>MAGAZINES</li>
                </Link>

                <Link to="/books" style={linkStyle}>
                    <li>BOOKS</li>
                </Link>

                <Link to="/media" style={linkStyle}>
                    <li>ALL MEDIA</li>
                </Link>
            </ul>
        </div>
    );
}

export default mainScreen;