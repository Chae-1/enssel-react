import React from "react";

const InvalidModalContent = ({children}) => {
    return (
        <>
            <h1>유효하지 않은 접근입니다.</h1>
            {children}
        </>
    );
};
export default InvalidModalContent;