import {Component} from 'react';

class compNav extends Component{

    render(){
        return(
            <div className="NavBar">
            <ul className="navItems">
                <li className="navItem" >
                    <a>Insert a {this.props.name}</a>
                </li>
    
                <li className="navItem">
                    <a>Modify a {this.props.name}</a>
                </li>
    
                <li className="navItem">
                    <a>Recommend a {this.props.name}</a>
                </li>
    
                <li className="navItem">
                    <a>Delete a {this.props.name}</a>
                </li>
                <li className="navItem">
                    <span >{this.props.name}</span>
                </li>
            </ul>
        </div>
        );
    }
}
    


export default compNav;