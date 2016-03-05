import React from 'react';
import Button from './Button';
import styles from './FileOperations.css';

const FileOperations = ({onGenerateImage}) => (
  <div className={styles.container}>
    <Button style="dark">Lataa</Button>
    <Button style="dark">Tallenna</Button>
    <Button onClick={onGenerateImage}>Generoi PDF</Button>
  </div>
);

export default FileOperations;
