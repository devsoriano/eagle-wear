import { createContext, useEffect, useState } from "react";

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  useEffect(() => {
    const getCategories = async () => {
      const resCategories = await fetch(
        `${process.env.REACT_APP_FAKE_STORE_APP}/categories`
      );
      const dataCategories = await resCategories.json();

      const productsByCategories = {};
      for (let i = 0; i < dataCategories.length; i++) {
        const resProducts = await fetch(
          `${process.env.REACT_APP_FAKE_STORE_APP}/category/${dataCategories[i]}`
        );
        const dataProducts = await resProducts.json();
        productsByCategories[dataCategories[i]] = dataProducts;
      }
      setCategoriesMap(productsByCategories);
    };

    getCategories();
  }, []);

  const value = { categoriesMap };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
