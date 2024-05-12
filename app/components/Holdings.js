import { useState, useEffect } from 'react'
import Chart from 'react-apexcharts'

const Holdings = ({ tokens }) => {
  const defaultSymbols = ['---', '---', '---', '---', '---']
  const defaultData = [60, 25, 10, 30, 30]

  const [symbols, setSymbols] = useState([])
  const [data, setData] = useState([])

  const calculateValue = () => {
    const allSymbols = []
    const allData = []

    tokens.forEach((token) => {
      allSymbols.push(token.market.symbol.toUpperCase())
      allData.push(token.value)
    })

    setSymbols(allSymbols)
    setData(allData)
  }

  useEffect(() => {
    calculateValue()
  }, [tokens])

  return(
    <div className="holdings">
      <h3 className="holdings__title">Asset Holdings</h3>

      <div className="holdings__chart">
        <Chart
          options={{
            labels: symbols.length > 0 ? symbols : defaultSymbols,
            legend: {
              position: 'left',
              horizontalAlign: 'center',
              labels: {
                fontSize: '48px',
                fontWeight: 'bold',
                colors: '#FFFFFF',
              },
            },
          }}
          series={data.length > 0 ? data : defaultData}
          type='pie'
          height={300}
        />
      </div>
    </div>
  )
}

export default Holdings
