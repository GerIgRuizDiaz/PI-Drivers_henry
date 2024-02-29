
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import React from 'react';
import style from './NavBar.module.css'
import Search from './SearchBar';
import {
  getAllDrivers,
  getCreate,
  orderDrivers,
  getTeams,
  filterByTeam
} from '../redux/actions/actions'

const NavBar = () => {

  const dispatch = useDispatch();

  const teamsRedux = useSelector(state=> state.allTeams)

useEffect(()=>{
  dispatch(getTeams())

},[])



  const handleCreatedButton = () => {
    dispatch(getCreate());
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

  const handleTeamsFilter = (event) => {
   
    dispatch(filterByTeam(event.target.value)); // Despachamos la acción con la opción seleccionada
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
        <Search />
      </div>


      <div className={style.option}>
        <button value="AllDrivers" onClick={handleAllDrivers} className={style.filterButton}>
          All Drivers
        </button>
      </div>

      <div className={style.option} >
        <select name="teams" onChange={handleTeamsFilter} className={style.filter}>
          <option value="">Filter by Team</option>
          {teamsRedux.map((team) => (
            <option key={team.id} value={team.id}>{team.name}</option>
          ))}
        </select>
      </div>




      <div className={style.option}>
        <button value='created' onClick={handleCreatedButton} className={style.filterButton}>
          Created
        </button>
      </div>


      <div className={style.option}>
        <select name="alphabetical" placeholder="Alphabetical" onChange={handleABC} className={style.filter}>
          <option value=''>Filter by name</option>
          <option value='A-Z' >A-Z</option>
          <option value='Z-A'>Z-A </option>
          <option value='dobD'>dob-d</option>
          <option value='dobA' >dob-a</option>
        </select>
      </div>



    </header>
  );
};

export default NavBar;
