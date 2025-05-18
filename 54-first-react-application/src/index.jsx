import './style.css';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

const root = createRoot(document.querySelector('#root'));
const toto = 'tata';

root.render(
  <div>
    {/* Some comment */}
    {/* <h1
      className="cute-paragraph"
      // style={{ color: 'coral', backgroundColor: 'floralwhite' }}
    >
      Hello {toto}
    </h1>
    <p>
      Some
      <br />
      content
      {Math.random()}
    </p> */}
    <App clickersCount={3}>
      <h1>My First React App</h1>
      <h2>And a fancy subtitle</h2>
    </App>
  </div>
);
