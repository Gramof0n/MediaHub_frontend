import axios from 'axios';
import { useState, useRef, useEffect } from 'react';

import book from '../img/book.png';
function InsertBook() {

    const titleRef = useRef();
    const genreRef = useRef();
    const authorNameRef = useRef();
    const publisherRef = useRef();
    const descriptionRef = useRef();
    const ratingRef = useRef();

    const insertData = async () => {
        try {
            const response = await axios.post('http://studentdocker.informatika.uni-mb.si:32933/books/post', {
                title: titleRef.current.value,
                genre: genreRef.current.value,
                author: authorNameRef.current.value,
                publisher: publisherRef.current.value,
                description: descriptionRef.current.value,
                rating: ratingRef.current.value
            });
            
        alert("Inserted");
        } catch (error) {
            alert(error);
        }


    }

    return (
            <div className="itemContainerInsert">
                <form onSubmit={e => { e.preventDefault(); }}>
                    <div className="itemInsert">
                        <div className="firstSegmentInsert">
                            <p><h3>Title:</h3></p> <div><input type="text" ref={titleRef} /></div>
                            <p><h3>Genre:</h3></p> <div><input type="text" ref={genreRef} /></div>
                            <p><b className="author">Author:</b> <input type="text" ref={authorNameRef} /></p>                   
                        </div>

                        <div className="secondSegmentInsert">
                            <p><h3>Publisher:</h3></p> <div><input type="text" ref={publisherRef} /></div>
                            <p><h3>Description:</h3></p> <div><input type="text" ref={descriptionRef} /></div>
                            <p><h3>Rating:</h3></p> <div><input type="text" ref={ratingRef} readOnly="true" value="0"/></div>
                        </div>
                    </div>
                    <div class="buttonContainerInsert">
                        <input className="operations" onClick={() => insertData()} type="submit" value="INSERT" />
                    </div>
                </form>

                <div className="imageWrapper">
                    <img src={book} />
                </div>
            </div>
    );
}

export default InsertBook;