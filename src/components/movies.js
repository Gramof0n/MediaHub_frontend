import { Component } from 'react';
import '../mediaLayout.css';
import Navigation from './compNav'

class Comics extends Component {

    render() {
        return (
            <div className="Container">
                <div className="Content">
                    <Navigation name="movie"/>
                </div>
            </div>
        );
    }
}

export default Comics;