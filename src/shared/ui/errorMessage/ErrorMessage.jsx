import errorGif from "./error.gif"
const ErrorMessage = () => {
    return (
        <div style={{
            width: "100%", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center"
        }}>
            <img 
                style={{width: "250px", height: "250px"}}
                src={errorGif} 
                alt="error 404"
            />
        </div>
    )
}

export default ErrorMessage