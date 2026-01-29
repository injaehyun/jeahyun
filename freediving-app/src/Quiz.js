import React, { useState } from 'react';
import './Quiz.css';
import Result from './Result';

const quizData = {
  "version": "1.0.0",
  "testId": "freediving-archetype-8",
  "scoring": {
    "method": "additive",
    "unit": 1,
    "tieBreak": {
      "type": "priorityQuestions",
      "priorityQuestionIds": ["q6", "q8"],
      "fallback": "firstInPriorityOrder"
    }
  },
  "types": [
    "plan_diver",
    "care_diver",
    "observe_diver",
    "solo_diver",
    "sense_diver",
    "analyze_diver",
    "vibe_diver",
    "goal_diver"
  ],
  "questions": [
    {
      "id": "q1",
      "text": "입수 전, 가장 먼저 확인하는 것은?",
      "choices": [
        { "id": "a", "text": "오늘 계획해 둔 수심과 회차", "score": { "plan_diver": 1 } },
        { "id": "b", "text": "오늘 버디들의 컨디션", "score": { "care_diver": 1 } }
      ]
    },
    {
      "id": "q2",
      "text": "다이빙 포인트에 도착했을 때 당신은?",
      "choices": [
        { "id": "a", "text": "다른 다이버들이 먼저 들어가는 걸 지켜본다", "score": { "observe_diver": 1 } },
        { "id": "b", "text": "준비되면 바로 내 다이빙을 시작한다", "score": { "goal_diver": 1 } }
      ]
    },
    {
      "id": "q3",
      "text": "다이빙 전 브리핑 시간이 길어지면?",
      "choices": [
        { "id": "a", "text": "기준이 정리돼서 오히려 마음이 편하다", "score": { "plan_diver": 1 } },
        { "id": "b", "text": "빨리 물에 들어가고 싶다", "score": { "vibe_diver": 1 } }
      ]
    },
    {
      "id": "q4",
      "text": "물속에서 예상과 다른 상황이 생겼을 때?",
      "choices": [
        { "id": "a", "text": "내 리듬을 유지하며 조용히 정리한다", "score": { "solo_diver": 1 } },
        { "id": "b", "text": "왜 이런 상황이 생겼는지 떠올린다", "score": { "analyze_diver": 1 } }
      ]
    },
    {
      "id": "q5",
      "text": "다이빙 후 가장 먼저 하는 행동은?",
      "choices": [
        { "id": "a", "text": "버디에게 “어땠어?” 하고 묻는다", "score": { "care_diver": 1 } },
        { "id": "b", "text": "로그나 수치를 먼저 확인한다", "score": { "analyze_diver": 1 } }
      ]
    },
    {
      "id": "q6",
      "text": "입수 후 몸 상태가 애매할 때 당신은?",
      "choices": [
        { "id": "a", "text": "호흡과 리듬을 조절하며 깊이를 낮춘다", "score": { "sense_diver": 1 } },
        { "id": "b", "text": "오늘 목표를 기준으로 계속 시도한다", "score": { "goal_diver": 1 } }
      ]
    },
    {
      "id": "q7",
      "text": "팀 내에서 당신의 위치는 보통?",
      "choices": [
        { "id": "a", "text": "조용히 내 다이빙에 집중하는 편", "score": { "solo_diver": 1 } },
        { "id": "b", "text": "분위기를 풀거나 말을 거는 편", "score": { "vibe_diver": 1 } }
      ]
    },
    {
      "id": "q8",
      "text": "첫 다이빙을 앞두고 가장 마음에 남는 생각은?",
      "choices": [
        { "id": "a", "text": "“지금 들어가도 괜찮은 타이밍일까?”", "score": { "observe_diver": 1 } },
        { "id": "b", "text": "“이번엔 어디까지 가볼까?”", "score": { "goal_diver": 1 } }
      ]
    },
    {
      "id": "q9",
      "text": "다이빙이 잘 풀린 날, 당신은?",
      "choices": [
        { "id": "a", "text": "오늘 흐름이 왜 좋았는지 생각한다", "score": { "analyze_diver": 1 } },
        { "id": "b", "text": "오늘 느낌이 좋았다는 사실이 중요하다", "score": { "sense_diver": 1 } }
      ]
    },
    {
      "id": "q10",
      "text": "다이빙을 마치고 가장 만족스러울 때는?",
      "choices": [
        { "id": "a", "text": "모두가 무사히 끝났을 때", "score": { "care_diver": 1 } },
        { "id": "b", "text": "내가 정한 기준을 잘 지켰을 때", "score": { "plan_diver": 1 } }
      ]
    }
  ]
};

const Quiz = ({ resetQuiz }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]); // Store selected choice objects
  const [finalResult, setFinalResult] = useState('');

  const questions = quizData.questions;

  const handleAnswerOptionClick = (choice) => {
    const newAnswers = [...userAnswers, { questionId: questions[currentQuestionIndex].id, choice }];
    setUserAnswers(newAnswers);

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      calculateResult(newAnswers);
      setShowResult(true);
    }
  };

  const calculateResult = (answers) => {
    const typeScores = {};
    quizData.types.forEach(type => (typeScores[type] = 0));

    answers.forEach(answer => {
      for (const type in answer.choice.score) {
        typeScores[type] += answer.choice.score[type] * quizData.scoring.unit;
      }
    });

    let topTypes = [];
    let maxScore = -1;

    for (const type in typeScores) {
      if (typeScores[type] > maxScore) {
        maxScore = typeScores[type];
        topTypes = [type];
      } else if (typeScores[type] === maxScore) {
        topTypes.push(type);
      }
    }

    if (topTypes.length === 1) {
      setFinalResult(topTypes[0]);
    } else {
      // Handle tie-breaking
      const { priorityQuestionIds, fallback } = quizData.scoring.tieBreak;

      for (const pqId of priorityQuestionIds) {
        const priorityAnswer = answers.find(ans => ans.questionId === pqId);
        if (priorityAnswer) {
          for (const type in priorityAnswer.choice.score) {
            if (topTypes.includes(type)) {
              setFinalResult(type);
              return;
            }
          }
        }
      }

      if (fallback === "firstInPriorityOrder" && topTypes.length > 0) {
        setFinalResult(topTypes[0]); // Fallback to the first type in the tied list
      } else {
        setFinalResult('Unknown'); // Should not happen with current fallback
      }
    }
  };

  return (
    <div className="quiz-container">
      {showResult ? (
        <Result result={finalResult} resetQuiz={resetQuiz} />
      ) : (
        <>
          <div className="question-section">
            <div className="question-count">
              <span>Question {currentQuestionIndex + 1}</span>/{questions.length}
            </div>
            <div className="question-text">{questions[currentQuestionIndex].text}</div>
          </div>
          <div className="answer-section">
            {questions[currentQuestionIndex].choices.map((choice) => (
              <button key={choice.id} onClick={() => handleAnswerOptionClick(choice)}>
                {choice.text}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
