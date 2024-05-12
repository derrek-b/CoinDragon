import { useState, useEffect } from "react"
import Chart from 'react-apexcharts'

const Values = ({ tokens }) => {
  const defaultValues = [30, 40, 45, 50, 49, 60, 70, 91]
  const defaultCategories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug']

  const [dailyValues, setDailyValues] = useState([])
  const [categories, setCategories] = useState([])

  const calculateValues = () => {
    let dayValue
    const allValues = []
    const allCategories = []

    for(let i = 0; i < tokens[0].prices.length; i++) {
      dayValue = 0

      tokens.forEach((token) => {
        if(dayValue === 0) {
          allCategories.push(new Date(token.prices[i][0]).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', }))
        }

        dayValue += token.prices[i][1] * token.balance
      })

      allValues.push(dayValue.toFixed(2))
    }

    setDailyValues(allValues)
    setCategories(allCategories)
  }

  useEffect(() => {
    if(tokens.length > 0) {
      calculateValues()
    }
  }, [tokens])

  return(
    <div className="value">
      <h3 className="value__title">Portfolio 7 Day Value</h3>

      <div className="value__chart">
        <Chart
          options={{
            colors: ["#2F4858"],
            stroke: {
              curve: "smooth",
              colors: ["#488451"]
            },
            grid: {
              show: false
            },
            xaxis: {
              categories: categories.length > 0 ? categories : defaultCategories,
              labels: {
                show: true,
                rotateAlways: true,
                rotate: -45,
                offsetY: 10,
                style: {
                  colors: '#FFFFFF',
                },
              },
            },
            yaxis: {
              labels: {
                show: true,
                offsetX: -10,
                style: {
                  colors: '#FFFFFF',
                },
              },
            },
            tooltip: {
              enabled: true,
              theme: 'dark',
              style: {
                fontSize: '12px',
                background: '#FFFFFF',
              },
            },
            markers: {
              size: 6,
              colors: ['#2F4858'],
              strokeColors: '#FFFFFF',
              strokeWidth: 2,
              hover: {
                size: 8,
              },
            },
          }}
          series={[
            {
              name: 'Price',
              data: dailyValues.length > 0 ? dailyValues : defaultValues
            }
          ]}
          type='line'
          height={300}
        />
      </div>
    </div>
  )
}

export default Values
