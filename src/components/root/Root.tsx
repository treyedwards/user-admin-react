
import { Outlet, useLoaderData, useNavigate, useSubmit } from "react-router-dom";
import Header from "../header/Header";
import styles from "./Root.module.css";
import { useEffect } from "react";
import { getTokenDuration } from "../shared/service/auth.service";

export default function Rootlayout() {
  const token = useLoaderData();
  const submit = useSubmit();
  const navigate = useNavigate();

  useEffect(()=> {
    if (!token) {
      return;
    }
    
    if (token === 'EXPIRED') {
      //submit(null, {action: '/logout'});
      navigate('/logout');
    }

    const tokenDuration = getTokenDuration();
    setTimeout(()=> {
      //submit(null, {action: '/logout'});
      navigate('/logout');
    }, tokenDuration);
  });

  return (
    <>
      <Header/>
      <main>
        <Outlet/>
      </main>
    </>
  );
}