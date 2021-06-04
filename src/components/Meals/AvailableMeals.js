import { useEffect, useState } from "react";

import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      const resp = await fetch(
        "https://react-http-1cb30-default-rtdb.firebaseio.com/meals.json"
      );
      console.log(resp);
      if (!resp.ok) {
        throw new Error("Something Went Wrong!");
      }

      const respData = await resp.json();
      console.log(respData);

      const loadedMeals = [];

      for (const key in respData) {
        loadedMeals.push({
          id: key,
          name: respData[key].name,
          description: respData[key].description,
          price: respData[key].price,
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    };
//here using the await syntax we had to give await to fetch to for which we then have to address useEffect function as async so we use this instead 
    fetchMeals().catch(err=>{
      setIsLoading(false)
      setHttpError(err.message)
    })
  }, []);
//we can add conditional at the JSX or here
  if(httpError){
    return <section className={classes.MealsError}>
      <p>{httpError}</p>
    </section>
  }
  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <div className={classes.loading}>{isLoading && <p>Loading...</p>}</div>
        <ul>{!isLoading && mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
