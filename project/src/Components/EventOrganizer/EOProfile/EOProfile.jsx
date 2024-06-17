import { React, useEffect, useState } from "react";
import "./EOProfile.css";
import EOSizeBar from "../EOSideBar/EOSideBar";
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

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const EOProfile = () => {
  /*----------------------Profile Image upload-Start--------------------*/
  const [previewVisibleProfile, setPreviewVisibleProfile] = useState(false);
  const [previewImageProfile, setPreviewImageProfile] = useState("");
  const [fileListProfile, setFileListProfile] = useState([]);
  const [eventOrganizerName, seteventOrganizerName] = useState("");
  const [eventOrganizerEmail, seteventOrganizerEmail] = useState("");
  const [eventOrganizerDateOfBirth, seteventOrganizerDateOfBirth] =
    useState("");
  const [eventOrganizerAge, seteventOrganizerAge] = useState(0);
  const [eventOrganizerId, seteventOrganizerId] = useState("");
  const [formData, setFormData] = useState([]);
  const [NewfileList, setNewFileList] = useState([]);
  const [coverImageFileList, setCoverImageFileList] = useState([]);
  const [medicalReportFileList, setMedicalReportFileList] = useState([]);
  const [loadings, setLoadings] = useState([]);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [dateError, setDateError] = useState(false);
  const [ageError, setAgeError] = useState("");

  // Name Validation
  const handleNameChange = (e) => {
    const name = e.target.value;
    seteventOrganizerName(name);
    setNameError(name.trim() === "");
  };

  // Email Validation
  const handleEmailChange = (e) => {
    const email = e.target.value;
    seteventOrganizerEmail(email);

    if (email.trim() === "") {
      setEmailError("Email cannot be empty");
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  // Birth Day validation
  const handleDateChange = (date, dateString) => {
    seteventOrganizerDateOfBirth(dateString);
    setDateError(dateString === "");
  };

  // Age Validation
  const handleAgeChange = (e) => {
    const age = e.target.value;
    seteventOrganizerAge(age);

    if (age.trim() === "") {
      setAgeError("Age cannot be empty");
    } else if (age < 18 || age > 40) {
      setAgeError("Age must be between 18 and 40");
    } else {
      setAgeError("");
    }
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
      seteventOrganizerId(res.data.user._id);
    } catch (error) {
      message.error("Error have inside the Get currentUserData function");
    }
  };

  const handleFormSubmit = async (index) => {
    console.log(
      eventOrganizerId,
      eventOrganizerName,
      eventOrganizerEmail,
      eventOrganizerDateOfBirth,
      eventOrganizerAge,
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
      formData.append("eventOrganizerId", eventOrganizerId);

      try {
        // Upload profile image and get the response
        const imageUploadResponse = await axios.post(
          "http://localhost:8080/api/v1/profile/eventOrganizer-profile-image-upload",
          formData
        );
        console.log(imageUploadResponse.data.success);
        // Extract image URL from the response
        const imageUrl =
          imageUploadResponse.data.data.eventOrganizerprofileImageLink;

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
        coverImageFormData.append("eventOrganizerId", eventOrganizerId);

        // // Log FormData for debugging (optional)
        // console.log([...coverImageFormData]);

        // Upload cover image
        const coverImageResponse = await axios.post(
          "http://localhost:8080/api/v1/profile/eventOrganizer-cover-image-upload",
          coverImageFormData
        );

        // Handle coverImageResponse if needed
        console.log(coverImageResponse.data);

        if (coverImageResponse.data.success) {
          message.success(coverImageResponse.data.message);
          // window.location.reload();
        }
      } else {
        message.error("No cover image selected");
      }
    } catch (error) {
      // Log the error details (optional)
      console.error("Error uploading cover image:", error);

      message.error("Error uploading cover image");
    }

    try {
      // Now, make a second API call to save eventOrganizer profile data with the image URL
      const eventOrganizerProfileResponse = await axios.post(
        "http://localhost:8080/api/v1/profile/eventOrganizer-profile",
        {
          eventOrganizerId: eventOrganizerId,
          eventOrganizerName: eventOrganizerName,
          eventOrganizerEmail: eventOrganizerEmail,
          eventOrganizerDateOfBirth: eventOrganizerDateOfBirth,
          eventOrganizerAge: eventOrganizerAge,
          // eventOrganizerprofileImageLink: imageUrl,
        }
      );

      // Handle response if needed
      console.log(eventOrganizerProfileResponse.data);
      if (eventOrganizerProfileResponse.data.success) {
        message.success(eventOrganizerProfileResponse.data.message);
        window.location.reload();
      }
    } catch (error) {
      message.error("Error occurred inside the handleFormSubmit function");
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

  // /*----------------------Medical Image upload-Start--------------------*/
  // const [fileList, setFileList] = useState([
  //   {
  //     uid: "1",
  //     name: "image.png",
  //     status: "done",
  //     url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  //   },
  // ]);
  // const onChange = ({ fileList: newFileList }) => {
  //   setMedicalReportFileList(newFileList);
  // };

  // const onPreview = async (file) => {
  //   let src = file.url;
  //   if (!src) {
  //     src = await new Promise((resolve) => {
  //       const reader = new FileReader();
  //       reader.readAsDataURL(file.originFileObj);
  //       reader.onload = () => resolve(reader.result);
  //     });
  //   }
  //   const image = new Image();
  //   image.src = src;
  //   const imgWindow = window.open(src);
  //   imgWindow?.document.write(image.outerHTML);
  // };
  // /*----------------------Medical Image upload-End--------------------*/

  return (
    <div>
      <EOSizeBar>
        <div className="EO-profile">
          <div className="ProfileHeader">
            <h3>My Profile</h3>
          </div>
          <div style={{ overflowX: "auto", height: "65vh" }}>
            <form className="EOProfileForm">
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
                      className="error"
                      style={{ fontSize: "13px", color: "red" }}
                    >
                      Name cannot be empty!
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
                      className="error"
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
                    />
                    {dateError && (
                      <div
                        className="error"
                        style={{ fontSize: "13px", color: "red" }}
                      >
                        Birth Day cannot be empty
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="formLabel">Age:</label>
                  <div>
                    <Input type="number" onChange={handleAgeChange} />
                    {ageError && (
                      <div
                        className="error"
                        style={{ fontSize: "13px", color: "red" }}
                      >
                        {ageError}
                      </div>
                    )}
                  </div>
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
                {/* <div>
                  <label className="formLabel">Upload Medical Reports:</label>
                  <Upload
                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                    listType="picture-card"
                    fileList={fileList}
                    onChange={onChange}
                    onPreview={onPreview}
                  >
                    {fileList.length < 5 && "+ Upload"}
                  </Upload>
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
      </EOSizeBar>
    </div>
  );
};

export default EOProfile;
