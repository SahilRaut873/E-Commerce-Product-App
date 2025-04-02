import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import Navbar from "../components/Navbar";
import { setSearch } from "../redux/filterSlice";

const mockStore = configureStore([]);

describe("Navbar Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      cart: { items: [{ id: 1 }, { id: 2 }] }, // Mock cart with 2 items
    });
    store.dispatch = jest.fn(); // Mock dispatch function
  });

  test("renders ShopMart logo", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText("ShopMart")).toBeInTheDocument();
  });

  test("renders search input and updates value on change", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>
    );

    const searchInput = screen.getByPlaceholderText("Search products...");
    expect(searchInput).toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: "Laptop" } });
    expect(searchInput.value).toBe("Laptop");
    expect(store.dispatch).toHaveBeenCalledWith(setSearch("Laptop"));
  });

  test("renders cart icon with correct badge count", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>
    );

    const cartBadge = screen.getByText("2");
    expect(cartBadge).toBeInTheDocument();
  });
});
