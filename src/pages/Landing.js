import React from "react";
//import Button from 'react-bootstrap/Button';

const Landing = () => {
    return (
        <div id="site-container">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"></link>
            <header id="site-header">
                <div class="container-fluid">
                    <ul class="m-3 nav">
                        <li class="nav-item">
                            <a class="nav-link text-dark bg-light" href="landing">
                                <h1>Super C++ course maker inc.</h1>
                            </a>
                        </li>
                        <li class="ms-auto nav-item">
                            <a class="btn btn-outline-secondary" href="payment" role="button">Buy Now</a>
                        </li>
                    </ul>
                </div>
            </header>
            <main id="site-content">
                <div class="m-3 bg-light container-fluid">
                    <h1>When you get our C++ course, <br></br>
                        you will code like a profesional in no time.
                    </h1>
                    <section>
                        <h2>Product description:</h2>
                        <ul>
                            <li>a</li>
                            <li>b</li>
                            <li>c</li>
                            <li>d</li>
                        </ul>
                    </section>
                    <section>
                        <a class="btn btn-warning" href="payment" role="button">Buy Now</a>
                    </section>
                </div>
            </main>
            <footer id="site-footer">
                <p>
                    Full disclamer: There is no guarantee that this product will make you profession in C++.
                    We cannot be held responsible for fucked-up exam or failed job interview. 
                </p>
                <p>All rights reserved</p>
            </footer>
        </div>
    );
};

export default Landing;