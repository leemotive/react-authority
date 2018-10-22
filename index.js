import React, { Component } from 'react';

class Authority extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { code, permission = [], children, ...otherProps } = this.props;
    const rights = code && permission.includes(code);

    if ('function' === typeof children) {
      return childrend(rights, this.props);
    } else {
      let AdmitChild = null, DenyChild = null, normal = [];
      React.Children.forEach(children, c => {
        c = React.cloneElement(c, { ...otherProps, ...c.props });
        const { type: { displayName } = {} } = c;
        if ('Admit' === displayName) {
          AdmitChild || (AdmitChild = c);
        } else if ('Deny' === displayName) {
          DenyChild || (DenyChild = c);
        } else {
          normal.push(c);
        }
      });
      return rights ? AdmitChild || normal : DenyChild;
    }
  }
}

Authority.Admit = function (props) {
  const { children, ...others } = props;
  return React.cloneElement(props.children, { ...others });
}
Authority.Admit.displayName = 'Admit';

Authority.Deny = function (props) {
  const { children, ...others } = props;
  return React.cloneElement(props.children, { ...others });
}
Authority.Deny.displayName = 'Deny';


export default Authority;
