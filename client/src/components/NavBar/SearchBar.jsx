
import style from './SearchBar.module.css'
import React, { useState } from 'react';
import { getByName } from '../redux/actions/actions';
import { useDispatch } from 'react-redux';

const Search = () => {
  const dispatch = useDispatch()
  const [searchName, setSearchName] = useState('');
  const [errors, setErrors] = useState('');

  const inputChange = (e) => {
      setSearchName(e.target.value);
  }

  const searchHand = () => {
      dispatch(getByName(searchName))
          .catch((error) => {
              setErrors(error.message)
          });
      setSearchName('')
      setErrors('')
  };
  return (
      <div className={style.SearchBar}>
          {errors && <p>{errors}</p>}
          <input
              type='text'
              name="searchBar"
              value={searchName}
              onChange={inputChange}
              placeholder="Search Driver"/>
               <button  onClick={searchHand} > 
               Search
               </button>
         
      </div>
  )
};

export default Search;


