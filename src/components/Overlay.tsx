import React from "react";

export const Overlay: React.FC = ({ children }) => {
    return (
        <div
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                zIndex: 100,
            }}
        >
            {children}
        </div>
    );
};
