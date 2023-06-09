import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { dummyData } from "./utils/dummyData";
import place_icon from './assets/place_icon_vascoai.svg'
import menu_icon from './assets/food_drinks_icon_vascoai.svg'
import emergency_icon from './assets/emergency_icon_vascoai.svg'


import { LandingPage } from "./provider";

import "./stylesheet/app.css";

const App = () => {

  const [metaData, setMetaData] = useState(
    {
      options: null,
      locations:[],
      choices: [
        {
          pid: 'suggest_places',
          icon: place_icon,
          metaData: 'mood'
        },
        {
          pid: 'suggest_menu',
          icon: menu_icon,
          metaData: 'menu'
        },
        {
          pid: 'emergency_services',
          icon: emergency_icon,
          metaData: 'none'
        }
      ]
    }
  )

  const [content, setContent] = useState(
    {
      places: [
        {
          name: "welcome!",
          description: "let vascoai be your guide as you embark on an exciting journey of discovery and adventure."
        }
      ],
      menu: [
        {
          name: "welcome!",
          description: "let vascoai be your guide as you embark on an exciting journey of discovery and adventure."
        }
      ],
      emergency: [
        {
          name: "welcome!",
          description: "let vascoai be your guide as you embark on an exciting journey of discovery and adventure."
        }
      ]
    }
  )

  const [userInput, setUserInput] = useState(
    {
      option: null,
      location: "",
      pid: 'suggest_places'
    }
  )

  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [appInstalled, setAppInstalled] = useState(false)

  useEffect(async () => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, [])

  useEffect(async () => {
    const handleAppInstalled = () => setAppInstalled(true)
    window.addEventListener('appinstalled', handleAppInstalled);

    if (window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches) {
      setAppInstalled(true)
    } else {
      setAppInstalled(false)
    }
    return () => {
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [])

  const props = {
    metaData,
    setMetaData,
    content,
    setContent,
    userInput,
    setUserInput,
    deferredPrompt,
    setDeferredPrompt,
    appInstalled
  }

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<LandingPage {...{ ...props }} />} />
      </Routes>
    </div>
  );
};
export default App