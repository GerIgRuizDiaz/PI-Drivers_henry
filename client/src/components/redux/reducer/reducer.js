import {
  GET_BYNAME,
  GET_DRIVERS,
  FILTER_ORIGIN,
  ORDER_DRIVER,
  GET_TEAMS,
  FILTER_TEAM,
  GET_DETAIL,
  PAGINATE
} from "../actions/actiontypes";

const initialState = {
  allDrivers: [],
  allTeams: [],
  filtredDrivers: [],
  pageDrivers: [],
  detail: [],
  currentPage: 0
};

const reducer = (state = initialState, action) => {
  const ITEMS_PAGE = 9;
  switch (action.type) {

    case GET_DRIVERS:
      return {
        ...state,
        allDrivers: action.payload,
        filtredDrivers: [...action.payload].splice(0, ITEMS_PAGE),
        pageDrivers: action.payload,
      };


    case GET_BYNAME:
      return {
        ...state,
        filtredDrivers: action.payload
      };

    case GET_DETAIL:
      return {
        ...state,
        detail: action.payload
      };

    case ORDER_DRIVER:
      const order = action.payload;

      if (order === "A-Z") {


          const orderAZ = [...state.allDrivers].sort((a, b) => {
          const nameA = a.name.forename.toLowerCase()// || a.name.toLowerCase();
          const nameB = b.name.forename.toLowerCase() //|| b.name.toLowerCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });
        return { ...state, filtredDrivers: orderAZ.slice(0, ITEMS_PAGE) };

      } else if (order === "Z-A") {
        const orderZA = [...state.allDrivers].sort((a, b) => {
          const nameA = a.name.forename.toLowerCase() //|| a.name.toLowerCase();
          const nameB = b.name.forename.toLowerCase() //|| b.name.toLowerCase();
          return nameB.localeCompare(nameA, undefined, { sensitivity: 'base' });
        });
        return { ...state, filtredDrivers: orderZA.slice(0, ITEMS_PAGE)  };

      } else if (order === "dobA") {
        const orderDOBA = [...state.allDrivers].sort((a, b) => {
          const dateA = new Date(a.dob.split("-")) //|| a.birthDate.split("-")) ;
          const dateB = new Date(b.dob.split("-")) //|| b.birthDate.split("-"));
          return dateA - dateB;
        });
        return { ...state, filtredDrivers: orderDOBA.slice(0, ITEMS_PAGE)  };
      } else if (order === "dobD") {
        const orderDOBD = [...state.allDrivers].sort((a, b) => {
          const dateA = new Date(a.dob.split("-")) //|| a.birthDate.split("-"));
          const dateB = new Date(b.dob.split("-"))//|| b.birthDate.split("-"));
          return dateB - dateA;
        });
        return { ...state, filtredDrivers: orderDOBD.slice(0, ITEMS_PAGE)  };
      } else {
        return state;
      }


    case FILTER_ORIGIN:

      const createdDriver = state.allDrivers.filter((driver) => driver.created === true);
      return {
        ...state,
        filtredDrivers: createdDriver
        // pageVideoGames: createdGames
      };



    case FILTER_TEAM:
      return {
        ...state,
        allDrivers: action.payload // Actualiza la lista de conductores con los conductores filtrados
      };
      case FILTER_TEAM:
            const filteredDriver = state.allDrivers.filter((team) => {
                return team.teams.includes(action.payload);
            });
            return {
                ...state,
                pageDrivers: [...filteredDriver],
                filtredDrivers: filteredDriver.splice(0, ITEMS_PAGE),
            };


    case GET_TEAMS:
      return { ...state, allTeams: action.payload };


    case PAGINATE:
      const nextPage = state.currentPage + 1;
      const prevPage = state.currentPage - 1;
      const firstIndex = action.payload === "next" ? nextPage * ITEMS_PAGE : prevPage * ITEMS_PAGE;
      if (action.payload === 'next' && firstIndex >= state.pageDrivers.length) {
        return state;
      } else if (action.payload === "prev" && prevPage < 0) {
        return state;
      }
      const pagDriver = [...state.pageDrivers].slice(firstIndex, firstIndex + ITEMS_PAGE);
      return {
        ...state,
        filtredDrivers: pagDriver,
        currentPage: action.payload === "next" ? nextPage : prevPage,
      }

    default:
      return state;
  }
};

export default reducer;
