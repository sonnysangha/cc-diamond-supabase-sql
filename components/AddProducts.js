import { useRef } from "react";
import supabase from "../supabase";

function AddProducts() {
  const titleRef = useRef();
  const priceRef = useRef();

  const addProduct = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("Product")
      .insert([
        { title: titleRef.current.value, price: priceRef.current.value },
      ]);

    console.log("added product", data);
  };

  return (
    <form>
      <input
        ref={titleRef}
        type="text"
        placeholder="Enter title of product..."
      />
      <input
        ref={priceRef}
        type="number"
        placeholder="Enter price for product..."
      />
      <button type="submit" onClick={addProduct}>
        Add Product
      </button>
    </form>
  );
}

export default AddProducts;
