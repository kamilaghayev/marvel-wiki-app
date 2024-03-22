import ErrorMessage from "../ui/errorMessage";
import Spinner from "../ui/spinner";
import Skeleton from "../../components/skeleton";

export const setContent = (process, Component, data, props) => {
    switch (process) {
        case 'waiting':
            return props && props.skeleton ? <Skeleton/> : <Spinner/>;
        case 'loading':
            return (
                <>
                    {data && <Component data={data} {...props}/>}
                    <Spinner/>
                </>
            );
        case 'success':
            return <Component data={data} {...props}/>;
        case 'error':
            return <ErrorMessage/>;
        default:
            throw new Error('Unexpected process state')
    }
}