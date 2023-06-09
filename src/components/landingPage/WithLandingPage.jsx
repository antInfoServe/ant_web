import React, { useState, useEffect } from "react";

export const WithLandingPage = (container) => {
  return ({
    metaData, setMetaData, content, setContent, userInput, setUserInput, deferredPrompt, setDeferredPrompt, appInstalled
  }) => {
    useEffect(async () => {
      if (metaData.options === null && userInput.pid !== 'emergency_services') {
        const result = await container.metaDataDispatcher().getMetaDataByType(metaData.choices[metaData.choices.findIndex(obj => obj.pid === userInput.pid)].metaData);
        if (result.code !== 400) {
          metaData.options = result.enum
          setMetaData({ ...metaData });
        }
      }

      if (userInput.option === null && userInput.pid !== 'emergency_services') {
        userInput.option = metaData.options[0]
        setUserInput({ ...userInput })
      }
    });

    const handleLocation = (value) => {
      userInput.location = value.toLowerCase();
      setUserInput({ ...userInput });
    };

    const handleEnum = (e) => {
      userInput.option = e.target.value;
      setUserInput({ ...userInput });
    };

    const handleContentChoice = (e) => {
      metaData.options = null
      userInput.pid = e.target.value
      userInput.option = null
      setUserInput({ ...userInput })
      setMetaData({ ...metaData })
    }

    const getContent = async () => {
      const errorMessage = [
        {
          name: "error",
          description: "please try again! for better results e.g hanoi, vietnam",
        },
      ]

      const loadingMessage = [
        {
          name: "loading",
          description: 'sit back and relax a bit, our ai is brewing up results to perfectly suit your preferences. enjoy the grand reveal!'
        }
      ]
      const data = { ...content };
      switch (userInput.pid) {
        case 'suggest_places':
          data.places = loadingMessage;
          break
        case 'suggest_menu':
          data.menu = loadingMessage;
          break
        case 'emergency_services':
          data.emergency = loadingMessage;
          break
      }      setContent({ ...data })
      if (userInput.location.length < 5) {
        switch (userInput.pid) {
          case 'suggest_places':
            data.places = errorMessage;
            break
          case 'suggest_menu':
            data.menu = errorMessage;
            break
          case 'emergency_services':
            data.emergency = [
              {
                name: "error",
                description: "please enter country for better results e.g vietnam",
              },
            ]
              ;
            break
        }
        return setContent({ ...data });
      }
      const result = await container.contentDispatcher().getContent(userInput);
      if (result.content) {
        switch (userInput.pid) {
          case 'suggest_places':
            data.places = result.content;
            break
          case 'suggest_menu':
            data.menu = result.content;
            break
          case 'emergency_services':
            data.emergency = result.content;
            break
        }
      } else {
        data.places = [
          {
            name: "error",
            description: "please check the input and try again",
          },
        ];
      }
      // gtag('event', 'search', {
      //   'search_term':userInput.location,
      //   'content_type':userInput.pid
      // })
      return setContent({ ...data });
    };

    const props = { ...container };
    props.content = content;
    props.metaData = metaData;
    props.setMetaData = setMetaData
    props.userInput = userInput
    props.setUserInput = setUserInput
    props.handleLocation = handleLocation;
    props.handleEnum = handleEnum;
    props.getContent = getContent;
    props.handleContentChoice = handleContentChoice
    props.deferredPrompt = deferredPrompt
    props.setDeferredPrompt = setDeferredPrompt
    props.appInstalled = appInstalled

    return (
      <div>
        <container.Navbar {...props} />
        <container.ContentChoiceBar {...props} />
        <container.Inputbar {...props} />
        <container.DisplayContent {...props} />
        <container.NewSearch {...props} />
      </div>
    );
  };
};
