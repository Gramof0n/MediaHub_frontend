import axios from 'axios';
import { useState, useRef, useEffect } from 'react';

import pow from '../img/comic.png';
function InsertComic() {

    const titleRef = useRef();
    const genreRef = useRef();
    const authorNameRef = useRef();
    const authorSurnameRef = useRef();
    const publisherRef = useRef();
    const dateRef = useRef();
    const noOfPagesRef = useRef();
    const issueRef = useRef();

    const [noOfAuthors, setNoOfAuthors] = useState([]);
    const [author, setAuthor] = useState([]);

    const submit = () => {
        author.push({
            name: authorNameRef.current.value,
            surname: authorSurnameRef.current.value
        });

    }

    const finalSubmit = () => {
        submit();
        insertData();
    }
    const addAuthor = () => {
        setNoOfAuthors([...noOfAuthors, {
            id: noOfAuthors.length,
            value: 1
        }]);

        if (authorNameRef.current.value == "" && authorSurnameRef.current.value == "") {
            submit();
        }
    }

    const insertData = async () => {
        const response = await axios.post('http://studentdocker.informatika.uni-mb.si:32832/comics/post', {
            title: titleRef.current.value,
            genre: genreRef.current.value,
            authors: author,
            publisher: publisherRef.current.value,
            date: dateRef.current.value,
            noOfPages: noOfPagesRef.current.value,
            issue: issueRef.current.value
        });


        alert("Inserted");
    }

    return (
            <div className="itemContainerInsert">
                <form onSubmit={e => { e.preventDefault(); }}>
                    <div className="itemInsert">
                        <div className="firstSegmentInsert">
                            <p><h3>Title:</h3></p> <div><input type="text" ref={titleRef} /></div>
                            <p><h3>Genre:</h3></p> <div><input type="text" ref={genreRef} /></div>
                            <p><b className="author">Author(s):</b> <a className="operations" onClick={() => addAuthor()}>+</a></p>

                            <p><b>Name:</b></p> <input type="text" ref={authorNameRef} /> <p><b>Surname:</b></p> <input type="text" ref={authorSurnameRef} />


                            {noOfAuthors.map(number => {
                                return (
                                    <div key={number.id}>
                                        <hr />
                                        <div>
                                            <p><b>Name:</b></p>
                                            <div><input type="text" ref={authorNameRef} /></div>
                                        </div>
                                        <div>
                                            <p><b>Surname:</b></p>
                                            <div> <input type="text" ref={authorSurnameRef} /></div>
                                        </div>
                                        <hr />
                                    </div>
                                );
                            })}

                        </div>

                        <div className="secondSegmentInsert">
                            <p><h3>Publisher:</h3></p> <div><input type="text" ref={publisherRef} /></div>
                            <p><h3>Date of publishing:</h3></p> <div><input type="text" ref={dateRef} /></div>
                            <br />
                            <p><h3>Number of pages:</h3></p> <div><input type="text" ref={noOfPagesRef} /></div>
                            <p><h3>Edition:</h3> </p> <div><input type="text" ref={issueRef} /></div>
                        </div>

                    </div>
                    <div class="buttonContainerInsert">
                        <input className="operations" onClick={() => finalSubmit()} type="submit" value="INSERT" />
                    </div>
                </form>

                <div className="imageWrapper">
                    <img src={pow} />
                </div>
            </div>
    );
}

export default InsertComic;