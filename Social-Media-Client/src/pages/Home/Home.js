import React, {useEffect} from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import { getMyInfo } from '../../redux/slices/appConfigSlice';
// import { axiosClient } from '../../utils/axiosClient';
import { useDispatch } from "react-redux";

function Home() {

    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getMyInfo())
    }, [])

    return (
        <>
            <Navbar />
            <div className="outlet" style={{ marginTop: "60px" }}>
                <Outlet />
            </div>

        </>
    );
}

export default Home