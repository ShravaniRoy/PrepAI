"use client";

import { Input, Button, Form, FormGroup, Col, Container, Row } from 'reactstrap';
import Markdown from 'react-markdown';

const Explore = (props) => {
  const { input, setInput, messages, sendMessage } = props;
    return (
        <Row>
        <Row className='chatWrapper'>
          <div className='messagesW'>
            {messages.map((message, idx) => (
                <div className="my-4" key={idx}>
                  <div className="role">
                    {message.role}
                  </div>
                  <div className="msg">
                    <Markdown>
                      {message.content}
                    </Markdown>
                  </div>
                </div>
              ))}
              </div>
          <Form> 
            <FormGroup row>
              <Col sm={40}> 
                <div>
                  <Input
                    className="llminput"
                    placeholder="Start by giving a career goal"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && !event.shiftKey) {
                        event.preventDefault();
                        sendMessage();
                      }
                    }}
                  />
                  <Button
                    onClick={sendMessage}
                    className=""
                  >
                    Send
                  </Button>
                </div>
              </Col>
            </FormGroup>
          
          </Form>
        </Row>
        </Row>
    )
}

export default Explore;