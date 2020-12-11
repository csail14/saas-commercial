import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import { Chart } from "react-google-charts";
import moment from 'moment'
import 'moment/locale/fr';
moment.locale('fr');


let result = [
			    ['date', 'rdv', 'call']
              ]

const Stat = (props)=>{

    const [data, setData] = useState(result)

    useEffect(()=>{

        let newData = [
            ['date', 'rdv', 'call']
          ]
          
        props.follows.items.map((follow)=>{
            let index= newData.findIndex((el)=>{
                return el[0]===moment(follow.callDateTime).format('L')
            }
            )
            if(index !== -1){
                if (follow.type==='rdv'){
                    newData[index]=[newData[index][0],newData[index][1]+1,newData[index][2]]
                }
                else if (follow.type==='call'){
                    newData[index]=[newData[index][0],newData[index][1],newData[index][2]+1]
                }

            }else{
                if (follow.type==='rdv'){
                    newData.push([moment(follow.callDateTime).format('L'),1,0])
                }
                else if (follow.type==='call'){
                    newData.push([moment(follow.callDateTime).format('L'),0,1])
                }
            }
            
        })
        setData(newData)
    }, [props])


	return (
		<div>
			<h2 className="dashboard-title">Dashboard</h2>
			<Chart
			  width={'800px'}
			  height={'600px'}
			  chartType="AreaChart"
			  loader={<div>Loading Chart</div>}
			  data={data}
			  options={{
			    title: 'Total des rdv et appels cette semaine',
			    hAxis: { title: 'Date', titleTextStyle: { color: '#333' } },
			    vAxis: { minValue: 0 },
			    // For the legend to fit, we make the chart area smaller
			    chartArea: { width: '50%', height: '70%' },
			    // lineWidth: 25
			  }}
			  // For tests
			  rootProps={{ 'data-testid': '1' }}
			/>
		</div>
	)
}


const mapDispatchToProps = {
	
}

const mapStateToProps = (store)=>{
	return {
		user: store.user,
        contact: store.contact,
        follows: store.follow
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Stat);