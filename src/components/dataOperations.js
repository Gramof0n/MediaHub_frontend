import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

function DataOperations(props) {

    const [showGenre, setShowGenre] = useState(false);
    const [showPublisher, setShowPublisher] = useState(false);
    const [showIssue, setShowIssue] = useState(false);
    const [showTitle, setShowTitle] = useState(true);
    const [showAll, setShowAll] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const [comics, setComics] = useState(null);
    const apiUrl = 'http://studentdocker.informatika.uni-mb.si:32832/comics';

    useEffect(() => {
        all();
    }, []);

    const all = async () => {
        setShowIssue(false);
        setShowGenre(false);
        setShowPublisher(false);
        setShowTitle(false);
        setShowEdit(false);

        const response = await axios.get(apiUrl);
        setComics(response.data);
        setShowAll(true);
    }



    //SEARCH BY GENRE
    const genreInput = useRef(null);

    const searchByGenre = async () => {
        var input = genreInput.current.value;
        var urlEncoded = input.replaceAll(' ', '%20');
        const response = await axios.get('http://studentdocker.informatika.uni-mb.si:32832/comics/genre/' + urlEncoded);



        setComics(response.data);

        if (comics != null) {
            setShowAll(true);
            setShowGenre(false);

            genreInput.current.value = "";
        } else {
            alert("No such genre");

            genreInput.current.value = "";
        }

    }

    //SEARCH BY PUBLISHER
    const publisherInput = useRef(null);

    const searchByPublisher = async () => {
        var input = publisherInput.current.value;
        var urlEncoded = input.replaceAll(' ', '%20');
        const response = await axios.get('http://studentdocker.informatika.uni-mb.si:32832/comics/publisher/' + urlEncoded);

        setComics(response.data);
        if (comics != null) {
            setShowAll(true);
            setShowPublisher(false);

            publisherInput.current.value = "";
        } else {
            alert("No such publisher");

            publisherInput.current.value = "";
        }

    }

    //SEARCH BY ISSUE
    const issueInput = useRef(null);

    const searchByIssue = async () => {
        var input = issueInput.current.value;

        const response = await axios.get('http://studentdocker.informatika.uni-mb.si:32832/comics/issue/' + input);

        setComics(response.data);
        if (comics != null) {
            setShowAll(true);
            setShowIssue(false);

            issueInput.current.value = "";
        } else {
            alert("No such issue");

            issueInput.current.value = "";
        }

    }

    //SEARCH BY TITLE
    const titleInput = useRef(null);

    const searchByTitle = async () => {

        var input = titleInput.current.value;
        var urlEncoded = input.replaceAll(' ', '%20');
        const response = await axios.get('http://studentdocker.informatika.uni-mb.si:32832/comics/title/' + urlEncoded);

        setComics(response.data);
        if (comics != null) {
            setShowAll(true);
            setShowTitle(false);

            titleInput.current.value = "";
        } else {
            alert("No such title");

            titleInput.current.value = "";
        }

    }

    //EDIT PARAMETERS
    const idForEdit = useRef();
    const titleRef = useRef();
    const genreRef = useRef();
    const authorNameRef = useRef();
    const authorSurnameRef = useRef();
    const publisherRef = useRef();
    const dateRef = useRef();
    const noOfPagesRef = useRef();
    const issueRef = useRef();
    const editParameters = async () => {

        const response = await axios.put('http://studentdocker.informatika.uni-mb.si:32832/comics/edit/' + idForEdit.current.value, {
            title: titleRef.current.value,
            genre: genreRef.current.value,
            authors: [
                {
                    name: authorNameRef.current.value,
                    surname: authorSurnameRef.current.value
                }
            ],
            publisher: publisherRef.current.value,
            date: dateRef.current.value,
            noOfPages: noOfPagesRef.current.value,
            issue: issueRef.current.value
        });
        if (response.data != null) {
            all();
        }
    }


    return (
        <div className="DataDisplay">

            <div className="doStuff">
                <div className="stuffContainer">
                    <h1>Search by criteria</h1>
                    <div className="stuff">
                        <h3>Insert genre</h3>
                        <input type="text" className="inputGenre" placeholder="Eg. mystery, horror, drama" ref={genreInput} ></input>
                        <button className="submit" onClick={() => searchByGenre()}>Search</button>
                    </div>

                    <div className="stuff">
                        <h3>Insert publisher</h3>
                        <input type="text" className="inputGenre" placeholder="Eg. Marvel, DC comics, Dark horse" ref={publisherInput}></input>
                        <button className="submit" onClick={() => searchByPublisher()}>Search</button>
                    </div>

                    <div className="stuff">
                        <h3>Insert edition</h3>
                        <input type="number" className="inputGenre" placeholder="Eg. 1, 2, 3" ref={issueInput}></input>
                        <button className="submit" onClick={() => searchByIssue()}>Search</button>
                    </div>

                    <div className="stuff">
                        <h3>Insert title</h3>
                        <input type="text" className="inputGenre" placeholder="Comic title goes here" ref={titleInput}></input>
                        <button className="submit" onClick={() => searchByTitle()}>Search</button>
                    </div>

                    <div className="stuff">
                        <h3>Show all comics</h3>
                        <button className="submit" onClick={() => all()}>Show</button>
                    </div>
                </div>


                <div className="tableContainer">
                    {showAll &&
                        <table class="comicsTable">
                            <th>Number</th>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Author(s)</th>
                            <th>Publisher</th>
                            <th>Date of publishing</th>
                            <th>Number of pages</th>
                            <th>Edition</th>
                            <th></th>


                            {showAll && comics.map((comic, index) => {
                                //SHOW ALL COMICS

                                //DELETE BY ID
                                const deleteByID = async () => {
                                    const response = await axios.delete('http://studentdocker.informatika.uni-mb.si:32832/comics/delete/' + comic._id);
                                    all();
                                }

                                //EDIT BY ID
                                const edit = async () => {
                                    setShowAll(false);
                                    const response = await axios.get('http://studentdocker.informatika.uni-mb.si:32832/comics/id/' + comic._id);
                                    setComics(response.data);

                                    setShowEdit(true);
                                }

                                return (

                                    <tr className="item" key={comic._id}>
                                        <input value={comic._id} hidden="false" readOnly={true}></input>
                                        <td>{index + 1}</td>
                                        <td> {comic.title}</td>
                                        <td> {comic.genre}</td>
                                        <td>{comic.authors.map((author) => {
                                            return (
                                                <span>{author.name} {author.surname}</span>
                                            );
                                        })}
                                        </td>
                                        <td>{comic.publisher}</td>
                                        <td> {comic.date}</td>
                                        <td> {comic.noOfPages}</td>
                                        <td> {comic.issue}</td>
                                        <td class="buttonContainer">
                                            <a onClick={() => deleteByID()} className="operations">DELETE</a>
                                            <a className="operations" onClick={() => edit()}>EDIT</a>
                                        </td>
                                    </tr>

                                )
                            })}
                        </table>

                    }

                    {showEdit &&
                        //EDIT A COMIC
                        <div className="itemContainer">
                            <h1>Edit a comic</h1>
                            <div className="itemEdit">
                                <div className="firstSegment">
                                    <input hidden="false" value={comics._id} readOnly={true} ref={idForEdit}></input>
                                    <p><h3>Title:</h3> <input type="text" defaultValue={comics.title} ref={titleRef} className="inputGenre" /></p>
                                    <p><h3>Genre:</h3> <input type="text" defaultValue={comics.genre} ref={genreRef} className="inputGenre" /></p>
                                    <h3>Author(s):</h3><div className="authorContainer"> {comics.authors.map((author) => {
                                        return (
                                            <div>

                                                <p><b>Name:</b> <input type="text" defaultValue={author.name} ref={authorNameRef} className="inputGenre" /></p>

                                                <p> <b>Surname:</b> <input type="text" defaultValue={author.surname} ref={authorSurnameRef} className="inputGenre" /></p>

                                            </div>
                                        );
                                    })}</div>
                                </div>
                                <div className="secondSegment">
                                    <p><h3>Publisher:</h3> <input type="text" defaultValue={comics.publisher} ref={publisherRef} className="inputGenre" /></p>
                                    <p><h3>Date of publishing:</h3> <input type="text" defaultValue={comics.date} ref={dateRef} className="inputGenre" /></p>
                                    <p><h3>Number of pages:</h3> <input type="text" defaultValue={comics.noOfPages} ref={noOfPagesRef} className="inputGenre" /></p>
                                    <p><h3>Edition:</h3> <input type="text" defaultValue={comics.issue} ref={issueRef} className="inputGenre" /></p>
                                </div>
                                <div class="buttonContainer">
                                    <a className="operations" onClick={() => all()}>BACK</a>
                                    <a className="operations" onClick={() => editParameters()}>EDIT</a>
                                </div>
                            </div>
                        </div>
                    }


                </div>
            </div>
        </div>
    );
}

export default DataOperations;