import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import React from 'react';
import style from './NavBar.module.css'
import Search from './SearchBar';
import {
  getAllDrivers,
  filterOrigin,
  orderDrivers,
  addDriver,
  getTeams,
  filterByTeam
} from '../redux/actions/actions'

const NavBar = () => {
  const teams = useSelector((state) => state.allTeams);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTeams())
  }, []);

  const handleFilter = (event) => {
    dispatch(filterByTeam(event.target.value));
  };

  const handleCreatedButton = () => {
    dispatch(addDriver());
  };

  const handleAllDrivers = () => {
    dispatch(getAllDrivers());
  };

  const handleABC = (event) => {
    const option = event.target.value;
    dispatch(orderDrivers(option)); // Despachamos la acción con la opción seleccionada
  };

  const handleHomeButton = () => {
    if (location.pathname === "/home") {
      window.location.reload();
    }
  };


  return (
    <header className={style.header}>
      <div className={style.links}>
        <Link to="/">
          <button className={style.button}>Landing </button>
        </Link>
        <Link to="/home" >
          <button className={style.button} onClick={handleHomeButton}> Home</button>
        </Link>
        <br />
        <Link to="/form">
          <button className={style.button}>Create New Game</button>
        </Link>
      </div>

      <div>
        <Search/>
      </div>
     

      <div className={style.option}>
        <button value="AllDrivers" onClick={handleAllDrivers} className={style.filterButton}>
          All Drivers
        </button>
      </div>

      <div className={style.option}>
        <button value='created' onClick={handleCreatedButton} className={style.filterButton}>
          Created
        </button>
      </div>


      <div className={style.option}>
        <select name="alphabetical" placeholder="Alphabetical" onChange={handleABC} className={style.filter}>
          <option value=''>Filter by name</option>
          <option value='Z-A'>Z-A </option>
          <option value='A-Z' >A-Z</option>
          <option value='descendente'>dob-d</option>
          <option value='ascendente' >dob-a</option>
        </select>
      </div>

      {/* 
      <div className={style.option}>
        <span>Select Team:</span>
        <br />
        <select name="Genres" placeholder="Gender" onChange={handleFilter} className={style.filter} size={5}>
          {teams.map((teams) => (
            <option
              key={teams.id}
              value={teams.name}>
              {teams.name}
            </option>
          ))}
        </select>
      </div> */}


    </header>
  );
};

export default NavBar;
