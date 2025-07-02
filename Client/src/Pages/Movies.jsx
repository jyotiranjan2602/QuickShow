import React from 'react'
import { dummyShowsData } from '../assets/assets'
import MovieCart from '../Components/MovieCart'
import BlurCircle from '../Components/BlurCircle'

const Movies = () => {

  return dummyShowsData.length > 0 ?  (
    <div className='relative my-40 mb-60 px-6 md:px-10 lg:px-30 xl:px-35 overflow-hidden min-h-[80vh]'>
        <h1 className='text-lg font-medium my-4'>Now Showing</h1>
       
        <BlurCircle top='50px' left='0px'/>
        <BlurCircle bottom='50px' right='50px'/>
          
        <div  className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {dummyShowsData.map((movie)=>(
            <MovieCart movie={movie}  key={movie._id} className='w-full sm:w-[48%] md:w-[23%]'/>
          ))}
        </div>
    </div>
  )
  :
  <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-3xl font-bold text-center'>No movies are avaliable</h1>
  </div>
}

export default Movies
