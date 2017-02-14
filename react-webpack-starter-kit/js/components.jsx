import React from 'react'
require("bootstrap-webpack")
import DonutChart from 'react-donut-chart'

/*

  export class MyDonutChart extends React.Component {
  render = () => {
    let data = this.props.data || []
    console.log("Props: ", this.props.data)
    return (<DonutChart
      data={data.map((x) => {
        return ({
          label: 'alaa',
          value: x,
        })
      })} />)
  }
}

 */
export class MyDonutChart extends React.Component {
  state = {
    stale: 10,
    tymczasowe: 90
    }
  render = () => {
    let data = this.props.data || []
    this.state.stale=data[0]
    this.state.tymczasowe=data[1]
    return (<DonutChart
    data={[{
        label: 'Wydatki tymczasowe ',
        value: this.state.stale,
    },
    {
        label: 'Wydatki stałe ',
        value: this.state.tymczasowe,
    }]} />
    )
  }
  }
