"use client";
import "./page.css";
import useLLM, { useChat } from "usellm";
import { useState } from "react";
import {
  Input,
  Button,
  Form,
  FormGroup,
  Col,
  Container,
  Row,
} from "reactstrap";
import Markdown from "react-markdown";
import Quiz from './quiz';
import Explore from './explore';
// const {
//   isLoading,
//   messages,
//   sendMessage,
//   callFunction,
//   sendFunctionOutput,
//   input,
//   setInput,
// } = useChat(options);

export default function Home() {
  const llm = useLLM();
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState("");
  const [pLanguage, setPLanguage] = useState("");
  const [showAnswers, setShowAnswers] = useState(false);
  const [activeTab, setActiveTab] = useState("Quiz");

  const { input, setInput, messages, sendMessage } = useChat({
    stream: true,
    initialMessages: [
      {
        role: "assistant",
        content:
          "I am a career counsellor, here to curate learning paths to meet your career goals in just 5 steps.",
      },
    ],
  });

  const handleQuiz = async() => {
    try {
      await llm.chat({
        messages: [
          {
            role: "system",
            content: `You're a certification prep planner bot for ${pLanguage}. Given a topic from Java, generate a list of MCQs for it, and evaluate the answers on demand. Keep it short and sweet.`,
          },
          { role: "user", content: `Topic: ${topic}` },
        ],
        stream: true,
        type: "json_object",
        onStream: ({ message }) => setResult(message.content),
      });
    } catch (error) {
      console.error("Something went wrong!", error);
    }
  }

  const handleExplore = async () => {

  }



  return (
    <Container fluid>
      <Row className="chatroom">
        <Row className="setBlock">
          <Row>
            <nav className="">
              <Row className="logo">Prep AI</Row>
              <ul className="navTabs">
                <li>
                  <button onClick={() => setActiveTab("Quiz")}>Quiz</button>
                </li>
                <li>
                  <button onClick={() => setActiveTab("Explore")}>
                    Explore
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab("Games")}>FlashCards</button>
                </li>
              </ul>
            </nav>
          </Row>
          {activeTab === "Quiz" && (
            <Quiz
              pLanguage={pLanguage}
              setPLanguage={setPLanguage}
              topic={topic}
              setTopic={setTopic}
              handleClick={handleQuiz}
              result={result}
            />
          )}
          {activeTab === "Explore" && (
            <Explore
              input = {input}
              setInput = {setInput}
              messages = {messages}
              sendMessage = {sendMessage}
            />
          )}
        </Row>
      </Row>
    </Container>
  );
}
