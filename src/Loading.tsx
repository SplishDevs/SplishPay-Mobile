import React from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import ProgressLoader from 'rn-progress-loader';

const Loading: React.FC = (props: any) => {
  return (
    <ProgressLoader
      visible={props?.loading}
      isModal={true}
      isHUD={true}
      hudColor={'#000000'}
      color={'#FFFFFF'}
    />
  );
};

const mapStateToProps = (state: any) => {
  const {
    authReducer: {loading},
  } = state;
  return {loading};
};

export default connect(mapStateToProps, null)(Loading);
