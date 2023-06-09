import React from "react";

export const ComingSoonPage = ({ staticText, pageName }) => {
    return (
        <div>
            <div className="landing_page_navbar">
                <p>{staticText.website}</p>
            </div>
            <div className="box_page">
                <h1>{pageName} {staticText.comingSoon}</h1>
            </div>
        </div>
    )
}