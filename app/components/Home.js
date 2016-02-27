import React, { Component } from 'react';
import Map from '../containers/Map';
import styles from './Home.css';


export default class Home extends Component {
  render() {
    return (
      <div>
        <div className={styles.topBar}>
          <h2>Karttageneraattori</h2>
        </div>
        <div className={styles.main}>
          <div className={styles.sideBar}>
            Näytä kartalla
          </div>
          <div className={styles.mainMap}>
            <Map />
          </div>
        </div>
      </div>
    );
  }
}
