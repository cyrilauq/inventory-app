const Error = (props: { statusCode: number, message: string }) => {
    return(
        <div>
            <span>{props.statusCode}</span>
            <div>
                <span>{props.message}</span>
            </div>
        </div>
    );
};

export default Error;