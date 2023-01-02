import React from 'react'
import classes from './Loading.module.css';

const Loading = () => {
  return (
    <div className={classes.container}>
  <div className={classes.loader}>
    <div className={classes["loader--dot"]}></div>
    <div className={classes["loader--dot"]}></div>
    <div className={classes["loader--dot"]}></div>
    <div className={classes["loader--dot"]}></div>
    <div className={classes["loader--dot"]}></div>
    <div className={classes["loader--dot"]}></div>
  </div>
</div>

  )
}

export default Loading