function Status({status, color}) {
    return (
        <span className={"px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-"+color+"-100 text-"+color+"-800 uppercase"}>
            {status}
        </span>
    );
}

export default Status;
