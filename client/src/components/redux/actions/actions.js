import {
  GET_BYNAME,
  GET_DRIVERS,
  FILTER_ORIGIN,
  ORDER_DRIVER, GET_TEAMS, FILTER_TEAM,GET_DETAIL,PAGINATE
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
          console.log(data);
          return dispatch({
              type: GET_DETAIL,
              payload: data,
          })
          
      } catch (error) {
          throw Error({ error: error.message });
      }
  }}


  export const getCreate = () => {
    return async (dispatch) => {
        try {
            return dispatch({
                type: FILTER_ORIGIN,
            });
        } catch (error) {
            alert(error.response.data.error);
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

export const getTeams = ()=>{
  return async (dispatch) => {
      try {
        const response = await axios.get(`http://localhost:3001/teams`);
      
        // Una vez que obtengas la respuesta del servidor, extraes los conductores de la respuesta
        const allteams = response.data;
          return dispatch({
              type: GET_TEAMS,
            payload: allteams
          });
      } catch (error) {
        throw new Error(error.message);
      }
  };
};

export const filterByTeam = (team) => {
  return async function (dispatch) {
    try {
      return dispatch({
        type: FILTER_TEAM,
        payload: team
    });
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const paginateDrivers = (order) => {
  return async (dispatch) => {
      try {
          return dispatch({
              type: PAGINATE,
              payload: order,
          });
      } catch (error) {
          alert(error.response.data.error);
      };
  };
};