import React, {Component} from 'react';
import ReactDom from 'react-dom';

import Navbar from './Navbar'

export default class Main extends Component {
    constructor(props) {
        super(props);
    }
    render(){
       return  (
           <div>
               <div>
                   <Navbar />
               </div>
               <div>
                 { this.props.children }
               </div>
           </div>
       )
    }
}