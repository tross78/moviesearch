import React , { Component } from 'react';
import { URL_IMG, IMG_SIZE_LARGE } from '../const'
import { Image } from 'react-bootstrap'
import styles from './Poster.module.css';

export default function Poster(props){
  return(
    <div className={styles.container}>
      <Image className="img-fluid" key={props.id} src={URL_IMG+IMG_SIZE_LARGE+props.path} responsive = "true" />
    </div>
  );
}