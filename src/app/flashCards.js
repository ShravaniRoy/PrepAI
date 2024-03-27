"use client";

import { Input, Button, Form, FormGroup, Col, Container, Row } from 'reactstrap';
import Markdown from 'react-markdown';
const Quiz = (props) => {
    const { pLanguage, setPLanguage, topic, setTopic, handleClick, result } = props;
    return (
        <Row>
        <Row>
          <Form>
            <FormGroup row>
              <Col>
                  <Input
                    value={pLanguage}
                    onChange={(e) => setPLanguage(e.target.value)}
                    placeholder="Enter a Programming Language"
                    className='llminput'
                  />
              </Col>
            </FormGroup>
            {pLanguage !== "" &&
            <FormGroup row>
              <Col sm={40}> 
                <div>
                  <Input
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Enter a topic from Java"
                    className='llminput'
                  />
                  <Button
                    onClick={handleClick}
                    className="btn llminput"
                  >
                    Submit
                  </Button>
                </div>
              </Col>
            </FormGroup>
          }
          </Form>
        </Row>
        <Row>
          <Markdown>
            {result}
          </Markdown>
        </Row>
        </Row>
    )
}

export default Quiz;