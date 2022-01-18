import '@testing-library/jest-dom';

// to suppress warning saying there is no access to `alert` because jest doesn't
// use browsers thus it doesn't have access to the window object
window.alert = console.log;
