import React, { useState, useEffect, useRef } from "react";
import { Typography, Paper, Button, TextField } from "@mui/material";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { postPost, updatePost } from "../../features/api";
import {
  create,
  selectPostById,
  update,
} from "../../features/posts/postsSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Form({ currentId, setCurrentId, setUpdateForm }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: [],
    selectedFile: "",
  });

  // const [user, setUser] = useState(authData);
  // console.log("formauthData", authData);
  const user = JSON.parse(localStorage.getItem("profile"));
  const inputRef = useRef(null);

  // const post = useSelector((store) => {
  //   const {
  //     posts: { posts },
  //   } = store;
  //   return currentId.id && currentId.name === "update"
  //     ? posts.find((p) => p.id === currentId.id)
  //     : null;
  // });
  const post = useSelector((store) => selectPostById(store, currentId.id));

  const { authData } = useSelector((store) => store.auth);

  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post, authData]);

  const clear = () => {
    // console.log("clear1");
    setCurrentId({ id: 0, name: "" });
    // console.log("clear2");
    setPostData({
      title: "",
      message: "",
      tags: [],
      selectedFile: "",
    });
    inputRef.current.value = null;
    // console.log("clear3");
    if (setUpdateForm) setUpdateForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentId.id && currentId.name === "update") {
      // const data = await updatePost(currentId.id, postData);
      const data = await toast.promise(updatePost(currentId.id, postData), {
        pending: "Updating...",
        success: `Memory Updated Successfully!`,
        error: "Something Went Wrong!",
      });
      // console.log("udata", data);
      if (data) dispatch(update(data));
    } else {
      // const data = await postPost({ ...postData });
      const data = await toast.promise(postPost({ ...postData }), {
        pending: "Creating...",
        success: `Memory created Successfully!`,
        error: "Something Went Wrong!",
      });
      // console.log("udata", data);
      if (data) {
        dispatch(create(data));
        navigate(`/posts/${data.id}`);
        // if (data) toast.success(`Successfully created the Memory.`);
      }
    }
    // console.log("hitclear");
    clear();
  };
  const handleChange = (e) => {
    const { value, name } = e.target;
    setPostData((data) => {
      return { ...data, [name]: value };
    });
  };

  return !user ? (
    <Paper elevation={6}>
      <Typography variant="h6" align="center">
        Please Sign in to create your own Memories.
      </Typography>
    </Paper>
  ) : (
    <Paper
      sx={{ p: 2, borderRadius: setUpdateForm ? "0 15px 15px" : "15px" }}
      elevation={setUpdateForm ? 0 : 6}
    >
      <form
        autoComplete="off"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          padding: "2px",
        }}
        onSubmit={handleSubmit}
      >
        <Typography variant="h5">
          {currentId.id && currentId.name === "update"
            ? "Updating a Memory"
            : "Creating a Memory"}
        </Typography>

        <TextField
          name="title"
          label="Title"
          variant="outlined"
          fullWidth
          value={postData.title}
          onChange={handleChange}
          sx={{ my: 1 }}
          required
        />
        <TextField
          name="message"
          label="Message"
          variant="outlined"
          fullWidth
          value={postData.message}
          onChange={handleChange}
          sx={{ my: 1 }}
        />
        <TextField
          name="tags"
          label="Tags"
          placeholder="Use comma between tags"
          variant="outlined"
          fullWidth
          value={postData.tags}
          onChange={(e) => {
            setPostData({ ...postData, tags: e.target.value.split(",") });
          }}
          sx={{ my: 1 }}
        />
        <div style={{ width: "100%", margin: "10px 0", display: "flex" }}>
          <FileBase
            type="file"
            multiple={false}
            ref={inputRef}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          sx={{ mb: 1 }}
          variant="contained"
          size="large"
          color="primary"
          fullWidth
          type="submit"
        >
          Submit
        </Button>
        <Button
          sx={{ mb: 1 }}
          variant="contained"
          size="small"
          color="error"
          fullWidth
          onClick={clear}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
}

export default Form;