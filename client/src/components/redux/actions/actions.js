import {
  GET_BYNAME,
  GET_DRIVERS,
  FILTER_ORIGIN,
  ORDER_DRIVER, GET_TEAMS, FILTER_TEAM,GET_DETAIL
} from "./actiontypes.js";
import axios from "axios";

export const getByName = (name) => {
  return async function (dispatch) {
    try {
      
      let json = await axios.get(`http://localhost:3001/drivers?name=${name}`);
      
      dispatch({
        type: GET_BYNAME,
        payload: json.data
      });
   
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const getAllDrivers = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get("http://localhost:3001/drivers");
      const driversArray = response.data;

      dispatch({
        type: GET_DRIVERS,
        payload: driversArray,
      });

      // console.log(driversArray); // Muestra la matriz de objetos
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const getDetail = (id) => {
  return async (dispatch) => {
      try {
          const { data } = await axios.get(`http://localhost:3001/drivers/${id}`);
          return dispatch({
              type: GET_DETAIL,
              payload: data,
          })
      } catch (error) {
          throw Error({ error: error.message });
      }
  }}


export const filterOrigin = (option) => {
  return function (dispatch) {
    try {
      dispatch({
        type: FILTER_ORIGIN,
        payload: option,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const orderDrivers = (option) => {
  return function (dispatch) {
    try {
      dispatch({
        type: ORDER_DRIVER,
        payload: option,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const addDriver = (driver)=>{

  driver.teams = driver.teams.split(",");
  driver.teams.pop();
  driver.teams = driver.teams.join(",")

  return async function (dispatch){
    await axios.post("http://localhost:3001/drivers/form", driver)
  }
}
export const getTeams = ()=>{
  return async function(dispatch){
    let teams = await axios.get("http://localhost:3001/teams")
   
    try {
      dispatch({
        type: GET_TEAMS,
        payload: teams,
      })

    } catch (error) {
      throw new Error(error.message)
    }
  }
}

export const filterByTeam = (option)=>{
return async function (dispatch){
  try {
    dispatch({
      type: FILTER_TEAM,
      payload: option,
    })
  } catch (error) {
    throw new Error(error.message)
  }
}
}