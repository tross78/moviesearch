import React, { Component } from 'react';
import styles from './AppHeader.module.css';

export default function AppHeader(props) {
    return (
        <header className={[styles.header, "col-md-8"].join(' ')}></header>
    )
};