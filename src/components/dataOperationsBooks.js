import {useState, useRef, useEffect} from 'react';
import axios from 'axios';


function DataOperationBooks(){

    //API URI
    const apiUrl = "http://studentdocker.informatika.uni-mb.si:32933/books";

    const [showAll, setShowAll] = useState(false);
    const [books, setBooks] = useState(null);
    const [showEdit, setShowEdit] = useState(false);

    //SHOW ON LOAD
    useEffect(() => {
        all();
    }, []);


    //SHOW ALL BOOKS
    const all = async () => {
        setShowEdit(false);

        const response = await axios.get(apiUrl);
        setBooks(response.data);
        setShowAll(true);
    }
    
    //SEARCH BY GENRE
    const genreInput = useRef(null);

    const searchByGenre = async () => {
        var input = genreInput.current.value;
        var urlEncoded = input.replaceAll(' ', '%20');
        const response = await axios.get(apiUrl + '/genre/' + urlEncoded);



        setBooks(response.data);

        if (books != null) {
            setShowAll(true);

            genreInput.current.value = "";
        } else {
            alert("No such genre");

            genreInput.current.value = "";
        }

    }

        //SEARCH BY AUTHOR
        const authorInput = useRef(null);

        const searchByAuthor = async () => {
            var input = authorInput.current.value;
            var urlEncoded = input.replaceAll(' ', '%20');
            const response = await axios.get(apiUrl + '/author/' + urlEncoded);
    
    
    
            setBooks(response.data);
    
            if (books != null) {
                setShowAll(true);
    
                authorInput.current.value = "";
            } else {
                alert("No such author");
    
                authorInput.current.value = "";
            }
    
        }

    //SEARCH BY TITLE
    const titleInput = useRef(null);

    const searchByTitle = async () => {

        var input = titleInput.current.value;
        var urlEncoded = input.replaceAll(' ', '%20');
        const response = await axios.get(apiUrl + '/title/' + urlEncoded);

        setBooks(response.data);
        if (books != null) {
            setShowAll(true);

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
    const authorRef = useRef();
    const publisherRef = useRef();
    const descriptionRef = useRef();
    const ratingRef = useRef();
    const editParameters = async () => {

        const response = await axios.put(apiUrl + '/put/' + idForEdit.current.value, {
            title: titleRef.current.value,
            genre: genreRef.current.value,
            author: authorRef.current.value,
            publisher: publisherRef.current.value,
            description: descriptionRef.current.value,
            rating: ratingRef.current.value,
        });
        if (response.data != null) {
            all();
        }
    }

    
    return(
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
                    <h3>Insert author</h3>
                    <input type="text" className="inputGenre" placeholder="Eg. Stephen King, Dan Brown etc." ref={authorInput}></input>
                    <button className="submit" onClick={() => searchByAuthor()}>Search</button>
                </div>

                <div className="stuff">
                    <h3>Insert title</h3>
                    <input type="text" className="inputGenre" placeholder="Book title goes here" ref={titleInput}></input>
                    <button className="submit" onClick={() => searchByTitle()}>Search</button>
                </div>

                <div className="stuff">
                    <h3>Show all books</h3>
                    <button className="submit" onClick={() => all()}>Show</button>
                </div>
            </div>


            <div className="tableContainer">
                {showAll &&
                    <table class="comicsTable">
                        <th>Number</th>
                        <th>Title</th>
                        <th>Genre</th>
                        <th>Author</th>
                        <th>Publisher</th>
                        <th>Description</th>
                        <th>Rating</th>
                        <th></th>


                        {showAll && books.map((book, index) => {
                            //SHOW ALL COMICS

                            //DELETE BY ID
                            const deleteByID = async () => {
                                const response = await axios.delete(apiUrl + '/delete/' + book._id);
                                all();
                            }

                            //EDIT BY ID
                            const edit = async () => {
                                setShowAll(false);
                                const response = await axios.get(apiUrl + '/id/' + book._id);
                                setBooks(response.data);

                                setShowEdit(true);
                            }

                            return (

                                <tr className="item" key={book._id}>
                                    <input value={book._id} hidden="false" readOnly={true}></input>
                                    <td>{index + 1}</td>
                                    <td> {book.title}</td>
                                    <td> {book.genre}</td>
                                    <td>{book.author}</td>
                                    <td>{book.publisher}</td>
                                    <td> {book.description}</td>
                                    <td> {book.rating}</td>
                                    <td class="buttonContainer">
                                        <a className="operations" onClick={() => deleteByID()}>DELETE</a>
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
                        <h1>Edit a book</h1>
                        <div className="itemEdit">
                            <div className="firstSegment">
                                <input hidden="false" value={books._id} readOnly={true} ref={idForEdit}></input>
                                <p><h3>Title:</h3> <input type="text" defaultValue={books.title} ref={titleRef} className="inputGenre" /></p>
                                <p><h3>Genre:</h3> <input type="text" defaultValue={books.genre} ref={genreRef} className="inputGenre" /></p>
                                <p><h3>Author:</h3> <input type="text" defaultValue={books.author} ref={authorRef} className="inputGenre" /></p>
                            </div>
                            <div className="secondSegment">
                                <p><h3>Publisher:</h3> <input type="text" defaultValue={books.publisher} ref={publisherRef} className="inputGenre" /></p>
                                <p><h3>Description:</h3> <input type="text" defaultValue={books.description} ref={descriptionRef} className="inputGenre" /></p>
                                <p><h3>Rating:</h3> <input type="text" defaultValue={books.rating} ref={ratingRef} className="inputGenre" /></p>
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

export default DataOperationBooks;