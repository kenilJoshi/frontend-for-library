import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";
import BookCard from './BookCard';
import Pagination from '@mui/material/Pagination';

function Home() {
  const [books, setBooks] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [offset, setoffset] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  const gradientStyle = {
    background: "#FFFFFF",
    background: "linear-gradient(270deg, #FFFFFF, #B08ED6)"
    // Add other styles as needed
  };

  const bookList = async () => {
    let bookList = await axios.get(`http://localhost:3000/api/v1/books?offset=${offset*10}`)
    if (bookList.data.length !== 0) {
      let pages = Math.round((bookList.data.totalCount+1)/10)
      console.log(bookList.data);
      setBooks(bookList.data)
      // setPaginationLength(bookList.data.totalCount+1)
      setTotalPages(pages)
      console.log(pages);
    } else {
      setBooks([])
    }
  }

  useEffect(() => {
 
      bookList()

  }, [currentPage])

  const handlePageChange  = (event,page) => {
    console.log(page);
    setCurrentPage(page)
    setoffset(page-1)
  }


  return (
    <div>


      <div className='py-20 px-32'>
        <h1 className='text-4xl font-bold text-stone-800 underline'>
          Books
        </h1>
        <div className='flex gap-7 py-14 flex-wrap pl-14'>
          {
            books.length !== 0
              ?
              books.data.map((book) => (
                
                  <BookCard book={book} key={book.id} />
                
              ))
              :
              <h1 className='text-center py-20'>Shop is Empty</h1>
          }
        </div>
        {totalPages > 1 && (
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color='primary'
          />
        )}
      </div>

    </div>
  )
}

export default Home