import { Typography, Paper, Container,Grid ,Box, Grow} from "@mui/material";

import { useParams} from "react-router-dom";
import {
  getUser
} from "../../features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import React , { useEffect } from "react";
import Errorhandler from "../Errorhandler";



const UserDetails = () => {

  const {user, isLoading, error } = useSelector(
    (store) => store.user
  );
  const { id } = useParams();
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getUser(id));
  }, [id]);
console.log(user);
const {name,email}=user;
  // const {data} = user;
  // console.log(user.name)

   return !error?
  (
    <Box sx={{
      backgroundColor: '#f0f0f0',
      padding: 2,
      borderRadius: 8,
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      maxWidth: 400,
      margin: 'auto',
    }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        User Details
      </Typography>
      <Box sx={{ marginBottom: 1 }}>
        <Typography variant="h6">Name:</Typography>
        <Typography variant="body1">{name}</Typography>
      </Box>
      <Box sx={{ marginBottom: 1 }}>
        <Typography variant="h6">Email:</Typography>
        <Typography variant="body1">{email}</Typography>
      </Box>
    </Box>
  ):(<Errorhandler/>);
};

export default UserDetails;