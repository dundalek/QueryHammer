import React, { Component } from 'react';
import _ from 'lodash';

import cx from 'classnames';
require('bootstrap/dist/css/bootstrap.css');
require('./style.css');


var grammar = require('./sparql.json');

var rules = _.indexBy(grammar.rules, 'name');

var rulesExpanded = 'Query'.split(/\s+/);
var rulesInlined = 'Query Prologue ValuesClause BaseDecl PrefixDecl IRIREF'.split(/\s+/);


var components = {
  rule: class Rule extends Component {
    constructor(props) {
      super(props);
      this.state = {expanded: props.initialExpanded || false};
    }
    render() {
      if (rulesInlined.indexOf(this.props.expression.name) !== -1) {
        return dispatch({expression: this.props.expression.expression});
      }
      return (
        <div className="panel panel-default">
          <div className="panel-heading">
            <button
              className={cx("btn btn-default btn-xs", "glyphicon", this.state.expanded ?  "glyphicon-chevron-down" : "glyphicon-chevron-right")}
              onClick={this.toggleExpanded.bind(this)}></button>
            {this.props.expression.name}
          </div>
          {this.state.expanded && <div className="panel-body">
            {dispatch({expression: this.props.expression.expression})}
          </div>}
        </div>
      );
    }
    toggleExpanded() {
      this.setState({expanded: !this.state.expanded});
    }
  },
  one_or_more: class OneOrMore extends Component {
    constructor(props) {
      super(props);
      this.state = {count: 2};
    }
    render() {
      return (
        <div>
          {_.range(this.state.count).map(i =>
             dispatch({expression: this.props.expression.expression})
          )}
          <button type="button" className="btn btn-default">
            <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
          </button>
        </div>
      )
      
    }
  },
  zero_or_more: class ZeroOrMore extends Component {
    constructor(props) {
      super(props);
      this.state = {count: 2};
    }
    render() {
      return (
        <div>
          {_.range(this.state.count).map(i =>
             <div style={{"border": "1px solid #ccc", "border-radius": "5px"}}>{dispatch({expression: this.props.expression.expression})}</div>
          )}
          <button type="button" className="btn btn-default">
            <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
          </button>
        </div>
      )
      
    }
  },
  rule_ref: class RuleRef extends Component {
    render() {
      return React.createElement(components.rule, {
          expression: rules[this.props.expression.name],
          initialExpanded: false
        });
    }
  },
  literal: class Literal extends Component {
    render() {
      return (
        <span className="label label-default">{this.props.expression.value}</span>
      );
    }
  },
  choice: class Choice extends Component {
    render() {
      return (
        <ul>
          {this.props.expression.alternatives.map(r => 
            <li>{dispatch({expression: r})}</li>
          )}
        </ul>
      );
    }
  },
  sequence: class Sequence extends Component {
    render() {
      return (
        <div>
          {this.props.expression.elements.map(r => 
            dispatch({expression: r})
          )}
        </div>
      );
    }
  },
  unknown: class Unknown extends Component {
    render() {
      return (
        <div>
          Unknown: {this.props.expression.type}
        </div>
      );
    }
  }
};

// _.each(components, (val, key) => {
//   components[key] = React.createFactory(val)
// });

function dispatch(data) {
  var node = data.expression;
  var component = components[node.type] || components.unknown;
  return React.createElement(component, data);
}

export default class App extends Component {
  render() {
    return (
      <div>
        {dispatch({
          expression: rules.Query,
          initialExpanded: true
        })}
      </div>
    );
  }
}
