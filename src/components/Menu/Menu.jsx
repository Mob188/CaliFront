import React from 'react';
import { Link } from 'react-router-dom';
import {Nav, Navbar} from 'react-bootstrap';
import Typography from '../Typography/Typography';

const Menu = () => {
    return (
        <>
            <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
                <div className="container">
                    <Navbar.Brand><Typography>Cali Bikes</Typography></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <Nav.Link as={Link} to="/stock">Stock</Nav.Link>
                            <Nav.Link as={Link} to="/addstock">Añadir producto</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Navbar>
        </>
    );
}

export default Menu;