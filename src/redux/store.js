import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import productReducer from "./productSlice";
import filterReducer from "./filterSlice";
import cartReducer from "./cartSlice";

const persistConfig = { key: "cart", storage };

const store = configureStore({
  reducer: {
    products: productReducer,
    filters: filterReducer,
    cart: persistReducer(persistConfig, cartReducer),
  },
});

export const persistor = persistStore(store);
export default store;
