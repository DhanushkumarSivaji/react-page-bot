import React, { Component } from 'react'

class ErrorBoundary extends Component {

    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      console.log(error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        return (
        <>
        <h1>Something went wrong !!!</h1>
        <p style={{textAlign:'center',fontSize:'16px'}}>Sorry, something went wrong there. Please try again</p>
        </>
        );
      }
  
      return this.props.children; 
    }
  }

  export default ErrorBoundary;