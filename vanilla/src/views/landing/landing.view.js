import {dom} from "../../madjs/assets/util/dom.js";
import {appendReplacing} from "../../madjs/assets/util/appends.js";
import {AuthController} from "../../auth/auth.prod.js";

export {LandingView};

/**
 * @param rootElement
 * @constructor
 */
const LandingView = (rootElement) => {

    const containerElement = dom(`
            <DIV id="mainnav-section"></DIV>
            <DIV id="content-section">
                <DIV id="main-content" class="main-content">
                    <h1> Welcome to Mabos </h1>
                    <a class="signin">signin</a>
                    <a class="signup">signup</a>
                    <a class="join">join group</a>
                    <a class="logout">logout</a>
                </DIV>
            </DIV>`);

    const signInElement = containerElement.querySelector('.signin');
    const signUpElement = containerElement.querySelector('.signup');
    const joinElement = containerElement.querySelector('.join');
    const logoutElement = containerElement.querySelector('.logout') // only for test

    signInElement.onclick = () => AuthController.login();
    signUpElement.onclick = () => AuthController.register();
    joinElement.onclick = () => alert("join me in")
    logoutElement.onclick = () => AuthController.logout();

    appendReplacing(rootElement)(containerElement)
};
