import { Fragment, useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./mealItem/MealItem";

const AvailableMeals = () => {
  const [mealsData, setMealsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://new-react-http-57475-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("Could not fetch data");
      }

      const data = await response.json();

      const loadedMeals = [];

      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }

      setMealsData(loadedMeals);
      setIsLoading(false);
    };

    fetchData().catch((error) => {
      console.log(error);
      setIsLoading(false);
      setError(error.message);
    });
  }, []);

  const meals = mealsData.map((meals) => {
    return (
      <MealItem
        id={meals.id}
        key={meals.id}
        name={meals.name}
        description={meals.description}
        price={meals.price}
      />
    );
  });

  return (
    <Fragment>
      <section className={classes.meals}>
        <Card>
          {!isLoading && <ul>{meals}</ul>}
          {!isLoading && error && (
            <p style={{ color: "red", textAlign: "center" }}>{error}</p>
          )}
          {isLoading && <p style={{ textAlign: "center" }}>Loading...</p>}
        </Card>
      </section>
    </Fragment>
  );
};

export default AvailableMeals;
