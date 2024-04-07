// Import necessary libraries and components
import { useState, useEffect } from "react";
import CoachSidebar from "../CoachSidebar/CoachSidebar";
import "./CoachReviewForm.css";
import { Form, Input, Rate, message } from "antd";
import { CloseSquareOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

// Destructure TextArea from Input
const { TextArea } = Input;

// Define CoachReviewForm component
const CoachReviewForm = () => {
  // Define state variables for each rating
  const [battingRating, setBattingRating] = useState(0);
  const [bowlingRating, setBowlingRating] = useState(0);
  const [fieldingRating, setFieldingRating] = useState(0);
  const [overallRating, setOverallRating] = useState(0);
  const [comments, setComments] = useState("");
  const [reviewGivenCoachId,setReviewGivenCoachId] = useState("");
  const [reviewGivenCoachEmail , setReviewGivenCoachEmail] = useState("");
  const [reviewGivenCoachName , setReviewGivenCoachName] = useState("");
  const location = useLocation();
  const navigate = useNavigate();


  console.log(location);


  //GET CURRENT USER DATA
  const currentUserData = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/user/getCurrentUser",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(res);
    if(res.data.success){
      // message.success("Successfully get current user data");
      setReviewGivenCoachId(res.data.user._id)
      setReviewGivenCoachEmail(res.data.user.email)
      setReviewGivenCoachName(res.data.user.username)
      
    } 

    } catch (error) {
      message.error("Error have inside the Get currentUserData function");
    }
  };


  // Use useEffect to update overallRating whenever any of the other ratings change
  useEffect(() => {
    currentUserData()
    const newOverallRating =
      (battingRating + bowlingRating + fieldingRating) / 3;
    setOverallRating(newOverallRating);
  }, [battingRating, bowlingRating, fieldingRating]);



const handleReviewSection = async()=>{
    const formattedRating  = Number(overallRating.toFixed(1))
    const id = location.state.id;
    console.log(battingRating,bowlingRating,fieldingRating,formattedRating,comments);

     try {
      const response = await axios.post('http://localhost:8080/api/v1/review/create-review',{battingReview:battingRating,bowlingReview:bowlingRating,fieldingReview:fieldingRating,overallReview:formattedRating,comment:comments,playerId:id,reviewGivenCoachId:reviewGivenCoachId,reviewGivenCoachEmail:reviewGivenCoachEmail,reviewGivenCoachName:reviewGivenCoachName})
      console.log(response);

      if(response.data.success){
        message.success(response.data.message);
        navigate("/coach-review-players",{state:{overallRating:overallRating}})        
      }
     
     } catch (error) {
        message.error('Error creating review');
     }

  }


  // Render the form
  return (
    <div>
      <CoachSidebar>
        <Form
          style={{
            margin: "auto",
            width: "100%",
          }}
          layout="verticle"
        >
          <div className="CoachReviewForm">
            <div
              style={{
                backgroundColor: "#15295E",
              }}
              className="CoachReviewFormHeader"
            >
              <h3
                style={{
                  color: "white",
                  letterSpacing: "1px",
                  fontWeight: "500",
                }}
              >
                Name of the Player
              </h3>
              <a href="/coach-review-players">
                <CloseSquareOutlined
                  style={{
                    color: "#ff4d4f",
                    fontSize: "20px",
                    marginRight: "15%",
                  }}
                />
              </a>
            </div>

            <div
              style={{
                backgroundColor: "white",
                padding: "50px",
              }}
              className="CoachReviewFormApplication"
            >
              <div className="InputData">
                {/* Render rating inputs for each category */}
                <div className="DataIem">
                  <label htmlFor="batting">Batting:</label>
                  <Rate
                    className="review"
                    allowHalf
                    defaultValue={battingRating}
                    onChange={setBattingRating}
                  />
                  <span className="ratingValue">
                    {battingRating.toFixed(1)} / 5.0
                  </span>
                </div>

                <div className="DataIem">
                  <label htmlFor="bowling">Bowling:</label>
                  <Rate
                    className="review"
                    allowHalf
                    defaultValue={bowlingRating}
                    onChange={setBowlingRating}
                  />
                  <span className="ratingValue">
                    {bowlingRating.toFixed(1)} / 5.0
                  </span>
                </div>

                <div className="DataIem">
                  <label htmlFor="fielding">Fielding:</label>
                  <Rate
                    className="review"
                    allowHalf
                    defaultValue={fieldingRating}
                    onChange={setFieldingRating}
                  />
                  <span className="ratingValue">
                    {fieldingRating.toFixed(1)} / 5.0
                  </span>
                </div>

                <div className="DataIem">
                  <label htmlFor="overall">Overall:</label>
                  <Rate
                    className="review"
                    allowHalf
                    value={overallRating}
                    disabled
                  />
                  <span className="ratingValue">
                    {overallRating.toFixed(1)} / 5.0
                  </span>
                </div>

                {/* Render comment input */}
                <div className="DataIem">
                  <label htmlFor="comment">Comment:</label>
                  <TextArea
                    className="Comment"
                    placeholder="Enter the comment"
                    autoSize={{ minRows: 3, maxRows: 5 }}
                    onChange={(e) => setComments(e.target.value)}
                  />
                </div>

                {/* Render submit button */}
                <div className="buttonSet">
                  <div>
                    <button
                      className="approve CoachReviewBTn"
                      style={{ backgroundColor: "#52c41a", width: "80px" }}
                      onClick={handleReviewSection}
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </CoachSidebar>
    </div>
  );
};

// Export CoachReviewForm component
export default CoachReviewForm;
