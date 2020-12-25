import { useState } from 'react';
import '../mediaLayout.css';
import DataOperationBooks from '../components/dataOperationsBooks';
import InsertBook from './insertBook';
function Books() {

    const [data, showData] = useState(true);

    const [showInsert, setShowInsert] = useState(false);

    const showBrowsePage = async () => {
        showData(true);
        setShowInsert(false);
    }

    const showInsertPage = () =>{
        showData(false);
        setShowInsert(true);
    }
    
    return (
        <div className="Container">
            <div className="Content">
                <div className="NavBar">

                    <ul className="navItems">
                        <li className="navItem" >
                            <a onClick={() => showInsertPage()}>Insert a book</a>
                        </li>

                        <li className="navItem">
                            <a onClick={() => showBrowsePage()} >Browse books</a>
                        </li>
                    </ul>
                    
                </div>
                {data && <DataOperationBooks name="comic"/>}
                {showInsert && <InsertBook/>}
            </div>
        </div>
    );
}

export default Books;