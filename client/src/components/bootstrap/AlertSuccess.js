const AlertSuccess = ({message}) => {
    return ( 
        <div class="alert  mt-2 alert-success d-flex align-items-center" role="alert">
  <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlinkHref="#check-circle-fill"/></svg>
  <div>
  <span>✔</span>{message}
  </div>
</div>
     );
}
 
export default AlertSuccess;