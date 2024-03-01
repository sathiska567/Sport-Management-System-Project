import { React, useEffect, useState } from "react";
import "./CoachProfile.css";
import CoachSideBar from "../CoachSidebar/CoachSidebar";
import {
  Upload,
  Modal,
  Input,
  Button,
  DatePicker,
  InputNumber,
  message,

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

const CoachProfile = () => {
  /*----------------------Profile Image upload-Start--------------------*/
  const [previewVisibleProfile, setPreviewVisibleProfile] = useState(false);
  const [previewImageProfile, setPreviewImageProfile] = useState("");
  const [fileListProfile, setFileListProfile] = useState([]);

  const [coachName, setcoachName] = useState("")
  const [coachEmail, setcoachEmail] = useState("")
  const [coachDateOfBirth, setcoachDateOfBirth] = useState("")
  const [coachAge, setcoachAge] = useState(0)
  const [coachId, setcoachId] = useState("")
  const [formData, setFormData] = useState([])


  const [NewfileList, setNewFileList] = useState([])
  const [coverImageFileList, setCoverImageFileList] = useState([]);
  const [medicalReportFileList, setMedicalReportFileList] = useState([]);

  const [loadings, setLoadings] = useState([]);

  // GET CURRENT USER DETAILS
  const currentUserData = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/user/getCurrentUser",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // console.log(res.data.user._id);
      setcoachId(res.data.user._id)


    } catch (error) {
      message.error("Error have inside the Get currentUserData function");
    }
  };


const handleFormSubmit = async (index) => {
    console.log(coachId, coachName, coachEmail, coachDateOfBirth, coachAge, NewfileList, index);

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
      formData.append("coachId", coachId);

      try {
        // Upload profile image and get the response
        const imageUploadResponse = await axios.post("http://localhost:8080/api/v1/profile/coach-profile-image-upload", formData);
        console.log(imageUploadResponse.data.success);
        // Extract image URL from the response
        const imageUrl = imageUploadResponse.data.data.coachprofileImageLink;

        if (imageUploadResponse.data.success) {
          message.success(imageUploadResponse.data.message)
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
        coverImageFormData.append("coachId", coachId);

        // // Log FormData for debugging (optional)
        // console.log([...coverImageFormData]);

        // Upload cover image
        const coverImageResponse = await axios.post("http://localhost:8080/api/v1/profile/coach-cover-image-upload", coverImageFormData);

        // Handle coverImageResponse if needed
        console.log(coverImageResponse.data);

        if (coverImageResponse.data.success) {
          message.success(coverImageResponse.data.message)
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
      console.log(medicalReportFileList);

      if (medicalReportFileList.length > 0) {
        const medicalReportfile = medicalReportFileList[1].originFileObj;

        let medicalReportFormData = new FormData();
        medicalReportFormData.append("medicalReport", medicalReportfile);
        medicalReportFormData.append("coachId", coachId);

        // Log FormData for debugging (optional)
        console.log([...medicalReportFormData]);

        // Upload Medical report
        const coverImageResponse = await axios.post("http://localhost:8080/api/v1/profile/coach-medical-report-upload", medicalReportFormData);

        // Handle coverImageResponse if needed
        console.log(coverImageResponse.data);

        if(coverImageResponse.data.success){
          message.success(coverImageResponse.data.message)
        }

      } else {
        message.error("No cover image selected");
      }
    } catch (error) {
      message.error("Error uploading medical report");
    }



    try {
      // Now, make a second API call to save coach profile data with the image URL
      const coachProfileResponse = await axios.post("http://localhost:8080/api/v1/profile/coach-profile",
        {
          coachId: coachId,
          coachName: coachName,
          coachEmail: coachEmail,
          coachDateOfBirth: coachDateOfBirth,
          coachAge: coachAge,
          // coachprofileImageLink: imageUrl,
        }
      );

      // Handle response if needed
      console.log(coachProfileResponse.data);
      if (coachProfileResponse.data.success) {
        message.success(coachProfileResponse.data.message)
        window.location.reload();
      }

    } catch (error) {
      message.error("Error occurred inside the handleFormSubmit function");
    }


  };


  useEffect(() => {
    currentUserData()
  }, [])

  const onChangeProfile = async ({ fileList: newFileList }) => {
    console.log(newFileList);
    setNewFileList(newFileList)

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
    setCoverImageFileList(newFileList)
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
      <CoachSideBar>
        <div className="coach-profile">
          <div className="ProfileHeaderSection">
            <div className="ProfileHeader">
              <h3 className="coachDetails">My Profile</h3>
            </div>
          </div>
          <div
            className="coachProfile"
            style={{ overflowX: "auto", height: "75vh" }}
          >
            <form
              className="coachProfileForm"
              style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}
            >
              <label className="formLabel">
                Name:
                <Input
                  type="text"
                  name="name"
                  className="inputBox"
                  onChange={(e) => setcoachName(e.target.value)}
                />
              </label>
              <label className="formLabel">
                Email:
                <Input
                  type="email"
                  name="email"
                  className="inputBox"
                  onChange={(e) => setcoachEmail(e.target.value)}
                />
              </label>

              <div className="AgeSection">
                <div>
                  <label className="formLabel">Date of Birth:</label>
                  <DatePicker
                    style={{
                      width: "350%",
                    }}
                    onChange={(date, dateString) =>
                      setcoachDateOfBirth(dateString)
                    }
                  />
                </div>
                <div>
                  <label className="formLabel">Age:</label>
                  <input
                    type="number"
                    onChange={(e) => setcoachAge(e.target.value)}
                  />
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
                  <Upload
                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                    listType="picture-card"
                    fileList={fileList}
                    onChange={onChange}
                    onPreview={onPreview}
                  >
                    {fileList.length < 5 && "+ Upload"}
                  </Upload>
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
      </CoachSideBar>
    </div>
  );
};

export default CoachProfile;
