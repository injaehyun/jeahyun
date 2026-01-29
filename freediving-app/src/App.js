import React, { useState } from 'react';
import './App.css';
import Quiz from './Quiz';

function App() {
  const [showQuiz, setShowQuiz] = useState(false);

  const resetQuiz = () => {
    setShowQuiz(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>프리다이빙 성격 유형 테스트</h1>
      </header>
      <main className="App-main">
        {showQuiz ? (
          <Quiz resetQuiz={resetQuiz} />
        ) : (
          <button className="start-button" onClick={() => setShowQuiz(true)}>
            Start the Test
          </button>
        )}
      </main>
      <footer className="App-footer">
        <p>&copy; 2026 Freediving-App</p>
      </footer>
    </div>
  );
}

export default App;
