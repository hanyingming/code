import React from 'react';
import { connect } from 'dva';
// import styles from './IndexPage.css';
import ClientSocket from '../components/socket/ClientSocket';

function IndexPage() {
  return (
    <ClientSocket/>
  );
}

IndexPage.propTypes = {
};
export default connect()(IndexPage);
