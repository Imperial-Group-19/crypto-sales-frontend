import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Button, ListGroup, Modal } from "react-bootstrap";

export default function Headline() {
  // Modal which will become active after clicking Buy Now.
  // It shows a window with 3 options: upsell, downsell or buy the product that was originally selected:
  const [showModalBuy, setShowModalBuy] = useState(false);

  return (
    <Container style={{ width: "60%" }}>
      <br></br>
      <h1 className="display-1" style={{ textAlign: "center" }}>
        C++ Course Basic
      </h1>
      <hr></hr>
      {/* <br></br>
      <Link to="/payment" style={{ textDecoration: "none" }}>
        <div className="centered">
          <Button variant="outline-secondary" className="buy_button_big font-effect-fire-animation">
            Buy Now
          </Button>
          <p className="hand_written">
            Haven't decided yet? Not Sure if the product is perfect fit for you? No worries, keep reading.
          </p>
        </div>
      </Link> */}
      <br></br>
      <h1
        className="display-2"
        style={{ textAlign: "center", fontSize: "40px" }}
      >
        Description
      </h1>
      <br></br>
      <p className="lead">
        This course teaches you ins and outs about the C++ programming language
        , which has been used for building some of the world's most popular and
        innovative software. No prior knowledge is required and you will learn
        the basics in a relaxed environment. You will create several projects,
        using C++11, to achieve end user GUI and software development
        requirements. Once you finish this course, you will be familiar with
        some of the features used in developing GUI applications. Learn how to
        follow the commands, write code in C++ and implement the functionality
        using the IDL.
      </p>
      <p className="lead">
        You need to understand the different programming languages used in C++.
        It is very important for you to learn these different languages to have
        a thorough understanding of the language. There are two programming
        languages you can learn for C++, either C++ or C. You can choose to
        learn these languages as an intro course before you start learning about
        C++ programming.
      </p>
      <p className="lead">
        This course was designed for you to become acquainted with the concepts
        and features of the C++ programming language. It uses clear and concise
        explanations to explain the best way to develop and optimize the code
        using the C++ standard library. The course teaches you the difference
        between the categories of types, such as int and double. Learn how to
        compare types of values, as well as how to work with list and sequence
        types.
      </p>
      <p className="lead">
        This course teaches C++ programming with dynamic, imperative, and
        object-oriented approaches. Programming concepts are emphasized.
        Starting from basic topics and moving to more advanced ones, this course
        runs from about 2.5 hours to 6 hours for Microsoft Windows and C++7
        support, from about 3 hours to 6 hours for Linux, or less than one hour
        for the Internet, with a library preferred. This course aims at an
        intermediate level of knowledge in both C++ and C. Topics covered in
        this course cover not only the functional aspects of C++ but also the
        procedural, extensible aspects. Depending on the license of the course,
        also computer security, system programming, and database programming may
        be covered. All these courses are taught by computer science professor
        André Begemann and are available from his website. This course is taught
        with both the help of webcams and in person. Courses are live-taped and
        are offered from Monday to Thursday. This course focuses on database
        programming in C++ and SQL, and covers topics
      </p>
      <p className="lead">
        The solution to world hunger must begin with the democratization of
        farming. That means loosening the stranglehold that organized money
        holds over food production. According to a recent Oxfam report, more
        than half of the farming revenue in the United States comes from the
        state commodity programs, which are designed to feed consumers with
        limited budgets. These same programs are incentivizing the preservation
        of farmland rather than farming it, because they provide modest payments
        to farmers for keeping land vacant and saving seed, for example. Under
        such circumstances, it's far easier for factory farmers to keep profits
        high and for smaller farms to fold under pressure. Surprisingly, the
        last few years have seen small-scale farming receive positive attention
        from the Obama administration. The White House has championed small
        businesses as key engines of economic growth and invested in community
        gardens, which can create jobs and sustainable jobs.
      </p>

      <h1 className="display-2" style={{ textAlign: "center" }}>
        Features
      </h1>
      <br></br>

      <ListGroup as="ol" numbered className="normal_text">
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold">Variable Naming - Best conventions</div>
            Best Convention for naming variables: ConFoo Best SudoJS demo: “Keep
            Calm and parse a new app” The other winners are as follows: –
            Project of the Year: Backbone.js – Most Responsive Website:
            WordPress.com – Most Innovative Project: Cinder App Engine – Top New
            Backbone library: Mock.js – Top New Ruby library:
          </div>
        </ListGroup.Item>
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold">Memory Management</div>
            C++ pointers are hard to understand and to apply in practice. This
            course contain a hands-on example and bext practice guide so memory
            leaks and seg faults are a thing of the past.
          </div>
        </ListGroup.Item>
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold">Integration to banking</div>
            Best Convention for naming variables: ConFoo Best SudoJS demo: “Keep
            Calm and parse a new app” The other winners are as follows: –
            Project of the Year: Backbone.js – Most Responsive Website:
            WordPress.com – Most Innovative Project: Cinder App Engine – Top New
            Backbone library: Mock.js – Top New Ruby library:
          </div>
        </ListGroup.Item>
      </ListGroup>
      <br></br>
      {/* <Link to="/payment" style={{ textDecoration: "none" }}> */}
      <div className="centered">
        <Button
          variant="outline-secondary"
          className="buy_button_big font-effect-fire-animation"
          onClick={() => setShowModalBuy(true)}
        >
          Buy Now
        </Button>
      </div>
      {/* </Link> */}
      <br></br>
      <Modal show={showModalBuy} backdrop="static">
        <Modal.Body>
          <p>You are currently buying the basic C++ course for 15 Matic</p>
          <p>
            Are you interested in an updated version of this product? It is
            called C++ Course Delux and for just 35 Matic, you get extra 2
            features.
          </p>
          <Link to="/payment" style={{ textDecoration: "none" }}>
            <div className="centered">
              <Button variant="outline-secondary">
                Yes, buy C++ Course Delux for 35 Matic
              </Button>
            </div>
          </Link>
          <br></br>
          <Link to="/payment" style={{ textDecoration: "none" }}>
            <div className="centered">
              <Button variant="outline-secondary">
                No, buy C++ Course Basic for 15 Matic
              </Button>
            </div>
          </Link>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
