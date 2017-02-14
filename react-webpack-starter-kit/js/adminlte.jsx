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
        <b>Bazy Danych</b>
      </span>
    </a>
    <nav className="navbar navbar-static-top" role="navigation">
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

export class DonutChart extends React.Component {
  state = {data: null}
  render = () => {
    let donut = new Morris.Donut({
      element: 'sales-chart',
      resize: true,
      colors: ["#3c8dbc", "#f56954", "#00a65a"],
      data: [
        {label: "Download Sales", value: 12},
        {label: "In-Store Sales", value: 30},
        {label: "Mail-Order Sales", value: 20}
      ],
      hideHover: 'auto'
    })
    console.log("DONUT:", donut)
    return (<div class="box box-danger">
      <div class="box-header with-border">
        <h3 class="box-title">Donut Chart</h3>

        <div class="box-tools pull-right">
          <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
          </button>
          <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
        </div>
      </div>
      <div class="box-body chart-responsive">
        <div class="chart" id="sales-chart" style="height: 300px; position: relative;"></div>
      </div>
    </div>
    )
  }
}
