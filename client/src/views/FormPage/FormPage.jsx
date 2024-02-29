import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, connect, useSelector } from "react-redux";
import NavBar from "../../components/NavBar/NavBar";
import { getTeams } from "../../components/redux/actions/actions";
import styles from "./FormPage.module.css";
import { useNavigate } from "react-router-dom";
import validations from './validations'

const Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTeams());
  }, []);

  const teams = useSelector((state) => state.allTeams);

  const [driver, setDriver] = useState({
    forename: "",
    surname: "",
    dob: "",
    nationality: "",
    description: "",
    teams: "",
    image: "",
    createdinDB: true,
  });

  const [error, setErrors] = useState({
    forename: null,
    surname: null,
    dob: null,
    nationality: null,
    description: null,
    teams: null,
    image: null,
  });

  const [formValid, setFormValid] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDriver({ ...driver, [name]: value });
    setErrors(validations({ ...driver, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validations(driver);
    setErrors(validation);
    const hasErrors = Object.values(validation).some((error) => !!error);
    if (!hasErrors) {
      if (!hasErrors) {
        
        axios.post('http://localhost:3001/drivers', driver)
            .then((response) => alert('Successfully created'))
            .catch((error) => alert("Error creating driver"));
    } 
      setDriver({
        forename: "",
        surname: "",
        dob: "",
        nationality: "",
        description: "",
        teams: "",
        image: "",
        createdinDB: true,
      });
      setFormValid(false);
      setSuccess(true);
    } else {
      console.log("Error en el formulario:", validation);
    }
  };

  useEffect(() => {
    const isValid = Object.values(error).every((val) => val === "");
    setFormValid(isValid);
  }, [error]);

  return (
    <div key="">
      <NavBar />
      <form key={"add-driver-form"} onSubmit={handleSubmit}>
        <div className={styles.formcontainer}>
          <div>
            <input
            className={styles.input}
              key={"driver-forename"}
              type="text"
              name="forename"
              value={driver.forename}
              onChange={handleChange}
              placeholder="Name"
            />
            {error.forename && <div className="error">{error.forename}</div>}
            <input
              className={styles.input}
              key={"driver-surname"}
              type="text"
              name="surname"
              value={driver.surname}
              onChange={handleChange}
              placeholder="Surname"
            />
            {error.surname && <div className="error">{error.surname}</div>}
            <input
              className={styles.input}
              key={"driver-dob"}
              type="date"
              name="dob"
              autoComplete="off"
              min="1900-01-01"
              max="2025-12-31"
              required
              value={driver.dob}
              onChange={handleChange}
              
            />
            {error.dob && <div className="error">{error.dob}</div>}
          </div>
          <div>
            <input
              className={styles.input}
              key={"driver-description"}
              type="text"
              name="description"
              value={driver.description}
              onChange={handleChange}
              placeholder="Description"
            />
            {error.description && (
              <div className="error">{error.description}</div>
            )}
            <input
              className={styles.input}
              key={"driver-nationality"}
              type="text"
              name="nationality"
              value={driver.nationality}
              onChange={handleChange}
              placeholder="Nationality"
            />
            {error.nationality && (
              <div className="error">{error.nationality}</div>
            )}
            <input
              className={styles.input}
              key={"driver-img"}
              type="text"
              name="image"
              value={driver.image}
              onChange={handleChange}
              placeholder="URL image"
            />
            {error.image && <div className="error">{error.image}</div>}

            <input
              className={styles.input}
              key={"driver-teams"}
              type="text"
              name="teams"
              value={driver.teams}
              onChange={handleChange}
              placeholder="Add Teams"
            />
            {error.teams && <div className="error">{error.teams}</div>}
          </div>
        
          

          <div>
            <button
            className={styles.inputButton}  
            type="submit" disabled={!formValid}>
              Add driver
            </button>
          </div>
        </div>
      
      </form>
      {success && (
        <div className={styles.modalContainer}>
          <dialog open={success} className={styles.successBtn}>
            <p>Driver created</p>
            <button onClick={() => navigate("/home")}>Return to home</button>
          </dialog>
        </div>
      )}
    </div>
  );
};


export default Form;




