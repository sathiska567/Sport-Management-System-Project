import { React, useEffect, useState } from "react";
import "./PlayerProfile.css";
import PlayerSideBar from "../PlayerSideBar/PlayerSideBar";
import { Upload, Modal, Input, Button, DatePicker, InputNumber, message } from "antd";
import ImgCrop from "antd-img-crop";
import axios from "axios";

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

  const [playerName, setPlayerName] = useState("")
  const [playerEmail, setPlayerEmail] = useState("")
  const [playerDateOfBirth, setPlayerDateOfBirth] = useState("")
  const [playerAge, setPlayerAge] = useState(0)
  const [playerId,setPlayerId]= useState("")


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
      setPlayerId(res.data.user._id)


    } catch (error) {
      message.error("Error have inside the Get currentUserData function");
    }
  };


  const handleFormSubmit = async () => {
    console.log(playerId,playerName, playerEmail, playerDateOfBirth, playerAge);
    try {
      const response = await axios.post("http://localhost:8080/api/v1/profile/player-profile",{playerId:playerId ,playerName:playerName, playerEmail:playerEmail, playerDateOfBirth:playerDateOfBirth, playerAge:playerAge})
      
    } catch (error) {
       message.error("Error have inside the handleFormSubmit function");
    }
  }


  useEffect(() => {
    currentUserData()
  }, [])

  const onChangeProfile =async ({ fileList: newFileList }) => {
    if (newFileList.length > 0) {
      const file = newFileList[0].originFileObj;
      console.log(file);
  
      let formData = new FormData();
      formData.append("image", file);

      try {
        const {data} = await axios.post("http://localhost:8080/api/v1/profile/player-profile-image-upload",formData)
        console.log(data);
        
      } catch (error) {
          message.error("Error have inside the onChangeProfile function");
      }
  
      // FormData is not an array, so there's no need to spread it in the console.log
      console.log([...formData]);
  
      setFileListProfile(newFileList);
    }
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
      <PlayerSideBar>
        <div className="player-profile">
          <div className="ProfileHeaderSection">
            <div className="ProfileHeader">
              <h3 className="playerDetails">My Profile</h3>
            </div>
          </div>
          <div className="PlayerProfile" style={{ overflowX: "auto", height: "75vh" }}>
            <form
              className="PlayerProfileForm"
              style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}
            >
              <label className="formLabel">
                Name:
                <Input type="text" name="name" className="inputBox" onChange={(e) => setPlayerName(e.target.value)} />
              </label>
              <label className="formLabel">
                Email:
                <Input type="email" name="email" className="inputBox" onChange={(e) => setPlayerEmail(e.target.value)} />
              </label>

              <div className="AgeSection">
                <div>
                  <label className="formLabel">Date of Birth:</label>
                  <DatePicker
                    style={{
                      width: "350%",
                    }}
                    onChange={(date, dateString) => setPlayerDateOfBirth(dateString)}
                  />
                </div>
                <div>
                  <label className="formLabel">Age:</label>
                  <input type="number" onChange={(e) => setPlayerAge(e.target.value)} />
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
              <Button className="submitBtn" type="ghost" onClick={handleFormSubmit}>
                Submit{" "}
              </Button>
            </form>
          </div>
        </div>
      </PlayerSideBar>
    </div>
  );
};

export default PlayerProfile;
