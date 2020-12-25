import { useState } from 'react';
import '../mediaLayout.css';
import DataOperations from './dataOperations';
import InserComic from './insertComic';


function Comics() {

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
                            <a onClick={() => showInsertPage()}>Insert a comic</a>
                        </li>

                        <li className="navItem">
                            <a onClick={() => showBrowsePage()} >Browse comics</a>
                        </li>
                    </ul>
                    
                </div>
                {data && <DataOperations name="comic"/>}
                {showInsert && <InserComic/>}
            </div>
        </div>
    );

}

export default Comics;