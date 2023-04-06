import React from "react";
import style from "../Detail/Detail.module.css";
import { getDetail } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const Detail = () => { 
    const dispatch = useDispatch();
    const { id } = useParams();
    const countryDetail = useSelector((state) => state.detail)

    useEffect(() => {
        dispatch(getDetail(id))
    },[])

    return(
        <div className={style.container}>
            <div className={style.detailContainer}>
                <div className={style.containerImg}>
                    <img src={countryDetail?.image} alt={countryDetail?.name} className={style.Img}/>
                </div>
                <h2 className = {style.title}>{countryDetail?.name}</h2>
                <h3 className = {style.title}>{countryDetail?.id}</h3>
            
                <div className = {style.info}>
                    <p><strong>Continent: </strong>{countryDetail?.continent}</p>
                    <p><strong>Capital: </strong>{countryDetail?.capital}</p>
                    <p><strong>Subregion: </strong>{countryDetail?.subregion}</p>
                    <p><strong>Area: </strong>{countryDetail?.area}km2</p>
                    <p><strong>Population: </strong>{countryDetail?.population}</p>
                    <p><strong>Timezones: </strong>{countryDetail?.timezones}</p>
                </div>
            </div>
            
            <div className={style.activityContainer}>
            <h3 className = {style.textActivity}>ACTIVITIES:</h3>
            <div className={style.containerAllActivity}>
            {
                countryDetail.Activities&&countryDetail.Activities.length ? 
            countryDetail.Activities.map(activity => {
                return (
                        <div className={style.cardActivity}>
                            <h3>{activity.name}</h3>
                            <div className={style.info}>
                            <p >Difficulty: Level {activity.difficulty}</p>
                            <p >Duration: {activity.duration} hours</p>
                            <p>Season: {activity.season}</p>
                        </div>
                        </div>
                        ) 
                 }) 
                 : <p className = {style.info}>There are no activities in this country</p> 
            }
            </div>
            </div>
             <Link className={style.link} to="/create"><button className={style.btnCreate}>Create Activity</button></Link>               
        
        </div>
    )
}

export default Detail;