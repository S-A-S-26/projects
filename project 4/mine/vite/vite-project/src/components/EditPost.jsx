import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EditPost({
  editPost,
  setEditPost,
  editPost_Posts,
  getCsrf,
  csrfValue,
  fetchPosts,
}) {
  const [imgList, setImgList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("data");
    console.log(editPost_Posts);
  }, [editPost_Posts]);
  
  useEffect(() => {
    // console.log(editPost_Posts)
    console.log(imgList);
  }, [imgList]);

  const removeImg = (img, id) => {
    setImgList(imgList.concat(img));
    console.log(id);
    document.getElementById(id).remove();
  };

  const [files, setFiles] = useState([]);
  const handleFiles = (e) => {
    let postImg=[...editPost_Posts.post_images]
    if (postImg[0]===""){
      postImg.shift()
    }
    let delImg=imgList
    console.log(files.length+(postImg.length-delImg.length))
    if (e.target.files.length+(postImg.length-delImg.length) > 4){
      return alert("Please select 4 or less than 4 images")
    }

    setFiles(e.target.files);

  };

  // useEffect(()=>{
  //   if (editPost){

  //   }
  // },[files])

  const clearData = () => {
    setImgList([]);
    setEditPost(false);
    setFiles([]);
  };

  useEffect(() => {
    console.log(files);
  }, [files]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let form = document.getElementById("editPostForm");
    let submit = document.getElementById("edit_postsubmit");
    let formData = new FormData(form, submit);
    for (let i of files) {
      formData.append(i.name, i);
    }
    formData.append("filesToDelete", imgList);
    formData.append("id", editPost_Posts.id);
    console.log(formData);

    await getCsrf;
    let csrf = csrfValue();

    let opt = {
      method: "POST",
      headers: {
        "X-CSRFToken": csrf,
      },
      body: formData,
    };

    let res = await fetch("/socialapp/updatePost", opt);
    console.log(res);
    let value = await res.json();
    console.log(value);
    await fetchPosts("all");
    clearData();
    navigate("/");
  };

  return (
    editPost && (
      <div>
        <div
          className="mask"
          onClick={() => {
            clearData();
          }}
        ></div>
        <div className="EditPost">
          <b>Post Edit</b>
          <form id="editPostForm">
            <div>
              <textarea name="edited_description">
                {editPost_Posts.description}
              </textarea>
            </div>
            <div className="editPost_img">
              {editPost_Posts.post_images[0] === "" && files.length == 0
                ? "No images"
                : editPost_Posts.post_images[0] === ""
                ? ""
                : editPost_Posts.post_images.map((img, i = 0) => {
                    i = i + 1;
                    //   console.log(i)
                    return (
                      <button
                        id={i}
                        key={i}
                        onClick={() => {
                          removeImg(img, i);
                        }}
                      >
                        <div className="imgMask">&#10060;</div>
                        <div id={i}>
                          <img src={`/media/${img}`} />
                        </div>
                      </button>
                    );
                  })}
              {Array.from(files).map((file) => {
                return (
                  <div>
                    <img src={URL.createObjectURL(file)} />
                  </div>
                );
              })}
            </div>
            <div className="editpost_btn">
              <div>
                <label className="fakebutton" htmlFor="add_postimages">
                  Add Image
                </label>
                <input
                  onChange={handleFiles}
                  id="add_postimages"
                  type="file"
                  accept="image/*"
                  multiple
                  hidden
                />
              </div>
              <button
                id="edit_postsubmit"
                name="submit"
                type="submit"
                onClick={handleSubmit}
                className="primary-btn"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}
