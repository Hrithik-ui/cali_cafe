import React from 'react'
import {AppBar,Toolbar,IconButton,Badge,MenuItem,Menu,Typography} from "@material-ui/core"
import {ShoppingCart} from "@material-ui/icons"
import useStyles from "./styles"
import {Link,useLocation} from "react-router-dom"
const Navbar = ({totalItems}) => {
    const classes=useStyles()
const location=useLocation()

    return (
        <div>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
            <Toolbar>
            <Typography component={Link} to="/" variant="h6" className={classes.appBar} color="inherit">
            <img src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/flat-white-d8ada0f.jpg" alt="Califcafe" height="25px"  className={classes.image}/>
            CaliCafe
            </Typography>
            <div className={classes.grow}/>
            {location.pathname==="/" &&(
            <div className={classes.button}>
            <IconButton component={Link} to="/cart" aria-label="Show Label Items">
            <Badge badgeContent={totalItems} color="secondary">
            <ShoppingCart/>
            </Badge>
            </IconButton>
            </div>)}
            </Toolbar>
            </AppBar>
       </div>
    )
}

export default Navbar
