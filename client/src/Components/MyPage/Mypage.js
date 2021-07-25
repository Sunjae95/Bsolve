import React, { useState, useEffect, useContext } from 'react';
import { API_ENDPOINT } from 'Utility/config';
import { postOptions } from 'Utility/axiosOptions';
import { LOGOUT } from 'UserContext/actionType';
import { userContext } from 'UserContext/index';
import Modal from '../Modal/Modal';
import Profile from './Profile/Profile';
import axios from 'axios';

function Mypage() {
  const [profile, setProfile] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalCheck, setModalCheck] = useState(true);
  const { dispatch } = useContext(userContext);

  useEffect(async () => {
    const url = `${API_ENDPOINT}/user`;
    const token = localStorage.getItem('token');

    try {
      const user = await axios.post(url, { token }, postOptions);

      setProfile(user.data);
    } catch (e) {
      setProfile(false);
      dispatch({ type: LOGOUT });
    }
  }, []);

  const onChange = e => {
    setProfile({
      ...profile,
      [e.target.name]:
        e.target.name === 'age' ? parseInt(e.target.value) : e.target.value
    });
  };

  const checkedBox = () => {
    setProfile({ ...profile, gender: !profile.gender });
  };

  const onSave = async () => {
    const modifyURL = `${API_ENDPOINT}/user/modify`;
    try {
      await axios.post(modifyURL, { profile }, postOptions);
      setModal(!modal);
    } catch (e) {
      console.log(e);
    }
  };

  const clickedModify = () => {
    setModal(!modal);
    setModalCheck(true);
  };
  //모달 흰색창 제외 클릭시 사라짐
  const closeModify = e => {
    if (e.target.className === 'modal-page') {
      setModal(!modal);
    }
  };
  //클릭시 로그아웃
  const onLogout = () => {
    setProfile(false);
    setModal(!modal);
    localStorage.removeItem('token');
    dispatch({ type: LOGOUT });
  };
  //로그아웃 칸 누를때 모달창 띄우기
  const clickedLogout = () => {
    setModal(!modal);
    setModalCheck(false);
  };

  return (
    <>
      {modal &&
        (modalCheck ? (
          <Modal
            modalCheck={modalCheck}
            clickedModify={clickedModify}
            onSave={onSave}
            message="수정하시겠습니까?"
            closeModify={closeModify}
          />
        ) : (
          <Modal
            modalCheck={modalCheck}
            clickedModify={clickedModify}
            onSave={onLogout}
            message="로그아웃 하시겠습니까?"
            closeModify={closeModify}
          />
        ))}
      <ul className="PageButton">
        <li>프로필</li>
        {/* <Link className="Link" to="/"> */}
        <li onClick={clickedLogout}>로그아웃</li>
        {/* </Link> */}
      </ul>
      <div className="PageContent">
        {profile ? (
          <Profile
            profile={profile}
            clickedModify={clickedModify}
            onChange={onChange}
            checkedBox={checkedBox}
          ></Profile>
        ) : (
          <div>불러오는중</div>
        )}
      </div>
    </>
  );
}

export default Mypage;
