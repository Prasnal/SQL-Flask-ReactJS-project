import React from 'react'
require("bootstrap-webpack")

class MyDonoutChart extends React.Component {
  render = () => {
    let data = this.props.data || []
    return (<DonutChart
      data={data.map((x) => {
        console.log("x=",x)
        return ({
          label: 'alaa',
          value: x,
        })
      })} />)
  }
}
