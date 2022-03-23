import React from "react";
import { Redirect } from "react-router-dom";

const Home = ({ triviaId, isHost, playerName, pin }) => {
  if (triviaId && pin && playerName) {
    if (isHost) {
      return <Redirect to={{ pathname: "/host/lobby", state: pin }} />;
    } else {
      return (
        <Redirect to={{ pathname: "/user/lobby", state: [playerName, pin] }} />
      );
    }
  } else {
    return (
      <React.Fragment>
        <body className="">
          <header className="masthead text-white text-center">
            <div className="container d-flex align-items-center flex-column">
              <h1 className="masthead-heading text-uppercase mb-0">
                {triviaId ? "Loading..." : "Something went wrong"}
              </h1>
            </div>
          </header>
        </body>
      </React.Fragment>
    );
  }
};

export default Home;
