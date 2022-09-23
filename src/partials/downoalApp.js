import { Jumbotron } from "../components";


 const DownloadApp=()=>{
    return(
        <div class="text-center">
        <h2 class="text-uppercase">Download App</h2>

        <div class="buttons row-cols-1 justify-content-center mt-3">
          <div class="col">
            <button class="btn btn-dark app-button mb-2 col-lg-6 col-md-9  col-sm-9">
              <Jumbotron.Icon>
                {" "}
                <i class="fa fa-apple fa-2x"></i>
              </Jumbotron.Icon>
              <span class="text-uppercase ml-2">Apple store</span>
            </button>
          </div>
          <div class="col">
            <button class="btn btn-dark app-button mb-2 col-lg-6 col-md-9  col-sm-9">
              <Jumbotron.Icon>
                {" "}
                <i class="fa fa-play fa-2x"></i>
              </Jumbotron.Icon>
              <span class="text-uppercase ml-2">Google store</span>
            </button>
          </div>
        </div>
      </div>
    )
}

export default DownloadApp;