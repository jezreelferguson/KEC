import React from 'react'

const Team = () => {
  return (
    <>
     
 {/* <!-- Team Section --> */}
    <section id="team" className="team section light-background">

      {/* <!-- Section Title --> */}
      <div className="container section-title" data-aos="fade-up">
        <h2>Team</h2>
        <p>CHECK OUR TEAM</p>
      </div>
      {/* <!-- End Section Title --> */}

      <div className="container">

        <div className="row gy-5">

          <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
            <div className="member">
              <div className="pic"><img src="" className="img-fluid" alt=""/></div>
              <div className="member-info">
                <h4>Walter White</h4>
                <span>Chief Executive Officer</span>
                <div className="social">
                  <a href=""><i className="bi bi-twitter-x"></i></a>
                  <a href=""><i className="bi bi-facebook"></i></a>
                  <a href=""><i className="bi bi-instagram"></i></a>
                  <a href=""><i className="bi bi-linkedin"></i></a>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- End Team Member --> */}

          <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
            <div className="member">
              <div className="pic"><img src="" className="img-fluid" alt=""/></div>
              <div className="member-info">
                <h4>Sarah Jhonson</h4>
                <span>Product Manager</span>
                <div className="social">
                  <a href=""><i className="bi bi-twitter-x"></i></a>
                  <a href=""><i className="bi bi-facebook"></i></a>
                  <a href=""><i className="bi bi-instagram"></i></a>
                  <a href=""><i className="bi bi-linkedin"></i></a>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- End Team Member --> */}

          <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="300">
            <div className="member">
              <div className="pic"><img src="" className="img-fluid" alt=""/></div>
              <div className="member-info">
                <h4>William Anderson</h4>
                <span>CTO</span>
                <div className="social">
                  <a href=""><i className="bi bi-twitter-x"></i></a>
                  <a href=""><i className="bi bi-facebook"></i></a>
                  <a href=""><i className="bi bi-instagram"></i></a>
                  <a href=""><i className="bi bi-linkedin"></i></a>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- End Team Member --> */}

        </div>

      </div>

    </section>
    {/* <!-- /Team Section --> */}
    </>
  )
}

export default Team
