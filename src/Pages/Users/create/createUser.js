import React, { useState } from "react";
import "./createUser.css"

const CreateUser = function(){
        return(
            <div>
                <div id="myModal" class="modal">

                <div class="modal-content">
                    <span class="close">&times;</span>
                    <p>Some text in the Modal..</p>
                </div>
                    {/* <button onClick={() => setmodalCreateUserHidden(true)}>Close</button> */}
                </div>
            </div>
        )
}
export default CreateUser