import { useEffect, useState } from "react";
import { userTable } from "../constants/database";
import useAuth from "../hooks/useAuth";
import AddProducts from "../components/AddProducts";
import supabase from "../supabase";
import { useRealtime } from "react-supabase";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, signUp, user, signOut, loading } = useAuth();
  const [products, setProducts] = useState([]);
  const [{ data, error, fetching }, reexecute] = useRealtime("Product");

  console.log(data);

  useEffect(() => {
    const mySubscription = supabase
      .from("Product")
      .on("*", (payload) => {
        console.log("Insert received!", payload);
        setProducts([...products, payload.new]);
      })
      .subscribe();

    return () => {
      mySubscription.unsubscribe();
    };
  }, [supabase, products]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("Product").select();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const logIn = (e) => {
    e.preventDefault();

    signIn(email, password);

    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Hello World</h1>

      <div>
        <form className="flex flex-col space-y-3">
          {!user && (
            <>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="email"
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="password"
              />
            </>
          )}

          {user ? (
            <button onClick={signOut}>Sign out</button>
          ) : (
            <>
              <button
                className="p-2 bg-green-400"
                type="submit"
                onClick={logIn}
              >
                Sign In
              </button>
              <button className="p-2 bg-red-400" onClick={signUp}>
                Sign Up
              </button>
            </>
          )}
        </form>
      </div>

      <AddProducts />

      {data?.map((product) => (
        <div key={product.id}>
          <p>
            {product.title} is £{product.price}
          </p>
        </div>
      ))}
    </div>
  );
}
