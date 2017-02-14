import React from 'react';
import {Link} from 'react-router'

export let AdminLteWrapper = (props) => (
  <div className="wrapper">
    {props.children}
  </div>
)

export let Header = () => (
  <header className="main-header">
    <a href="/" className="logo">
      <span className="logo-lg">
        {" "}
        <b>Starter Kit</b>
      </span>
    </a>
    <nav className="navbar navbar-static-top" role="navigation">
      <a href="#" className="sidebar-toggle" data-toggle="offcanvas" role="button">
        <span className="sr-only">Toggle navigation</span>
      </a>
    </nav>
  </header>
)

export let ContentWrapper = (props) => (
  <div className="content-wrapper">
    {props.children}
  </div>
)

export let ContentHeader = (props) => {
  return (
    <section className="content-header">
      <h1>
        {props.header}
        <small>{props.children}</small>
        <small>{props.description}</small>
      </h1>
    </section>
  )
}

export let Content = (props) => (
  <section className="content">
    {props.children}
  </section>
)

export let Sidebar = (props) => (
  <div className="main-sidebar">
    <div className="sidebar">
      <ul className="sidebar-menu">
        {props.children}
      </ul>
    </div>
  </div>
)

export let SidebarHeader = (props) => (
  <li className="header">{props.name}</li>
)

export let SidebarElement = (props) => {
  return (
    <li>
      <Link to={props.link}>
        <i className={(props.icon || "fa fa-circle-o")} aria-hidden="true"></i>
        {props.children}
      </Link>
    </li>
  )
}
