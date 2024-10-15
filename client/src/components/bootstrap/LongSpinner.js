const LongSpiner = () => {
    return ( 
        <div className="d-flex align-items-center justify-content-center " style={{height:"600px"}}>
        <div className="spinner-grow bg-primary " style={{height:"1rem",width:"1rem"}} role="status"/>
        <div className="spinner-grow bg-primary " style={{height:"2rem",width:"2rem"}} role="status"/>
       <div className="spinner-grow bg-primary " style={{height:"3rem",width:"3rem"}} role="status"/>
       <div className="spinner-grow bg-primary " style={{height:"2rem",width:"2rem"}} role="status"/>
       <div className="spinner-grow bg-primary " style={{height:"1rem",width:"1rem"}} role="status"/>
        </div>
     );
}
 
export default LongSpiner;