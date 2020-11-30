import React from 'react';
import {Link, useHistory,useLocation} from "react-router-dom";
import {CHECK_BALANCE, DEPOSIT, HOME} from "../../constants/routes";
import {useUserInfo} from "../../recoilStates/userAuth";
import * as Auth from "../../models/auth";
import * as routes from "../../constants/routes";
import styles from "./navBar.module.css"
import {Nav, Navbar} from "react-bootstrap";

function NavBar() {

    const history = useHistory()
    let location = useLocation();
    const [, setObj] = useUserInfo()
    function handleLogout(){
        Auth.logout()
            .then(()=>{
                setObj.logout()
                history.push(routes.LOGIN)
            })
    }

    function getSelectedClassname(route){
        if(location.pathname === "/" && route === "/")
            return styles.selected;
        else if ( route !=="/" && location.pathname.toLowerCase().startsWith(route.toLowerCase()))
            return styles.selected;
        return ""
    }

    return (
        <Navbar className={styles.component} as={"nav"} bg={"dark"} variant={"dark"}>
            <Navbar.Brand ><span className={styles.logoText}>Checkmarx Bank</span></Navbar.Brand>

            <Nav.Link  as="section">
                <Link to={HOME}><span className={`${styles.buttons} ${getSelectedClassname(HOME)}`}>Home</span></Link>
            </Nav.Link>

            <Nav.Link  as="section">
                <Link to={DEPOSIT}><span className={`${styles.buttons} ${getSelectedClassname(DEPOSIT)}`}>Deposit</span></Link>
            </Nav.Link>

            <Nav.Link  as="section">
                <Link to={CHECK_BALANCE} ><span className={`${styles.buttons} ${getSelectedClassname(CHECK_BALANCE)}`}>Check Balance</span></Link>
            </Nav.Link>

            <Nav.Link as={"section"}  onClick={handleLogout}>
               <span className={styles.buttons}>Logout</span>
            </Nav.Link>

        </Navbar>
    );
}

export default NavBar;