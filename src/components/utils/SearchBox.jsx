import React, { useState, useEffect } from "react";

export const SearchBox = ({ searchDispatcher, metaData, setMetaData, context, placeholder = 'search...', callback }) => {
    const [showResult, setShowResult] = useState(false)
    const [searchQuery, setSearcQuery] = useState("")
    useEffect(() => {
        let delay = null
        if (metaData.locations.indexOf(searchQuery) < 0) {
            delay = setTimeout(async () => {
                switch (context) {
                    case 'country_list':
                        metaData.locations = await searchDispatcher().getCountryList(searchQuery)
                        break;
                    case 'city_list':
                        metaData.locations = await searchDispatcher().getCityList(searchQuery)
                        break;
                }
                setMetaData({ ...metaData })
                if (metaData.locations.length > 0) {
                    setShowResult(true)
                } else {
                    document.getElementById('search_inputbox').style.color = "red"
                }
            }, 1000)
        }
        return () => clearTimeout(delay)
    }, [searchQuery]
    )
    const handleChange = async (e) => {
        document.getElementById('search_inputbox').style.color = "black"
        setSearcQuery(e.target.value)
        if (searchQuery.length < 3) {
            setShowResult(false)
        }
    }
    const handleSelect = (e) => {
        if (e.target.value !== "sorry, we cannot find anything that matches your search term.") {
            setSearcQuery(e.target.value)
            callback(e.target.value)
            setShowResult(false)
        }
    }

    return (
        <div>
            <div>
                <input id="search_inputbox" className="long_inputbox" type="text" placeholder={placeholder} onChange={handleChange} value={searchQuery} />
            </div>
            {showResult ? <div className="box_search_result">
                {
                    metaData.locations.map((ele, index) => <div key={index} className="box_search_value">
                        <input className="radio_like_button" name="search_result" id={ele} type="radio" value={ele} key={index} onChange={handleSelect} />
                        <label className="radio_like_button_label" htmlFor={ele}>{ele}</label>
                    </div>
                    )
                }
            </div> : null}
        </div>
    )
}
