import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

class RouteWrapper extends React.PureComponent {
  render() {
    const {
      component: Component,
      children,
      path,
      exact,
      strict,
      location,
      sensitive,
      ...rest
    } = this.props;

    return (
      <Route
        path={path}
        exact={exact}
        strict={strict}
        location={location}
        sensitive={sensitive}
        render={() => <Component {...rest} />}
      />
    );
  }
}

RouteWrapper.defaultProps = {
  children: undefined,
  exact: undefined,
  strict: undefined,
  location: {},
  sensitive: undefined,
};

RouteWrapper.propTypes = {
  component: PropTypes.func.isRequired,
  children: PropTypes.node,
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool,
  strict: PropTypes.bool,
  location: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  sensitive: PropTypes.bool,
};

export default RouteWrapper;
