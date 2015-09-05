import React, { Component } from 'react';
import _ from 'lodash';

import cx from 'classnames';
require('bootstrap/dist/css/bootstrap.css');
require('./style.css');

class Literal extends Component {
  render() {
    return (
      <span className="label label-default">{this.props.value}</span>
    );
  }
}

var q = require('./sample-query.json');


export default class App extends Component {
  render() {
    return (
      <div>
        {_.map(q.prefixes, (val, key) =>
          <div><Literal value="PREFIX"/><input value={key}/> : <input value={val}/></div>
        )}
        {/* queryType: 'SELECT' */}
        
        <br/>
        {/* SelectClause */}
        <Literal value="SELECT"/> <Literal value="DISTINCT | REDUCED"/>
        <br/>
        <Literal value="*"/>
        {/*"variables": [
          "*"
        ]*/}
        <br/>
        <input value="var"/>
        <br/>
        (<input value="expression"/> <Literal value="AS"/> <input value="var"/>)
        
        {/* DatasetClause */}
        <br/>
        <br/>
        <Literal value="FROM" />
        <input value="graph"/>
        <br/>
        <Literal value="FROM" /> <Literal value="NAMED"/> <input value="graph"/>
        
        <br/>
        <br/>
        {/* WhereClause */}
        <Literal value="WHERE?" /> 
        {'{'}
        SubSelect
        
        {'}'}
        
        <br/>
        <br/>
        {/* SolutionModifier */}
        <Literal value="GROUP BY?" /> 
        <Literal value="HAVING?" /> 
        <Literal value="HAVING?" /> 
        <Literal value="ORDER BY?" />  <Literal value="DESC?" /> <input value="expression"/>
        
        <br/>
        <Literal value="LIMIT?" /> <input type="number" value={q.limit} />
        <br/>
        <Literal value="OFFSET?" /> <input type="number"  value={q.offset}/>
        
      </div>
    );
  }
}
