import {
  GET_BYNAME,
  GET_DRIVERS,
  FILTER_ORIGIN,
  ORDER_DRIVER,
  GET_TEAMS,
  FILTER_TEAM,
  GET_DETAIL
} from "../actions/actiontypes";

const initialState = {
  allDrivers: [],
  allTeams: [],
  filtredDrivers: [],
  detail: []
};

const reducer = (state = initialState, action) => {
  // const ITEMS_PAGE = 15;
  switch (action.type) {

    case GET_DRIVERS:
    return {
      ...state, 
      allDrivers: action.payload,
      filtredDrivers: [...action.payload],
      allTeams: action.payload,
    };


    case GET_BYNAME:
      return { ...state, 
        filtredDrivers: action.payload };

        case GET_DETAIL:
          return {
              ...state,
              detail: action.payload
          };
  
     

    case FILTER_ORIGIN:
      const origin = action.payload;
      const drivers = state.allDrivers;
      
      const filtered =
        origin === "database"
          ? drivers.filter((driver) => driver.createdinDB === true)
          : drivers.filter((driver) => driver.createdinDB === false);
      return {
        ...state,
        filtredDrivers: origin === "all" ? state.allDrivers : filtered,
      };

      
    case ORDER_DRIVER:
      const order = action.payload;
     const estado = state.filtredDrivers 
 
      console.log(estado);
console.log(order)
      if (order === "A-Z") {
       console.log(order);
       
        const orderAZ = [...estado].sort((a, b)  => { 

        console.log(orderAZ); 

          const nameA = a.name.forename.toLowerCase();
          const nameB = b.name.forename.toLowerCase();
          console.log(nameA);
           return nameA.localeCompare(nameB, undefined, { sensitivity: 'base' });
           
        });
        return { ...state, filtredDrivers: orderAZ };
      } else if (order === "Z-A") {
        const orderZA = [...state.allDrivers].sort((a, b) => {
          const nameA = a.name.forename.toLowerCase();
          const nameB = b.name.forename.toLowerCase();
          return nameB.localeCompare(nameA, undefined, { sensitivity: 'base' });
        });
        return { ...state, filtredDrivers: orderZA };
      
      } else if (order === "dobA") {
        const orderDOBA = [...state.allDrivers].sort((a, b) => {
          const dateA = new Date(a.dob.split("-")[2]);
          const dateB = new Date(b.dob.split("-")[2]);
          return dateA - dateB;
        });
        return { ...state, filtredDrivers: orderDOBA };
      } else if (order === "dobD") {
        const orderDOBD = [...state.allDrivers].sort((a, b) => {
          const dateA = new Date(a.dob.split("-")[2]);
          const dateB = new Date(b.dob.split("-")[2]);
          return dateB - dateA;
        });
        return { ...state, filtredDrivers: orderDOBD };
      } else {
        return state;
      }




      
    case FILTER_TEAM:
      state.filtredDrivers = [];
      const filtrados = state.allDrivers.filter((driver) => {
        if (driver.teams) {
          return driver.teams.indexOf(action.payload) !== -1;
        }
        return false;
      });
      return { ...state, filtredDrivers: filtrados };




    case GET_TEAMS:
      return { ...state, allTeams: action.payload };
    default:
      return state;
  }
};

export default reducer;
