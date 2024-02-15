import {dom} from "../assets/util/dom.js";
import {appendFirst} from "../assets/util/appends.js";
import {onValueChange, setValueOf} from "../base/presentationModel/presentationModel.js";

export {modalProjector, pageCss}

const masterClassName = 'nav-main-view'; // should be unique for this projector

/**
 * @param rootElement
 * @param authCtrl {AuthController}
 * @param showModalAttr {Attribute}
 * @param showModalBtn {HTMLElement}
 * @param menu {Menu}
 */
const modalProjector = (rootElement, authCtrl, showModalAttr, showModalBtn, menu) => {

    const modalElement = dom(`
           <div class="${masterClassName}-modal">
                 <div class="${masterClassName}-modal-header">
                   <img alt="Avatar" class="${masterClassName}-avatar">
                   <h3>Firstname Lastname</h3>
                   <p>email</p>
                 </div>
                 <div class="${masterClassName}-modal-body">
                   <p>Manage your Vakansie Account</p>
                   <p>Sign out</p>
                 </div>
                 <div class="${masterClassName}-modal-footer">
                   <p>Terms of Service</p>
                 </div>
           </div>`);


    const [modal] = modalElement.children;
    onValueChange(showModalAttr)(isVisible => {
        isVisible
            ? modal.style.display = "block"
            : modal.style.display = "none";
    })

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = event => {
        if (event.target === showModalBtn) return // guard
        if (!modal.contains(event.target)) {
            setValueOf(showModalAttr)(false)
        }
    }

    const header = modalElement.querySelector(`.${masterClassName}-modal-header`);
    const [avatar, names, email] = header.children;

    avatar.src = './src/assets/img/avatars/svg/035-man-4.svg';

    const userDetails = authCtrl.getUserDetails();
    names.innerHTML = userDetails.firstname + " " + userDetails.lastname;
    email.innerHTML = userDetails.email;


    const body = modalElement.querySelector(`.${masterClassName}-modal-body`);
    const [manage, signout] = body.children;

    manage.onclick = () => {
        menu.setSelectedEntry("5");
        setValueOf(showModalAttr)(false)
    } // todo rework it to avoid using ids

    signout.onclick = () => {
        authCtrl.logout();
        setValueOf(showModalAttr)(false)
    }

    appendFirst(rootElement)(modalElement);
};

const pageCss = `

    .${masterClassName}-avatar {
        width: 80px;
        height: 80px;
        border: none;
        border-radius: 50%;
        overflow: hidden;
    }

    .${masterClassName}-modal {
        display: none; /* Hidden by default */
        position: fixed; /* Stay in place */
        z-index: 1; /* Sit on top */
        right: 32px;
        top: 50px;
        width: 400px; /* Full width */
        height: 500px; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        padding: 10px;

        background: #fff;
        border-radius: 8px;
        border: 1px solid #ccc;
        border-color: rgba(0,0,0,.2);

        -webkit-animation: fadeIn .2s;
        animation: fadeIn .2s;

        box-shadow: 0 2px 10px rgba(0,0,0,.2);
        color: black;
    }

    @-webkit-keyframes fadeIn {
    from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes fadeIn {
        from { opacity: 0; }
          to { opacity: 1; }
    }


    .${masterClassName}-modal-header, .${masterClassName}-modal-body, .${masterClassName}-modal-footer {
        vertical-align: top;
        text-align: center;
        padding: 2px 16px;
        margin: 20px 33px;
     }

    .${masterClassName}-modal-body > p {
       border: 1px solid #ccc;
       padding: 8px;
       border-radius: 15px;
    }

    .${masterClassName}-modal-body > p:hover {
       background-color: #f7f8f8;
    }
`;
