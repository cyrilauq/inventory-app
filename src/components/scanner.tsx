interface IScannerProps {
    onScanned: (barcode: string) => void;
}

const Scanner = ( props: IScannerProps ) => {
    return(
        <div>
            <span>Un sanner</span>
        </div>
    );
};

export default Scanner;