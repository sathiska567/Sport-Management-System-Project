import { React, useEffect, useState } from "react";
import "./PlayerProfile.css";
import PlayerSideBar from "../PlayerSideBar/PlayerSideBar";
import {
  Upload,
  Modal,
  Input,
  Button,
  DatePicker,
  InputNumber,
  message,
  Flex,
} from "antd";
import { PoweroffOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import axios from "axios";
import moment from "moment";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const PlayerProfile = () => {
  /*----------------------Profile Image upload-Start--------------------*/
  const [previewVisibleProfile, setPreviewVisibleProfile] = useState(false);
  const [previewImageProfile, setPreviewImageProfile] = useState("");
  const [fileListProfile, setFileListProfile] = useState([]);

  const [playerName, setPlayerName] = useState("");
  const [playerEmail, setPlayerEmail] = useState("");
  const [playerDateOfBirth, setPlayerDateOfBirth] = useState("");
  const [playerAge, setPlayerAge] = useState(0);
  const [playerId, setPlayerId] = useState("");
  const [formData, setFormData] = useState([]);
  const [NewfileList, setNewFileList] = useState([]);
  const [coverImageFileList, setCoverImageFileList] = useState([]);
  const [medicalReportFileList, setMedicalReportFileList] = useState([]);
  const [loadings, setLoadings] = useState([]);
  const [time, setTime] = useState(true);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [dateError, setDateError] = useState(false);
  const [ageError, setAgeError] = useState("");
  const [uploadError, setUploadError] = useState(false);

  // Name Validation
  const handlePlayerNameChange = (e) => {
    const name = e.target.value;
    setPlayerName(name);
    setNameError(name.trim() === "");
  };

  // Email Validation
  const handleEmailChange = (e) => {
    const email = e.target.value;
    setPlayerEmail(email);

    if (email.trim() === "") {
      setEmailError("Email cannot be empty");
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  // Birthdate Validation
  const handleDateChange = (date, dateString) => {
    setPlayerDateOfBirth(dateString);
    setDateError(dateString === "");
  };

  // Age Validation
  const handleAgeChange = (value) => {
    const age = value;
    setPlayerAge(age);

    if (!age) {
      setAgeError("Age cannot be empty");
    } else if (age < 16 || age > 70) {
      setAgeError("Invalid age. Age should be between 16 and 70");
    } else {
      setAgeError("");
    }
  };

  // Medical Report Validation
  // Medical Report validation
  const onUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    setUploadError(newFileList.length === 0);
  };

  // GET CURRENT USER DETAILS
  const currentUserData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v1/user/getCurrentUser",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // console.log(res.data.user._id);
      setPlayerId(res.data.user._id);
    } catch (error) {
      message.error("Error have inside the Get currentUserData function");
    }
  };

  const handleFormSubmit = async (index) => {
    console.log(
      playerId,
      playerName,
      playerEmail,
      playerDateOfBirth,
      playerAge,
      NewfileList,
      index
    );

    if (!playerName || !playerEmail || !playerDateOfBirth || !playerAge) {
      alert("Please Fill Required Fields!");
    } else {
      setLoadings((prevLoadings) => {
        // console.log(prevLoadings);
        const newLoadings = [...prevLoadings];
        newLoadings[index] = true;
        return newLoadings;
      });

      setTimeout(() => {
        setLoadings((prevLoadings) => {
          const newLoadings = [...prevLoadings];
          newLoadings[index] = false;
          return newLoadings;
        });
      }, 30000);

      if (NewfileList.length > 0) {
        const file = NewfileList[0].originFileObj;

        let formData = new FormData();
        formData.append("image", file);
        formData.append("playerId", playerId);

        try {
          // Upload profile image and get the response
          const imageUploadResponse = await axios.post(
            "http://localhost:8080/api/v1/profile/player-profile-image-upload",
            formData
          );
          console.log(imageUploadResponse.data.success);
          // Extract image URL from the response
          const imageUrl = imageUploadResponse.data.data.PlayerprofileImageLink;

          if (imageUploadResponse.data.success) {
            message.success(imageUploadResponse.data.message);
            // window.location.reload();
          }
        } catch (error) {
          message.error("Error occurred inside the handleFormSubmit function");
        }
      }

      try {
        // Check if coverImageFileList is not empty
        if (coverImageFileList.length > 0) {
          const coverImagefile = coverImageFileList[0].originFileObj;
          let coverImageFormData = new FormData();
          coverImageFormData.append("coverImage", coverImagefile);
          coverImageFormData.append("playerId", playerId);

          // // Log FormData for debugging (optional)
          // console.log([...coverImageFormData]);

          // Upload cover image
          const coverImageResponse = await axios.post(
            "http://localhost:8080/api/v1/profile/player-cover-image-upload",
            coverImageFormData
          );

          // Handle coverImageResponse if needed
          console.log(coverImageResponse.data);

          if (coverImageResponse.data.success) {
            message.success("Medical Report Image Upload successful");
            // window.location.reload();
          }
        } else {
          message.error("No Medical Report Image selected");
        }
      } catch (error) {
        // Log the error details (optional)
        console.error("Error uploading cover image:", error);

        message.error("Error uploading cover image");
      }

      // try {
      //   console.log(medicalReportFileList);

      //   if (medicalReportFileList.length > 0) {
      //     const medicalReportfile = medicalReportFileList[1].originFileObj;

      //     let medicalReportFormData = new FormData();
      //     medicalReportFormData.append("medicalReport", medicalReportfile);
      //     medicalReportFormData.append("playerId", playerId);

      //     // Log FormData for debugging (optional)
      //     console.log([...medicalReportFormData]);

      //     // Upload Medical report
      //     const coverImageResponse = await axios.post(
      //       "http://localhost:8080/api/v1/profile/player-medical-report-upload",
      //       medicalReportFormData
      //     );

      //     // Handle coverImageResponse if needed
      //     console.log(coverImageResponse.data);

      //     if (coverImageResponse.data.success) {
      //       message.success(coverImageResponse.data.message);
      //     }
      //   } else {
      //     message.error("No Medical Report selected");
      //   }
      // } catch (error) {
      //   message.error("Error uploading medical report");
      // }

      try {
        // Now, make a second API call to save player profile data with the image URL
        const playerProfileResponse = await axios.post(
          "http://localhost:8080/api/v1/profile/player-profile",
          {
            playerId: playerId,
            playerName: playerName,
            playerEmail: playerEmail,
            playerDateOfBirth: playerDateOfBirth,
            playerAge: playerAge,
            // PlayerprofileImageLink: imageUrl,
          }
        );

        // Handle response if needed
        console.log(playerProfileResponse.data);
        if (playerProfileResponse.data.success) {
          message.success(playerProfileResponse.data.message);
          // setTime(false)
          // window.location.reload();
        }
      } catch (error) {
        message.error("Error occurred inside the handleFormSubmit function");
      }
    }
  };

  useEffect(() => {
    currentUserData();
  }, []);

  const onChangeProfile = ({ fileList: newFileList }) => {
    // Update fileListProfile state with the new files
    setFileListProfile(newFileList);
  };

  const onPreviewProfile = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    setPreviewImageProfile(src);
    setPreviewVisibleProfile(true);
  };

  /*----------------------Profile Image upload-End--------------------*/

  /*----------------------Cover Image upload-Start--------------------*/
  const [previewVisibleCover, setPreviewVisibleCover] = useState(false);
  const [previewImageCover, setPreviewImageCover] = useState("");
  const [fileListCover, setFileListCover] = useState([]);

  const onChangeCover = ({ fileList: newFileList }) => {
    setFileListCover(newFileList);
    setCoverImageFileList(newFileList);
  };

  const onPreviewCover = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    setPreviewImageCover(src);
    setPreviewVisibleCover(true);
  };
  /*----------------------Cover Image upload-End--------------------*/

  /*----------------------Medical Image upload-Start--------------------*/
  const [fileList, setFileList] = useState([
    {
      uid: "1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);

  const onChange = ({ fileList: newFileList }) => {
    setMedicalReportFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  /*----------------------Medical Image upload-End--------------------*/

  return (
    <div>
      <PlayerSideBar>
        <div className="player-profile">
          <div className="ProfileHeader">
            <h3>My Profile</h3>
          </div>
          <div
            className="coachProfile"
            style={{ overflowX: "auto", height: "65vh" }}
          >
            <form className="playerProfileForm">
              <label className="formLabel">
                Name:
                <div>
                  <Input
                    type="text"
                    name="name"
                    className="inputBox"
                    onChange={handlePlayerNameChange}
                    allowClear
                  />
                  {nameError && (
                    <div
                      className="errorText"
                      style={{ fontSize: "13px", color: "red" }}
                    >
                      Name cannot be empty
                    </div>
                  )}
                </div>
              </label>

              <label className="formLabel">
                Email:
                <div>
                  <Input
                    type="email"
                    name="email"
                    className={`inputBox ${emailError ? "error" : ""}`}
                    onChange={handleEmailChange}
                    allowClear
                  />
                  {emailError && (
                    <div
                      className="errorText"
                      style={{ fontSize: "13px", color: "red" }}
                    >
                      {emailError}
                    </div>
                  )}
                </div>
              </label>

              <div className="AgeSection">
                <div>
                  <label className="formLabel">Date of Birth:</label>
                  <div>
                    <DatePicker
                      style={{
                        width: "400%",
                      }}
                      onChange={handleDateChange}
                      disabledDate={(current) => {
                        // Can not select days before today and today
                        return (
                          current &&
                          (current <
                            moment().endOf("day").subtract(35, "years") ||
                            current >
                              moment().endOf("day").subtract(16, "years"))
                        );
                      }}
                    />
                    {dateError && (
                      <div
                        className="errorText"
                        style={{
                          fontSize: "13px",
                          color: "red",
                          width: "150%",
                        }}
                      >
                        Date cannot be empty
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="formLabel">Age:</label>
                  <input
                    type="number"
                    onChange={(e) => handleAgeChange(e.target.value)}
                    style={{ width: "100%" }}
                  />
                  {ageError && (
                    <div
                      className="errorText"
                      style={{ fontSize: "13px", color: "red" }}
                    >
                      {ageError}
                    </div>
                  )}
                </div>
              </div>
              <div className="ImageUploading">
                <div>
                  <label className="formLabel">Profile Image:</label>
                  <Modal
                    visible={previewVisibleProfile}
                    footer={null}
                    onCancel={() => setPreviewVisibleProfile(false)}
                  >
                    <img
                      alt="example"
                      style={{ width: "100%" }}
                      src={previewImageProfile}
                    />
                  </Modal>
                  <ImgCrop rotationSlider>
                    <Upload
                      action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                      listType="picture-card"
                      fileList={fileListProfile} // Display the profile image files
                      onChange={onChangeProfile}
                      onPreview={onPreviewProfile}
                    >
                      {fileListProfile.length < 1 && "+ Upload"}
                    </Upload>
                  </ImgCrop>
                </div>

                <div>
                  <label className="formLabel">
                    Upload Medical Report Image:
                  </label>
                  <Modal
                    // visible={previewVisibleCover}
                    footer={null}
                    onCancel={() => setPreviewVisibleCover(true)}
                  >
                    <img
                      alt="example"
                      style={{ width: "100%" }}
                      // src={previewImageCover}
                    />
                  </Modal>
                  <ImgCrop rotationSlider>
                    <Upload
                      // style={{}}
                      // action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                      listType="picture-card"
                      fileList={fileListCover}
                      onChange={onChangeCover}
                      // onPreview={onPreviewCover}
                    >
                      {fileListCover.length < 1 && "+ Upload"}
                    </Upload>
                  </ImgCrop>
                </div>

                {/* <div>
                  <label className="formLabel">Upload Medical Reports:</label>
                  <div>
                    <Upload
                      action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                      listType="picture-card"
                      fileList={fileList}
                      onChange={onUploadChange}
                    >
                      {fileList.length < 5 && "+ Upload"}
                    </Upload>
                    {uploadError && (
                      <div
                        className="errorText"
                        style={{ fontSize: "13px", color: "red" }}
                      >
                        At least one image must be uploaded
                      </div>
                    )}
                  </div>
                </div> */}
              </div>
              <br />
              <Button
                className="submitBtn"
                loading={loadings[0]}
                type="ghost"
                onClick={() => handleFormSubmit(0)}
              >
                Submit
              </Button>

              {/* <Button type="primary" loading={loadings[0]} onClick={() => enterLoading(0)}>
                Click me!
              </Button> */}
            </form>
          </div>
        </div>
      </PlayerSideBar>
    </div>
  );
};

export default PlayerProfile;
