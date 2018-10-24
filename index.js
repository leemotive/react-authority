import React, { Component } from 'react';

class Authority extends Component {
  static defaultProps = {
    code: '',
    permission: []
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { code, permission, children, ...otherProps } = this.props;
    const rights = !code || permission.includes(code);

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
  if (children && children.props) {
    return React.cloneElement(props.children, { ...others });
  } else if (React.Children.count(children) > 1) {
    return React.Children.map(children, (child, index) => {
      if (child && child.props) {
        return React.cloneElement(child, { key: index, ...others });
      } else {
        return child;
      }
    })
  } else {
    return children;
  }
}
Authority.Admit.displayName = 'Admit';

Authority.Deny = function (props) {
  const { children, ...others } = props;
  if (children && children.props) {
    return React.cloneElement(props.children, { ...others });
  } else if (React.Children.count(children) > 1) {
    return React.Children.map(children, (child, index) => {
      if (child && child.props) {
        return React.cloneElement(child, { key: index, ...others });
      } else {
        return child;
      }
    })
  } else {
    return children;
  }
}
Authority.Deny.displayName = 'Deny';


export default Authority;
