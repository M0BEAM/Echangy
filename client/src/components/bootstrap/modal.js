const ModalUpdate = ({options,data}) => {
  const {modal,setModal} = options
  const {name, description, phoneNumber} = data
  return (
    <div class={`modal ${modal}`} >
      <div class="modal-background" onClick={()=>{setModal("")}}></div>

      <div class="modal-content w-50" >
        <div class="box">
          <div class="field">
            <label class="label">Name</label>
            <div class="control">
              <input class="input" value={name} type="text" placeholder="e.g Alex Smith" />
            </div>
          </div>

          <div class="field">
            <label class="label">image</label>
            <div class="control">
              <input class="input" type="email" placeholder="e.g. alexsmith@gmail.com" />
            </div>
          </div>

          <div class="field">
            <label class="label">description</label>
            <div class="control">
              <input class="input" value={description} type="email" placeholder="e.g. alexsmith@gmail.com" />
            </div>
          </div>

          <div class="field">
            <label class="label">phoneNumber</label>
            <div class="control">
              <input class="input" value={phoneNumber} type="email" placeholder="e.g. alexsmith@gmail.com" />
            </div>
          </div>

        </div>
      </div>

      <button class="modal-close is-large" onClick={()=>{setModal("")}} aria-label="close"></button>
    </div>
  );
}

export default ModalUpdate;