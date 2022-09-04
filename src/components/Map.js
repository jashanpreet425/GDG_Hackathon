import React from 'react'

export const Map = (props) => {
    return (
        <div>
            <iframe src={props.changeMap} style={{ position: "absolute", filter: " contrast(1.2) opacity(0.8)", width: "100%", height: "100vh", frameborder: "0", marginheight: "0", marginwidth: "0", title: "map", scrolling: "no" }}></iframe>
        </div>
    )
}
