import { React, useEffect, useState } from "react";
import "./RefereeProfile.css";
import RefereeSideBar from "../RefereeSideBar/RefereeSideBar";
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
import moment from "moment";
import ImgCrop from "antd-img-crop";
import axios from "axios";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const RefereeProfile = () => {
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
  const [loadings, setLoadings] = useState([]);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [dateError, setDateError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [uploadError, setUploadError] = useState(false);

  // Name validation
  const handleNameChange = (e) => {
    const name = e.target.value;
    setPlayerName(name);

    if (!name) {
      setNameError("Name cannot be empty");
    } else {
      setNameError("");
    }
  };

  // Email validation
  const handleEmailChange = (e) => {
    const email = e.target.value;
    setPlayerEmail(email);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setEmailError("Email cannot be empty");
    } else if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  // Date of birth validation
  const handleDateChange = (date, dateString) => {
    setPlayerDateOfBirth(dateString);

    if (!date) {
      setDateError("Date cannot be empty");
    } else {
      setDateError("");
    }
  };

  const disabledDate = (current) => {
    // Can not select days before today and more than 60 years ago and less than 18 years ago
    return (
      current > moment().endOf("day") ||
      current < moment().endOf("day").subtract(60, "years") ||
      current > moment().endOf("day").subtract(18, "years")
    );
  };

  // Age validation
  const handleAgeChange = (value) => {
    const age = value;

    if (!age) {
      setAgeError("Age cannot be empty");
    } else if (age < 8 || age > 60) {
      setAgeError("Invalid age. Age should be between 18 and 60");
    } else {
      setAgeError("");
    }
  };

  // Medical Upload  reports validation
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

    setLoadings((prevLoadings) => {
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
    }, 20000);

    if (NewfileList.length > 0) {
      const file = NewfileList[0].originFileObj;

      let formData = new FormData();
      formData.append("image", file);
      formData.append("playerId", playerId);

      try {
        // Upload image and get the response
        const imageUploadResponse = await axios.post(
          "http://localhost:8080/api/v1/profile/player-profile-image-upload",
          formData
        );

        console.log(imageUploadResponse.data.success);

        // Extract image URL from the response
        const imageUrl = imageUploadResponse.data.data.PlayerprofileImageLink;

        // Now, make a second API call to save player profile data with the image URL
        const playerProfileResponse = await axios.post(
          "http://localhost:8080/api/v1/profile/player-profile",
          {
            playerId: playerId,
            playerName: playerName,
            playerEmail: playerEmail,
            playerDateOfBirth: playerDateOfBirth,
            playerAge: playerAge,
            PlayerprofileImageLink: imageUrl,
          }
        );

        // Handle response if needed
        console.log(playerProfileResponse.data);
      } catch (error) {
        message.error("Error occurred inside the handleFormSubmit function");
      }
    }
  };

  useEffect(() => {
    currentUserData();
  }, []);

  const onChangeProfile = async ({ fileList: newFileList }) => {
    console.log(newFileList);
    setNewFileList(newFileList);
  };

  // const onChangeProfile = ({ fileList: newFileList }) => {
  //   console.log(newFileList[0].originFileObj);
  //   const file = newFileList
  //   let formData = new FormData();

  //   formData.append("image", file);

  //   console.log([...formData]);

  //   setFileListProfile(newFileList);

  // };

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
    setFileList(newFileList);
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
      <RefereeSideBar>
        <div className="referee-profile">
          <div className="ProfileHeader">
            <h3>My Profile</h3>
          </div>
          <div style={{ overflowX: "auto", height: "65vh" }}>
            <form className="refereeProfileForm">
              <label className="formLabel">
                Name:
                <div>
                  <Input
                    type="text"
                    name="name"
                    className="inputBox"
                    onChange={handleNameChange}
                    allowClear
                  />
                  {nameError && (
                    <div
                      className="errorText"
                      style={{ fontSize: "13px", color: "red" }}
                    >
                      {nameError}
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
                    className="inputBox"
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
                        width: "350%",
                      }}
                      onChange={handleDateChange}
                      disabledDate={disabledDate}
                    />
                    {dateError && (
                      <div
                        className="errorText"
                        style={{ fontSize: "13px", color: "red" }}
                      >
                        {dateError}
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="formLabel">Age:</label>
                  <InputNumber
                    type="number"
                    onChange={handleAgeChange}
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
                    // onChange={hanldeProfileImageUpload}
                  >
                    <img
                      alt="example"
                      style={{
                        width: "100%",
                      }}
                      src={previewImageProfile}
                    />
                  </Modal>
                  <ImgCrop rotationSlider>
                    <Upload
                      style={{}}
                      action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                      listType="picture-card"
                      fileList={fileListProfile}
                      onChange={onChangeProfile}
                      onPreview={onPreviewProfile}
                    >
                      {fileListProfile.length < 1 && "+ Upload"}
                    </Upload>
                  </ImgCrop>
                </div>
                <div>
                  <label className="formLabel">Cover Image:</label>
                  <Modal
                    visible={previewVisibleCover}
                    footer={null}
                    onCancel={() => setPreviewVisibleCover(false)}
                  >
                    <img
                      alt="example"
                      style={{ width: "100%" }}
                      src={previewImageCover}
                    />
                  </Modal>
                  <ImgCrop rotationSlider>
                    <Upload
                      action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                      listType="picture-card"
                      fileList={fileListCover}
                      onChange={onChangeCover}
                      onPreview={onPreviewCover}
                    >
                      {fileListCover.length < 1 && "+ Upload"}
                    </Upload>
                  </ImgCrop>
                </div>
                <div>
                  <label className="formLabel">Upload Medical Reports:</label>
                  <div>
                    <Upload
                      action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                      listType="picture-card"
                      fileList={fileList}
                      onChange={onUploadChange}
                      onPreview={onPreview}
                    >
                      {fileList.length < 5 && "+ Upload"}
                    </Upload>
                    {uploadError && (
                      <div
                        className="error"
                        style={{ fontSize: "13px", color: "red" }}
                      >
                        At least one image must be uploaded
                      </div>
                    )}
                  </div>
                </div>
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
      </RefereeSideBar>
    </div>
  );
};

export default RefereeProfile;
