import FeatureProduct from "./components/FeatureProduct";
import React, { useState, useEffect } from "react";
import HeroSection from "./components/HeroSection";
import Services from "./components/Services";
import Trusted from "./components/Trusted";
import { AnalyticsBrowser} from "@segment/analytics-next";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const writeKey = process.env.WRITE_KEY;
const analytics = AnalyticsBrowser.load({ writeKey: "trt2mhv6rjiqM8rpsRExWM1pBiguWqUm" });
const Home = () => {
  const { isAuthenticated, user } = useAuth0();

  useEffect(() => {
    // Check if the user is authenticated
    let isPresent = false;
    let user_id = localStorage.getItem("ajs_user_id");
    // Read cookies using document.cookie
    const cookies = document.cookie;

    // Parse cookies into an object
    const cookieObject = cookies
      .split(';')
      .map(cookie => cookie.trim().split('='))
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});

    // Access individual cookies by name
    const hubspotutk = cookieObject.hubspotutk;

    // Do something with the cookie value
    console.log('Hubspot utk:', hubspotutk);

    // Check if ajs_user_id is present and not null
    if (user_id && user_id !== "null") {
      isPresent = true;
    } else {
      // Generate a new UUID
      user_id = uuidv4();
    }
    if (isAuthenticated && !(isPresent)) {
      // Send an identify call to Segment
      console.log("User present in Segment ", isPresent);
      analytics.identify(user_id, {
        email: user.name,
      });
      analytics.page("Page Viewed Home");
      analytics.track("Element Clicked", {
        attributes: {
          type: "Home",
          email: user.name
        },
      },{       
         hubspotutk:hubspotutk
      });
    }
  }, [isAuthenticated, user]);
  const data = {
    name: "CDP store",
  };
  return (
    <>
      <HeroSection myData={data} />
      <FeatureProduct />
      <Services />
      <Trusted />
    </>
  );
};

export default Home;
