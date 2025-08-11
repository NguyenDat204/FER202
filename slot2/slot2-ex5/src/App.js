import reactLogo from './logo.svg'; 
import './App.css';

function App() {
  const courses = ["React", "ReactNative", "NodeJs"];

  return (
    <div className="App">
      {/* 1. Hello React */}
      <h1>
        Hello <span className="react-text">React</span>
      </h1>

      {/* 2. Logo React */}
      <div className="logo-section">
        <img src={reactLogo} className="App-logo" alt="React Logo" />
        <p className="logo-caption">
          The library for web and native user interfaces
        </p>
      </div>

      {/* 3. Navbar */}
      <nav className="navbar">
        <a href="/">Home</a>
        <a href="/">Search</a>
        <a href="/">Contact</a>
        <a href="/">Login</a>
      </nav>

      {/* 4. This is JSX */}
      <h2 className="jsx-text">This is JSX</h2>

      {/* 5. Course list */}
      <h3>Course names</h3>
      <ul>
        {courses.map((course, index) => (
          <li key={index}>{course}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
