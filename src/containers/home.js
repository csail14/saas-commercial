import React from 'react'
import {Link} from 'react-router-dom';



class Home extends React.Component{
    constructor(props){
        super(props)
    }

    render() {
        console.log(this.props.user)
        return(
            <div>
                Hello
            </div>
        )
    }


}



export default Home;