import { useSelector} from 'react-redux'

import Card from '../Card/DriverCard';
import styles from "./Cards.module.css";

//* componente que crea las cartas
const Cards = () => {
    const drivers = useSelector((state) => state.filtredDrivers);

    return (
        <div className={styles.boxCards}>
            {
                drivers.map((drivers) => {
                    console.log(drivers);
                    return <Card
                        key={drivers.id}
                        image={drivers.image.url}
                        id={drivers.id}
                        name={drivers.name}
                        description={drivers.description}
                        nationality={drivers.nationality}
                        teams={drivers.teams}
                        birthDate={drivers.dob}
                        number={drivers.number}
                    />
                        
                
                })
            }
        </div >

    );
}

export default Cards;

